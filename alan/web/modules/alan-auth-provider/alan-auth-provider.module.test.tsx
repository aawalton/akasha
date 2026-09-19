import { beforeEach, expect, mock, test } from "bun:test"
import { render } from "@testing-library/react"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { act, useContext, useEffect } from "react"

process.env.BASE_URL = "/"
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.test"
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-under-test"

type AuthCallback = (event: string, session: unknown) => void

const SIGNED_IN_SESSION = {
  user: { id: "user-under-test" },
  access_token: "token-under-test",
}

let authCallback: AuthCallback | null = null
let currentSession: unknown = SIGNED_IN_SESSION

const TRAIL: string[] = []

const FAKE_SUPABASE = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: currentSession } }),
    refreshSession: () => Promise.resolve({ error: null }),
    onAuthStateChange: (callback: AuthCallback) => {
      authCallback = callback
      return { data: { subscription: { unsubscribe: () => undefined } } }
    },
  },
}

mock.module(
  "akasha/alan/harness/supabase-rr/modules/supabase-provider/supabase-provider.module.code.tsx",
  () => ({
    useSupabase: () => FAKE_SUPABASE,
    SupabaseProvider: ({ children }: { children: unknown }) => children,
  })
)

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
mock.module("akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts", () => ({
  emitStoreDiagnostic: () => undefined,
  setStoreDiagnosticsSink: () => undefined,
}))
mock.module("akasha/page/ui-store/modules/report-stall/report-stall.module.code.ts", () => ({
  reportPagesStoreStall: () => Promise.resolve(),
}))
const pagesStoreSingleton = await import(
  "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
)
mock.module("akasha/page/ui-store/modules/singleton/singleton.module.code.ts", () => ({
  ...pagesStoreSingleton,
  configurePagesStoreAuth: () => Promise.resolve(),
  getPagesStore: () =>
    Promise.resolve({
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
    setOfflineCacheUserKey: () => undefined,
  })
)

const nullComponent = () => null
mock.module(
  "akasha/alan/web/modules/deep-link-open-sync/deep-link-open-sync.module.code.tsx",
  () => ({
    DeepLinkOpenSync: nullComponent,
  })
)
mock.module(
  "akasha/alan/web/modules/native-auth-refresh-sync/native-auth-refresh-sync.module.code.tsx",
  () => ({
    NativeAuthRefreshSync: nullComponent,
  })
)
mock.module("akasha/alan/web/modules/offline-text-sync/offline-text-sync.module.code.tsx", () => ({
  OfflineTextSync: nullComponent,
}))
mock.module(
  "akasha/alan/web/modules/push-registration-sync/push-registration-sync.module.code.tsx",
  () => ({
    PushRegistrationSync: nullComponent,
  })
)

function IdentityRecorder() {
  const userID = useContext(UserIdContext)
  useEffect(() => {
    TRAIL.push(`identity is ${userID ?? "null"}`)
  }, [userID])
  return null
}

const reactRouter = await import("react-router")
mock.module("react-router", () => ({
  ...reactRouter,
  useNavigate: () => (to: string) => {
    TRAIL.push(`navigate ${to}`)
  },
}))

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

const SIGNED_IN_AT = "/nav/tasks-a7242626"

const happyDom = globalThis as typeof globalThis & {
  happyDOM: { setURL: (url: string) => void }
}

beforeEach(() => {
  TRAIL.length = 0
  authCallback = null
  currentSession = SIGNED_IN_SESSION
  happyDom.happyDOM.setURL(`http://localhost${SIGNED_IN_AT}`)
})

async function renderSignedInThenSignOut(): Promise<void> {
  render(
    <AuthProvider>
      <IdentityRecorder />
    </AuthProvider>
  )
  await settle()
  expect(TRAIL).toContain("identity is user-under-test")

  TRAIL.length = 0

  currentSession = null
  await act(async () => {
    authCallback?.("SIGNED_OUT", null)
  })
  await settle()
}

test("a session ending drops the identity out of the context", async () => {
  await renderSignedInThenSignOut()

  expect(TRAIL).toContain("identity is null")
})

test("the identity goes null before the route changes, or the clear is never reached", async () => {
  await renderSignedInThenSignOut()

  const sawNull = TRAIL.indexOf("identity is null")
  const moved = TRAIL.findIndex((entry) => entry.startsWith("navigate "))

  expect(sawNull).toBeGreaterThan(-1)
  expect(moved).toBeGreaterThan(-1)
  expect(sawNull).toBeLessThan(moved)
})

test("sign-out lands on the signed-out route, remembering where the person was", async () => {
  await renderSignedInThenSignOut()

  expect(TRAIL.filter((entry) => entry.startsWith("navigate "))).toEqual([
    `navigate /sign-in?next=${encodeURIComponent(SIGNED_IN_AT)}`,
  ])
})
