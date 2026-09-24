import { beforeEach, expect, mock, test } from "bun:test"
import { render } from "@testing-library/react"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { act, useContext, useEffect } from "react"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const READER = "contributor/alan"

const ACCOUNT_ID = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const TRAIL: string[] = []

const appVersionCheck = await import(
  "akasha/page/ui/app-version/modules/use-app-version-check/use-app-version-check.module.code.ts"
)
mock.module(
  "akasha/page/ui/app-version/modules/use-app-version-check/use-app-version-check.module.code.ts",
  () => ({
    ...appVersionCheck,
    useAppVersionCheck: () => undefined,
  })
)
mock.module("akasha/page/ui-store/modules/report-stall/report-stall.module.code.ts", () => ({
  reportPagesStoreStall: () => Promise.resolve(),
}))
const pagesStoreSingleton = await import(
  "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
)
mock.module("akasha/page/ui-store/modules/singleton/singleton.module.code.ts", () => ({
  ...pagesStoreSingleton,
  configurePagesStoreAuth: (args: { jwt: string | null; owner?: string | null }) => {
    TRAIL.push(`owner is ${args.owner ?? "null"}`)
    TRAIL.push(`jwt is ${args.jwt ?? "null"}`)
    return Promise.resolve()
  },
  getPagesStore: () =>
    Promise.resolve({
      followPages: () => undefined,
      acquireSlug: () => undefined,
      whenSlugReady: () => Promise.resolve(),
    }),
}))
const offlineCacheNamespace = await import(
  "akasha/alan/web/modules/offline-cache-namespace/offline-cache-namespace.module.code.ts"
)
mock.module(
  "akasha/alan/web/modules/offline-cache-namespace/offline-cache-namespace.module.code.ts",
  () => ({
    ...offlineCacheNamespace,
    setOfflineCacheUserKey: (key: string | null) => {
      TRAIL.push(`cache key is ${key ?? "null"}`)
    },
  })
)

const nullComponent = () => null
mock.module(
  "akasha/alan/web/modules/deep-link-open-sync/deep-link-open-sync.module.code.tsx",
  () => ({
    DeepLinkOpenSync: nullComponent,
  })
)
const pushRegistrationSync = await import(
  "akasha/alan/web/modules/push-registration-sync/push-registration-sync.module.code.tsx"
)
mock.module(
  "akasha/alan/web/modules/push-registration-sync/push-registration-sync.module.code.tsx",
  () => ({
    ...pushRegistrationSync,
    PushRegistrationSync: nullComponent,
  })
)

function AccountRecorder() {
  const userID = useContext(UserIdContext)
  useEffect(() => {
    TRAIL.push(`account is ${userID ?? "null"}`)
  }, [userID])
  return null
}

const { AuthProvider } = await import(
  "akasha/alan/web/modules/alan-auth-provider/alan-auth-provider.module.code.tsx"
)

async function settle(): Promise<void> {
  for (let i = 0; i < 5; i++) {
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1)
      })
    })
  }
}

async function renderAs(reader: string | null, accountId: string | null): Promise<void> {
  render(
    <AuthProvider reader={reader} accountId={accountId}>
      <AccountRecorder />
    </AuthProvider>
  )
  await settle()
}

beforeEach(() => {
  TRAIL.length = 0
})

test("the reader the layout read is the owner the store is set to", async () => {
  await renderAs(READER, ACCOUNT_ID)

  expect(TRAIL).toContain(`owner is ${READER}`)
  expect(TRAIL).toContain("jwt is null")
})

test("the account the person page states is what every component below reads", async () => {
  await renderAs(READER, ACCOUNT_ID)

  expect(TRAIL).toContain(`account is ${ACCOUNT_ID}`)
  expect(TRAIL).toContain(`cache key is ${ACCOUNT_ID}`)
})

test("a reader nobody named leaves the account and the owner empty", async () => {
  await renderAs(null, null)

  expect(TRAIL).toContain("owner is null")
  expect(TRAIL).toContain("account is null")
})
