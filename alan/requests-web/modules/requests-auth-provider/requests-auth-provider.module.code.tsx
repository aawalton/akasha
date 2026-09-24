"use client"

import { useAppVersionCheck } from "akasha/page/ui/app-version/modules/use-app-version-check/use-app-version-check.module.code.ts"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { reportPagesStoreStall } from "akasha/page/ui-store/modules/report-stall/report-stall.module.code.ts"
import {
  configurePagesStoreAuth,
  getPagesStore,
} from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect } from "react"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const PAGE_TYPE_SLUG = toPageTypeSlug("page-type")

const ANYONE = "anonymous"

const HYDRATE_OVERRUN_WARN_MS = 30_000

const FOLLOWING_AT = { events: "/api/page-events", follow: "/api/page-follow" }

interface AuthProviderProps {
  reader: string | null
  accountId: string | null
  children: React.ReactNode
}

export function AuthProvider({ reader, accountId, children }: AuthProviderProps) {
  useAppVersionCheck()

  useEffect(() => {
    const work = (async (): Promise<void> => {
      try {
        await configurePagesStoreAuth({ jwt: null, owner: reader ?? ANYONE })
        const store = await getPagesStore()
        store.followPages(FOLLOWING_AT)
        store.acquireSlug(PAGE_TYPE_SLUG)
        await store.whenSlugReady(PAGE_TYPE_SLUG)
      } catch (err: unknown) {
        console.error("[requests-auth-provider] configurePagesStoreAuth/prehydrate failed", err)
      }
    })()
    let workDone = false
    void work.then(() => {
      workDone = true
    })
    const warnTimer = setTimeout(() => {
      if (!workDone) {
        console.warn(
          `[requests-auth-provider] hydrate exceeded ${HYDRATE_OVERRUN_WARN_MS}ms; one of the known hang paths may be active`
        )
        void reportPagesStoreStall()
      }
    }, HYDRATE_OVERRUN_WARN_MS)

    return () => {
      clearTimeout(warnTimer)
    }
  }, [reader])

  return <UserIdContext value={accountId}>{children}</UserIdContext>
}
