import { beforeEach, expect, mock, test } from "bun:test"
import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { render } from "@testing-library/react"
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

const trail: string[] = []

const fakeSupabase = {
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
  "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx",
  () => ({
    useSupabase: () => fakeSupabase,
    SupabaseProvider: ({ children }: { children: unknown }) => children,
  })
)

const appVersionCheck = await import("@akasha/pages-ui/app-version/use-app-version-check")
mock.module("@akasha/pages-ui/app-version/use-app-version-check", () => ({
  ...appVersionCheck,
  useAppVersionCheck: () => undefined,
}))
mock.module("@akasha/pages-ui-store/diagnostics", () => ({
  emitStoreDiagnostic: () => undefined,
  setStoreDiagnosticsSink: () => undefined,
}))
mock.module("@akasha/pages-ui-store/report-stall", () => ({
  reportPagesStoreStall: () => Promise.resolve(),
}))
const pagesStoreSingleton = await import("@akasha/pages-ui-store/singleton")
mock.module("@akasha/pages-ui-store/singleton", () => ({
  ...pagesStoreSingleton,
  configurePagesStoreAuth: () => Promise.resolve(),
  getPagesStore: () =>
    Promise.resolve({
      acquireSlug: () => undefined,
      whenSlugReady: () => Promise.resolve(),
    }),
}))
const offlineCacheNamespace = await import(
  "../offline-cache-namespace/offline-cache-namespace.module.code.ts"
)
mock.module("../offline-cache-namespace/offline-cache-namespace.module.code.ts", () => ({
  ...offlineCacheNamespace,
  setOfflineCacheUserKey: () => undefined,
}))

const nullComponent = () => null
mock.module("../deep-link-open-sync/deep-link-open-sync.module.code.tsx", () => ({
  DeepLinkOpenSync: nullComponent,
}))
mock.module("../native-auth-refresh-sync/native-auth-refresh-sync.module.code.tsx", () => ({
  NativeAuthRefreshSync: nullComponent,
}))
mock.module("../offline-text-sync/offline-text-sync.module.code.tsx", () => ({
  OfflineTextSync: nullComponent,
}))
mock.module("../push-registration-sync/push-registration-sync.module.code.tsx", () => ({
  PushRegistrationSync: nullComponent,
}))

function IdentityRecorder() {
  const userID = useContext(UserIdContext)
  useEffect(() => {
    trail.push(`identity is ${userID ?? "null"}`)
  }, [userID])
  return null
}

const reactRouter = await import("react-router")
mock.module("react-router", () => ({
  ...reactRouter,
  useNavigate: () => (to: string) => {
    trail.push(`navigate ${to}`)
  },
}))

const { AuthProvider } = await import("./alan-auth-provider.module.code.tsx")

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
  trail.length = 0
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
  expect(trail).toContain("identity is user-under-test")

  trail.length = 0

  currentSession = null
  await act(async () => {
    authCallback?.("SIGNED_OUT", null)
  })
  await settle()
}

test("a session ending drops the identity out of the context", async () => {
  await renderSignedInThenSignOut()

  expect(trail).toContain("identity is null")
})

test("the identity goes null before the route changes, or the clear is never reached", async () => {
  await renderSignedInThenSignOut()

  const sawNull = trail.indexOf("identity is null")
  const moved = trail.findIndex((entry) => entry.startsWith("navigate "))

  expect(sawNull).toBeGreaterThan(-1)
  expect(moved).toBeGreaterThan(-1)
  expect(sawNull).toBeLessThan(moved)
})

test("sign-out lands on the signed-out route, remembering where the person was", async () => {
  await renderSignedInThenSignOut()

  expect(trail.filter((entry) => entry.startsWith("navigate "))).toEqual([
    `navigate /sign-in?next=${encodeURIComponent(SIGNED_IN_AT)}`,
  ])
})
