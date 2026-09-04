/**
 * What sign-out has to do to the tree, asserted directly.
 *
 * Alan's report was "Sign Out doesn't work, menu still shows Sign Out afterwards" on build 198.
 * Two things were wrong, and this file pins the second one — the one that outlives the first.
 *
 * When a session ends, `AuthProvider` used to head straight for `/sign-in` without ever calling
 * `setUserID(null)`. `UserIdContext` kept the old id, so every consumer below it — the shell's
 * footer, and `DeviceSecretSync`, whose effect is keyed on that id — carried on as though
 * nobody had signed out. `DeviceSecretSync` is the only caller of the native
 * `DeviceSecret.clear()`, so a stale keychain item could never leave the phone.
 *
 * Ordering is load-bearing too, which is why the second test exists. `/sign-in` sits outside the
 * layout that mounts this provider, so a route change unmounts `DeviceSecretSync`. If the null
 * id and the route change land in one commit, React runs the cleanup instead of the null-id
 * effect and the clear is lost. The null render has to be observed first.
 */
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

/** Every notable moment, in the order it happened. The ordering assertion reads this. */
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

mock.module("@akasha/supabase-rr/supabase-provider", () => ({
  useSupabase: () => fakeSupabase,
  SupabaseProvider: ({ children }: { children: unknown }) => children,
}))

mock.module("@akasha/pages-ui/app-version/use-app-version-check", () => ({
  useAppVersionCheck: () => undefined,
}))
mock.module("@akasha/pages-ui-store/diagnostics", () => ({
  emitStoreDiagnostic: () => undefined,
  setStoreDiagnosticsSink: () => undefined,
}))
mock.module("@akasha/pages-ui-store/report-stall", () => ({
  reportPagesStoreStall: () => Promise.resolve(),
}))
mock.module("@akasha/pages-ui-store/singleton", () => ({
  configurePagesStoreAuth: () => Promise.resolve(),
  getPagesStore: () =>
    Promise.resolve({
      acquireSlug: () => undefined,
      whenSlugReady: () => Promise.resolve(),
    }),
}))
mock.module("../offline-cache-namespace/offline-cache-namespace.module.code.ts", () => ({
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

/**
 * Reads the identity exactly the way `DeviceSecretSync` does — `useContext(UserIdContext)` with
 * an effect keyed on it — from inside the same provider, so it sees the same values in the same
 * commits. Deliberately a child rather than a mock of the real component: `mock.module` is
 * global to the test process, and mocking that path here reached into the sibling test file that
 * exercises the real `DeviceSecretSync` and quietly hollowed it out.
 */
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

/** Drains microtasks and lets one round of zero-delay timers fire. */
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

const happyDom = globalThis as unknown as { happyDOM: { setURL: (url: string) => void } }

beforeEach(() => {
  trail.length = 0
  authCallback = null
  currentSession = SIGNED_IN_SESSION
  // happy-dom starts on about:blank, whose pathname is "blank" — that would read as a real page
  // and change what `next` carries. Put the window somewhere the app could actually be.
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

  // The very first render of any mount has a null id — `useState(null)` before `getSession`
  // answers. Reading the trail from here on keeps that opening null out of the way, so a test
  // that claims to see the identity drop can only be seeing the sign-out do it.
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
