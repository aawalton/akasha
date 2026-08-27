import { afterEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet, useLocation } from "react-router"
import type { AppUrlOpen } from "../lib/capacitor-bridge"

function makeFakeApp(opts: { launchUrl?: string | null; listenerShape?: "sync" | "promise" }) {
  const listeners = new Map<string, ((event: AppUrlOpen) => void)[]>()
  return {
    emit(name: string, event: AppUrlOpen) {
      for (const fn of listeners.get(name) ?? []) fn(event)
    },
    plugin: {
      getLaunchUrl: async () => (opts.launchUrl == null ? null : { url: opts.launchUrl }),
      addListener: (eventName: string, listener: (event: AppUrlOpen) => void) => {
        const arr = listeners.get(eventName) ?? []
        arr.push(listener)
        listeners.set(eventName, arr)
        const handle = { remove: async () => {} }
        return opts.listenerShape === "promise" ? Promise.resolve(handle) : handle
      },
    },
  }
}

type FakeApp = ReturnType<typeof makeFakeApp>["plugin"]
let currentApp: FakeApp | null = null

const realBridge = await import("../lib/capacitor-bridge")
const realIsNativeShell = realBridge.isNativeShell
const realGetStatusBar = realBridge.getStatusBar
const realGetFilesystem = realBridge.getFilesystem
const realGetBadge = realBridge.getBadge
const realGetPushNotifications = realBridge.getPushNotifications
const realGetDeviceSecret = realBridge.getDeviceSecret
mock.module("../lib/capacitor-bridge", () => ({
  isNativeShell: realIsNativeShell,
  getStatusBar: realGetStatusBar,
  getFilesystem: realGetFilesystem,
  getBadge: realGetBadge,
  getKokoroTts: realBridge.getKokoroTts,
  getPushNotifications: realGetPushNotifications,
  getDeviceSecret: realGetDeviceSecret,
  getApp: () => currentApp,
}))

const { DeepLinkOpenSync } = await import("./deep-link-open-sync")

function installApp(fake: ReturnType<typeof makeFakeApp> | null) {
  currentApp = fake == null ? null : fake.plugin
  window.Capacitor = { isNativePlatform: () => true, Plugins: {} }
}

afterEach(() => {
  cleanup()
  currentApp = null
  window.Capacitor = undefined
})

function Loc() {
  const location = useLocation()
  return <div data-testid="loc">{`${location.pathname}${location.search}`}</div>
}

function renderSync(initial = "/") {
  function Layout() {
    return (
      <>
        <DeepLinkOpenSync />
        <Loc />
        <Outlet />
      </>
    )
  }
  const Stub = createRoutesStub([
    {
      Component: Layout,
      children: [
        { index: true, Component: () => null },
        { path: "nav/:p", Component: () => null },
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

describe("DeepLinkOpenSync", () => {
  it("routes an appUrlOpen widget tap into the SPA", async () => {
    const fake = makeFakeApp({})
    installApp(fake)
    const view = renderSync("/")
    await flush()

    await act(async () => {
      fake.emit("appUrlOpen", { url: "capacitor://localhost/nav/claude-accounts-d93b211a" })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe("/nav/claude-accounts-d93b211a")
  })

  it("preserves the ?tab= query on the deep link", async () => {
    const fake = makeFakeApp({})
    installApp(fake)
    const view = renderSync("/")
    await flush()

    await act(async () => {
      fake.emit("appUrlOpen", {
        url: "capacitor://localhost/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c",
      })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe(
      "/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c"
    )
  })

  it("replays a cold-launch getLaunchUrl once on mount", async () => {
    const fake = makeFakeApp({ launchUrl: "capacitor://localhost/nav/projects-ee268975" })
    installApp(fake)
    const view = renderSync("/")
    await flush()

    expect(view.getByTestId("loc").textContent).toBe("/nav/projects-ee268975")
  })

  it("consumes the promise-shaped addListener return too", async () => {
    const fake = makeFakeApp({ listenerShape: "promise" })
    installApp(fake)
    const view = renderSync("/")
    await flush()

    await act(async () => {
      fake.emit("appUrlOpen", { url: "capacitor://localhost/nav/tasks-a7242626" })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe("/nav/tasks-a7242626")
  })

  it("ignores an appUrlOpen with no safe routable path", async () => {
    const fake = makeFakeApp({})
    installApp(fake)
    const view = renderSync("/")
    await flush()

    await act(async () => {
      fake.emit("appUrlOpen", { url: "capacitor://localhost//evil.com/steal" })
      await Promise.resolve()
    })
    expect(view.getByTestId("loc").textContent).toBe("/")
  })

  it("no-ops when the App plugin is absent (build predates the dep)", async () => {
    installApp(null)
    const view = renderSync("/")
    await flush()
    expect(view.getByTestId("loc").textContent).toBe("/")
  })
})
