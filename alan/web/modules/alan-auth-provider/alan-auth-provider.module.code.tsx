"use client"

import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { DeepLinkOpenSync } from "akasha/alan/web/modules/deep-link-open-sync/deep-link-open-sync.module.code.tsx"
import { DeviceSecretSync } from "akasha/alan/web/modules/device-secret-sync/device-secret-sync.module.code.tsx"
import { setOfflineCacheUserKey } from "akasha/alan/web/modules/offline-cache-namespace/offline-cache-namespace.module.code.ts"
import { PushRegistrationSync } from "akasha/alan/web/modules/push-registration-sync/push-registration-sync.module.code.tsx"
import { StoplightsActivitySync } from "akasha/alan/web/modules/stoplights-activity-sync/stoplights-activity-sync.module.code.tsx"
import { useAppVersionCheck } from "akasha/page/ui/app-version/modules/use-app-version-check/use-app-version-check.module.code.ts"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { reportPagesStoreStall } from "akasha/page/ui-store/modules/report-stall/report-stall.module.code.ts"
import {
  configurePagesStoreAuth,
  getPagesStore,
} from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect } from "react"

const PAGE_TYPE_SLUG = toPageTypeSlug("page-type")
const PROPERTY_DEFINITION_SLUG = toPageTypeSlug("page-property-definition")
const AUTOMATION_SLUG = toPageTypeSlug("automation")

const ANYONE = "anonymous"

const HYDRATE_OVERRUN_WARN_MS = 30_000

const FOLLOWING_AT = { events: "/api/page-events", follow: "/api/page-follow" }

interface AuthProviderProps {
  reader: string | null
  accountId: string | null
  children: React.ReactNode
}

export function AuthProvider({ reader, accountId, children }: AuthProviderProps) {
  useAppVersionCheck({ enabled: !isNativeShell() })

  useEffect(() => {
    setOfflineCacheUserKey(accountId)
    const work = (async (): Promise<void> => {
      try {
        await configurePagesStoreAuth({ jwt: null, owner: reader ?? ANYONE })
        const store = await getPagesStore()
        store.followPages(FOLLOWING_AT)
        if (reader === null) return
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
    const warnTimer = setTimeout(() => {
      if (!workDone) {
        console.warn(
          `[auth-provider] hydrate exceeded ${HYDRATE_OVERRUN_WARN_MS}ms; a known hang path may be active`
        )
        void reportPagesStoreStall()
      }
    }, HYDRATE_OVERRUN_WARN_MS)

    return () => {
      clearTimeout(warnTimer)
    }
  }, [reader, accountId])

  return (
    <UserIdContext value={accountId}>
      <PushRegistrationSync />
      <DeepLinkOpenSync />
      <DeviceSecretSync />
      <StoplightsActivitySync />
      {children}
    </UserIdContext>
  )
}
