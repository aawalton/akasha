import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, mock } from "bun:test"
import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet, useLocation } from "react-router"
import type { PushActionPerformed, PushRegistrationToken } from "../../lib/capacitor-bridge"

type Receive = "prompt" | "prompt-with-rationale" | "granted" | "denied"
type FakePushEvent = PushRegistrationToken | { error?: unknown } | PushActionPerformed

function makeFakePlugin(opts: {
  check: Receive
  request?: Receive
  listenerShape?: "sync" | "promise"
}) {
  const listeners = new Map<string, ((event: FakePushEvent) => void)[]>()
  let registerCalls = 0
  let requestCalls = 0
  return {
    get registerCalls() {
      return registerCalls
    },
    get requestCalls() {
      return requestCalls
    },
    emit(name: string, event: FakePushEvent) {
      for (const fn of listeners.get(name) ?? []) fn(event)
    },
    plugin: {
      checkPermissions: async () => ({ receive: opts.check }),
      requestPermissions: async () => {
        requestCalls++
        return { receive: opts.request ?? opts.check }
      },
      register: async () => {
        registerCalls++
      },
      addListener: (eventName: string, listener: (event: FakePushEvent) => void) => {
        const arr = listeners.get(eventName) ?? []
        arr.push(listener)
        listeners.set(eventName, arr)
        const handle = { remove: async () => {} }
        return opts.listenerShape === "promise" ? Promise.resolve(handle) : handle
      },
    },
  }
}

type FakePlugin = ReturnType<typeof makeFakePlugin>["plugin"]
let currentPlugin: FakePlugin | null = null

type ApiCall = { input: string; init: RequestInit | undefined }
const apiCalls: ApiCall[] = []
let apiResponseOk = true
const realApiFetch = await import("../../lib/api-fetch")
const realApiFetchFn = realApiFetch.apiFetch
const realBuildApiRequest = realApiFetch.buildApiRequest
const capturingApiFetch: typeof realApiFetchFn = async (input, init) => {
  apiCalls.push({ input: String(input), init })
  return new Response(null, { status: apiResponseOk ? 200 : 500 })
}
let currentApiFetch: typeof realApiFetchFn = realApiFetchFn
mock.module("../../lib/api-fetch", () => ({
  buildApiRequest: realBuildApiRequest,
  apiFetch: (input: string, init?: RequestInit) => currentApiFetch(input, init),
}))
beforeAll(() => {
  currentApiFetch = capturingApiFetch
})
afterAll(() => {
  currentApiFetch = realApiFetchFn
})
const realBridge = await import("../../lib/capacitor-bridge")
const realIsNativeShell = realBridge.isNativeShell
const realGetStatusBar = realBridge.getStatusBar
const realGetFilesystem = realBridge.getFilesystem
const realGetBadge = realBridge.getBadge
const realGetApp = realBridge.getApp
const realGetDeviceSecret = realBridge.getDeviceSecret
mock.module("../../lib/capacitor-bridge", () => ({
  isNativeShell: realIsNativeShell,
  getStatusBar: realGetStatusBar,
  getFilesystem: realGetFilesystem,
  getBadge: realGetBadge,
  getApp: realGetApp,
  getDeviceSecret: realGetDeviceSecret,
  getKokoroTts: realBridge.getKokoroTts,
  getPushNotifications: () => currentPlugin,
}))

const { PushRegistrationSync } = await import("./push-registration-sync")

function installPlugin(fake: ReturnType<typeof makeFakePlugin> | null) {
  currentPlugin = fake == null ? null : fake.plugin
  window.Capacitor = { isNativePlatform: () => true, Plugins: {} }
}

afterEach(() => {
  cleanup()
  apiCalls.length = 0
  apiResponseOk = true
  currentPlugin = null
  window.Capacitor = undefined
})

beforeEach(() => {
  apiCalls.length = 0
})

function Loc() {
  const location = useLocation()
  return <div data-testid="loc">{location.pathname}</div>
}

function renderSync(userID: string | null, initial = "/") {
  function Layout() {
    return (
      <UserIdContext value={userID}>
        <PushRegistrationSync />
        <Loc />
        <Outlet />
      </UserIdContext>
    )
  }
  const Stub = createRoutesStub([
    {
      Component: Layout,
      children: [
        { index: true, Component: () => null },
        { path: "project/:p", Component: () => null },
      ],
    },
  ])
  const { container } = render(<Stub initialEntries={[initial]} />)
  return within(container)
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}

describe("PushRegistrationSync", () => {
  it("registers and POSTs the token when signed in with permission granted", async () => {
    const fake = makeFakePlugin({ check: "granted" })
    installPlugin(fake)
    renderSync("user-abc")
    await flush()

    expect(fake.requestCalls).toBe(0)
    expect(fake.registerCalls).toBe(1)

    await act(async () => {
      fake.emit("registration", { value: "apns-token-xyz" })
      await Promise.resolve()
    })
    expect(apiCalls).toHaveLength(1)
    expect(apiCalls[0]?.input).toBe("/api/push/register")
    expect(apiCalls[0]?.init?.method).toBe("POST")
    expect(apiCalls[0]?.init?.body).toBe(
      JSON.stringify({ deviceToken: "apns-token-xyz", platform: "ios" })
    )
  })

  it("requests permission ONCE from a promptable state, then registers on grant", async () => {
    const fake = makeFakePlugin({ check: "prompt", request: "granted" })
    installPlugin(fake)
    renderSync("user-abc")
    await flush()

    expect(fake.requestCalls).toBe(1)
    expect(fake.registerCalls).toBe(1)
  })

  it("degrades gracefully on permission denied — no register, no re-prompt, no throw", async () => {
    const fake = makeFakePlugin({ check: "denied" })
    installPlugin(fake)
    renderSync("user-abc")
    await flush()

    expect(fake.requestCalls).toBe(0)
    expect(fake.registerCalls).toBe(0)
    expect(apiCalls).toHaveLength(0)
  })

  it("does not register while signed out, but still routes a tap", async () => {
    const fake = makeFakePlugin({ check: "granted" })
    installPlugin(fake)
    const view = renderSync(null, "/")
    await flush()

    expect(fake.registerCalls).toBe(0)

    await act(async () => {
      fake.emit("pushNotificationActionPerformed", {
        actionId: "tap",
        notification: { data: { path: "/project/audit-eb7f7338" } },
      })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe("/project/audit-eb7f7338")
  })

  it("consumes the promise-shaped addListener return too (npm plugin shape)", async () => {
    const fake = makeFakePlugin({ check: "granted", listenerShape: "promise" })
    installPlugin(fake)
    const view = renderSync("user-abc", "/")
    await flush()

    expect(fake.registerCalls).toBe(1)
    await act(async () => {
      fake.emit("pushNotificationActionPerformed", {
        actionId: "tap",
        notification: { data: { path: "/project/audit-eb7f7338" } },
      })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe("/project/audit-eb7f7338")
  })

  it("ignores a tap with no safe routable path", async () => {
    const fake = makeFakePlugin({ check: "granted" })
    installPlugin(fake)
    const view = renderSync("user-abc", "/")
    await flush()

    await act(async () => {
      fake.emit("pushNotificationActionPerformed", {
        actionId: "tap",
        notification: { data: { path: "https://evil.com/x" } },
      })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe("/")
  })

  it("logs and no-ops when the plugin is absent (build predates the dep)", async () => {
    installPlugin(null)
    const view = renderSync("user-abc", "/")
    await flush()
    expect(view.getByTestId("loc").textContent).toBe("/")
    expect(apiCalls).toHaveLength(0)
  })
})
