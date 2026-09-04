"use client"

import { useAppVersionCheck } from "@akasha/pages-ui/app-version/use-app-version-check"
import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { reportPagesStoreStall } from "@akasha/pages-ui-store/report-stall"
import { configurePagesStoreAuth, getPagesStore } from "@akasha/pages-ui-store/singleton"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useSupabase } from "@akasha/supabase-rr/supabase-provider"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"

const PAGE_TYPE_SLUG = toPageTypeSlug("page-type")
const PROPERTY_DEFINITION_SLUG = toPageTypeSlug("page-property-definition")
const AUTOMATION_SLUG = toPageTypeSlug("automation")

const SupabaseUrlSchema = z.string().url()
const SupabaseAnonKeySchema = z.string().min(1)

const HYDRATE_OVERRUN_WARN_MS = 30_000

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  useAppVersionCheck()
  const supabase = useSupabase()
  const [userID, setUserID] = useState<string | null>(null)
  const wasAuthenticated = useRef(false)

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
            `[auth-provider] hydrate exceeded ${HYDRATE_OVERRUN_WARN_MS}ms; one of the known hang paths may be active`
          )
          void reportPagesStoreStall()
        }
      }, HYDRATE_OVERRUN_WARN_MS)
    }

    async function resolveInitialSession() {
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      const user = data.session?.user ?? null
      if (user) {
        setUserID(user.id)
        wasAuthenticated.current = true
      } else {
        setUserID(null)
      }
      await pushAuthToStore(data.session?.access_token ?? null)
    }

    void resolveInitialSession()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      void (async () => {
        await pushAuthToStore(session?.access_token ?? null)
        if (cancelled) return
        if (user) {
          setUserID(user.id)
          wasAuthenticated.current = true
          return
        }

        if (wasAuthenticated.current) {
          wasAuthenticated.current = false
          const currentPath = window.location.pathname + window.location.search
          const signInUrl =
            currentPath !== "/" ? `/sign-in?next=${encodeURIComponent(currentPath)}` : "/sign-in"
          window.location.href = signInUrl
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

  return <UserIdContext value={userID}>{children}</UserIdContext>
}
