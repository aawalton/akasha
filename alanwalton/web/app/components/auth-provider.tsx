"use client"

import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { useAppVersionCheck } from "@shared/pages-ui/app-version/use-app-version-check"
import { emitStoreDiagnostic } from "@shared/pages-ui-store/diagnostics"
import { reportPagesStoreStall } from "@shared/pages-ui-store/report-stall"
import { configurePagesStoreAuth, getPagesStore } from "@shared/pages-ui-store/singleton"
import { PageTypeSlug } from "@shared/pages-url"
import { useSupabase } from "@shared/supabase-rr/provider"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { z } from "zod"
import { BadgeSync } from "~/components/badge-sync"
import { DeepLinkOpenSync } from "~/components/deep-link-open-sync"
import { NativeAuthRefreshSync } from "~/components/native-auth-refresh-sync"
import { OfflineTextSync } from "~/components/offline-text-sync"
import { DeviceSecretSync } from "~/device-secret/components/device-secret-sync"
import { isNativeShell } from "~/lib/capacitor-bridge"
import { setOfflineCacheUserKey } from "~/lib/offline-cache-namespace"
import { PushRegistrationSync } from "~/push/components/push-registration-sync"

const PAGE_TYPE_SLUG = PageTypeSlug("page-type")
const PROPERTY_DEFINITION_SLUG = PageTypeSlug("page-property-definition")
const AUTOMATION_SLUG = PageTypeSlug("automation")

const SupabaseUrlSchema = z.string().url()
const SupabaseAnonKeySchema = z.string().min(1)

const HYDRATE_OVERRUN_WARN_MS = 30_000

const GETSESSION_GATE_TIMEOUT_MS = 3_000

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  useAppVersionCheck({ enabled: !isNativeShell() })
  const supabase = useSupabase()
  const [userID, setUserID] = useState<string | null>(null)
  const wasAuthenticated = useRef(false)
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  useEffect(() => {
    let cancelled = false

    const refreshAuth = async (): Promise<void> => {
      const { error } = await supabase.auth.refreshSession()
      if (error !== null) {
        console.warn("[auth-provider] auth-stale session refresh failed", error.message)
      }
    }
    const pushAuthToStore = async (jwt: string | null): Promise<void> => {
      const work = (async (): Promise<void> => {
        try {
          const supabaseUrl = SupabaseUrlSchema.parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
          const supabaseAnonKey = SupabaseAnonKeySchema.parse(
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          )
          await configurePagesStoreAuth({
            supabaseUrl,
            supabaseAnonKey,
            jwt,
            refreshAuth,
          })
          if (jwt === null) return
          const store = await getPagesStore()
          store.acquireSlug(PAGE_TYPE_SLUG)
          store.acquireSlug(PROPERTY_DEFINITION_SLUG)
          store.acquireSlug(AUTOMATION_SLUG)
          await Promise.all([
            store.whenSlugReady(PAGE_TYPE_SLUG),
            store.whenSlugReady(PROPERTY_DEFINITION_SLUG),
            store.whenSlugReady(AUTOMATION_SLUG),
          ])
        } catch (err: unknown) {
          console.error("[auth-provider] configurePagesStoreAuth/prehydrate failed", err)
        }
      })()
      let workDone = false
      void work.then(() => {
        workDone = true
      })
      setTimeout(() => {
        if (!workDone) {
          console.warn(
            `[auth-provider] hydrate exceeded ${HYDRATE_OVERRUN_WARN_MS}ms; a known hang path may be active`
          )
          void reportPagesStoreStall()
        }
      }, HYDRATE_OVERRUN_WARN_MS)
    }

    async function resolveInitialSession() {
      let sessionSettled = false
      const degradeTimer = isNativeShell()
        ? setTimeout(() => {
            if (cancelled || sessionSettled) return
            emitStoreDiagnostic({
              reason: "boot-gate-timeout",
              message: `[auth-provider] getSession overran ${GETSESSION_GATE_TIMEOUT_MS}ms — proceeding unauthenticated so the store env gate resolves`,
              detail: `gate=getSession elapsed>=${GETSESSION_GATE_TIMEOUT_MS}ms; getSession keeps running and re-pushes the real JWT if it resolves`,
            })
            void pushAuthToStore(null)
          }, GETSESSION_GATE_TIMEOUT_MS)
        : null

      const { data } = await supabase.auth.getSession()
      sessionSettled = true
      if (degradeTimer !== null) clearTimeout(degradeTimer)
      if (cancelled) return
      const user = data.session?.user ?? null
      if (user) {
        setUserID(user.id)
        wasAuthenticated.current = true
      } else {
        setUserID(null)
      }
      setOfflineCacheUserKey(user?.id ?? null)
      await pushAuthToStore(data.session?.access_token ?? null)
    }

    void resolveInitialSession()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      void (async () => {
        setOfflineCacheUserKey(user?.id ?? null)
        await pushAuthToStore(session?.access_token ?? null)
        if (cancelled) return
        if (user) {
          setUserID(user.id)
          wasAuthenticated.current = true
          return
        }

        if (wasAuthenticated.current) {
          wasAuthenticated.current = false
          const base = import.meta.env.BASE_URL
          const currentPath = window.location.pathname + window.location.search
          const routerPath =
            base !== "/" && currentPath.startsWith(base)
              ? `/${currentPath.slice(base.length)}`
              : currentPath
          const signInTo =
            routerPath !== "/" ? `/sign-in?next=${encodeURIComponent(routerPath)}` : "/sign-in"
          if (base === "/") {
            window.location.href = signInTo
          } else {
            navigateRef.current(signInTo)
          }
          return
        }

        setUserID(null)
      })()
    })

    return () => {
      cancelled = true
      subscription.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <UserIdContext value={userID}>
      <OfflineTextSync />
      <PushRegistrationSync />
      <DeepLinkOpenSync />
      <BadgeSync />
      <DeviceSecretSync />
      <NativeAuthRefreshSync />
      {children}
    </UserIdContext>
  )
}
