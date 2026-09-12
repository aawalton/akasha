"use client"

import { refreshBrowserSession } from "akasha/alan/harness/supabase-rr/modules/browser-session-refresh/browser-session-refresh.module.code.ts"
import { useSupabase } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
import { DeepLinkOpenSync } from "akasha/alan/web/deep-link-open-sync/deep-link-open-sync.module.code.tsx"
import { DeviceSecretSync } from "akasha/alan/web/device-secret-sync/device-secret-sync.module.code.tsx"
import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { NativeAuthRefreshSync } from "akasha/alan/web/native-auth-refresh-sync/native-auth-refresh-sync.module.code.tsx"
import { setOfflineCacheUserKey } from "akasha/alan/web/offline-cache-namespace/offline-cache-namespace.module.code.ts"
import { OfflineTextSync } from "akasha/alan/web/offline-text-sync/offline-text-sync.module.code.tsx"
import { PushRegistrationSync } from "akasha/alan/web/push-registration-sync/push-registration-sync.module.code.tsx"
import { useAppVersionCheck } from "akasha/pages/ui/app-version/use-app-version-check/use-app-version-check.module.code.ts"
import { UserIdContext } from "akasha/pages/ui/use-user-id/use-user-id.module.code.tsx"
import { emitStoreDiagnostic } from "akasha/pages/ui-store/diagnostics/diagnostics.module.code.ts"
import { reportPagesStoreStall } from "akasha/pages/ui-store/report-stall/report-stall.module.code.ts"
import {
  configurePagesStoreAuth,
  getPagesStore,
} from "akasha/pages/ui-store/singleton/singleton.module.code.ts"
import { toPageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { z } from "zod"

const PAGE_TYPE_SLUG = toPageTypeSlug("page-type")
const PROPERTY_DEFINITION_SLUG = toPageTypeSlug("page-property-definition")
const AUTOMATION_SLUG = toPageTypeSlug("automation")

const SupabaseUrlSchema = z.string().url()
const SupabaseAnonKeySchema = z.string().min(1)

const HYDRATE_OVERRUN_WARN_MS = 30_000

const GETSESSION_GATE_TIMEOUT_MS = 3_000

interface AuthProviderProps {
  children: React.ReactNode
}

function afterEffectsRun(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
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

    const refreshAuth = (): Promise<void> => refreshBrowserSession(supabase)
    const pushAuthToStore = async (jwt: string | null): Promise<void> => {
      const work = (async (): Promise<void> => {
        try {
          const supabaseUrl = SupabaseUrlSchema.parse(import.meta.env.VITE_SUPABASE_URL)
          const supabaseAnonKey = SupabaseAnonKeySchema.parse(
            import.meta.env.VITE_SUPABASE_ANON_KEY
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

          setUserID(null)
          await afterEffectsRun()
          if (cancelled) return
          navigateRef.current(signInTo)
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
      <DeviceSecretSync />
      <NativeAuthRefreshSync />
      {children}
    </UserIdContext>
  )
}
