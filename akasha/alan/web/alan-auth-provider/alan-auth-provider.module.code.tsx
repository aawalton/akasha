"use client"

import { useAppVersionCheck } from "@akasha/pages-ui/app-version/use-app-version-check"
import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { emitStoreDiagnostic } from "@akasha/pages-ui-store/diagnostics"
import { reportPagesStoreStall } from "@akasha/pages-ui-store/report-stall"
import { configurePagesStoreAuth, getPagesStore } from "@akasha/pages-ui-store/singleton"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useSupabase } from "@akasha/supabase-rr/supabase-provider"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { z } from "zod"
import { isNativeShell } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import { DeepLinkOpenSync } from "../deep-link-open-sync/deep-link-open-sync.module.code.tsx"
import { DeviceSecretSync } from "../device-secret-sync/device-secret-sync.module.code.tsx"
import { NativeAuthRefreshSync } from "../native-auth-refresh-sync/native-auth-refresh-sync.module.code.tsx"
import { setOfflineCacheUserKey } from "../offline-cache-namespace/offline-cache-namespace.module.code.ts"
import { OfflineTextSync } from "../offline-text-sync/offline-text-sync.module.code.tsx"
import { PushRegistrationSync } from "../push-registration-sync/push-registration-sync.module.code.tsx"

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

/**
 * Yields long enough for React to commit a queued render and run the effects it scheduled.
 * React drains those through a MessageChannel, which the event loop empties ahead of any timer
 * callback, so a zero-delay timer is a reliable "the last commit's effects have already run"
 * marker. Used to keep a sign-out render from being batched together with the route change that
 * would unmount the very effect the render exists to trigger.
 */
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

          // Drop the identity FIRST, on the live tree. `DeviceSecretSync` keys its effect on
          // this value, and the `userID -> null` edge is the only route to `clearAndRevoke`,
          // which calls the native `DeviceSecret.clear()` — the one way a stale keychain item
          // ever leaves the phone. Two rules follow, and both were broken here:
          //   1. it has to be set at all. This branch used to return without it, so the context
          //      kept the old id, the effect never re-ran, and the clear never happened.
          //   2. the URL must not change until this render's effects have run. `/sign-in` sits
          //      outside the layout that mounts this provider, so moving in the same commit
          //      unmounts `DeviceSecretSync` and React runs its cleanup rather than the null-id
          //      effect. A whole-document reload (the old `window.location.href`) is worse
          //      still: it remounts with no earlier id to compare against, `signedOutFrom` is
          //      null, and the clear is skipped on every sign-out forever.
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
