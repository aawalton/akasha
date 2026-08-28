import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  mock,
  spyOn,
} from "bun:test"
import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { z } from "zod"
import type { DeviceSecretPlugin } from "../../lib/capacitor-bridge"
import { MintDeviceSecretSchema, RevokeDeviceSecretSchema } from "../lib/device-secret"

const USER_ID = "user-1"
const DEVICE_ID = "IFV-9E1C-4A2B-8D07"
const MINTED_SECRET = "dvs_v1_9Xk2mQ7bT1sZpR4vN0wLc8JhYdEgA5uI3oB6nMtKlQz"
const MINT_PATH = "/api/device-secret/mint"
const REVOKE_PATH = "/api/device-secret/revoke"

const callOrder: string[] = []

type PeekResult = { present: boolean; fingerprint: string | null; domain: string }

function makeFakePlugin(
  opts: { deviceId?: string | null; peek?: PeekResult | "reject"; store?: "reject" } = {}
) {
  const calls: string[] = []
  const storeArgs: { secret: string; userId: string }[] = []
  const plugin: DeviceSecretPlugin = {
    getDeviceId: async () => {
      calls.push("getDeviceId")
      return { deviceId: opts.deviceId === undefined ? DEVICE_ID : opts.deviceId }
    },
    peek: async ({ userId }) => {
      calls.push(`peek:${userId}`)
      if (opts.peek === "reject") throw new Error("keychain probe failed")
      return opts.peek ?? { present: false, fingerprint: null, domain: "pinned" }
    },
    store: async (options) => {
      calls.push("store")
      storeArgs.push(options)
      if (opts.store === "reject") throw new Error("keychain store failed")
      return { domain: "pinned" }
    },
    clear: async () => {
      calls.push("clear")
      callOrder.push("clear")
      return { cleared: true }
    },
  }
  return { calls, storeArgs, plugin }
}

type FakeDeviceSecret = ReturnType<typeof makeFakePlugin>
let currentPlugin: DeviceSecretPlugin | null = null

type ApiCall = { input: string; init: RequestInit | undefined }
const apiCalls: ApiCall[] = []
let revokeRejects = false

const realApiFetch = await import("../../lib/api-fetch")
const realApiFetchFn = realApiFetch.apiFetch
const realBuildApiRequest = realApiFetch.buildApiRequest
const capturingApiFetch: typeof realApiFetchFn = async (input, init) => {
  const url = String(input)
  callOrder.push(`fetch:${url}`)
  apiCalls.push({ input: url, init })
  if (url === REVOKE_PATH && revokeRejects) throw new Error("revoke POST failed")
  const payload = url === MINT_PATH ? { ok: true, deviceSecret: MINTED_SECRET } : { ok: true }
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
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
const realGetPushNotifications = realBridge.getPushNotifications
const realGetBadge = realBridge.getBadge
const realGetApp = realBridge.getApp
const realGetKokoroTts = realBridge.getKokoroTts
mock.module("../../lib/capacitor-bridge", () => ({
  isNativeShell: realIsNativeShell,
  getStatusBar: realGetStatusBar,
  getFilesystem: realGetFilesystem,
  getPushNotifications: realGetPushNotifications,
  getBadge: realGetBadge,
  getApp: realGetApp,
  getKokoroTts: realGetKokoroTts,
  getDeviceSecret: () => currentPlugin,
}))

const { DeviceSecretSync } = await import("./device-secret-sync")

const logSpy = spyOn(console, "log").mockImplementation(() => {})
const infoSpy = spyOn(console, "info").mockImplementation(() => {})
const warnSpy = spyOn(console, "warn").mockImplementation(() => {})
const errorSpy = spyOn(console, "error").mockImplementation(() => {})
const setItemSpy = spyOn(Storage.prototype, "setItem")
const consoleSpies = [logSpy, infoSpy, warnSpy, errorSpy]

function consoleText(): string {
  return consoleSpies
    .flatMap((spy) => spy.mock.calls.flat())
    .map(String)
    .join(" ")
}
function errorText(): string {
  return errorSpy.mock.calls.flat().map(String).join(" ")
}
function storedText(): string {
  return setItemSpy.mock.calls.flat().map(String).join(" ")
}

afterAll(() => {
  for (const spy of consoleSpies) spy.mockRestore()
  setItemSpy.mockRestore()
})

function installPlugin(fake: FakeDeviceSecret | null, native = true) {
  currentPlugin = fake == null ? null : fake.plugin
  if (native) window.Capacitor = { isNativePlatform: () => true, Plugins: {} }
}

beforeEach(() => {
  apiCalls.length = 0
  callOrder.length = 0
  revokeRejects = false
  currentPlugin = null
  window.Capacitor = undefined
  for (const spy of consoleSpies) spy.mockClear()
  setItemSpy.mockClear()
})

afterEach(() => {
  cleanup()
  currentPlugin = null
  window.Capacitor = undefined
})

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}

function tree(userID: string | null) {
  return (
    <UserIdContext value={userID}>
      <DeviceSecretSync />
    </UserIdContext>
  )
}

function mintCalls(): readonly ApiCall[] {
  return apiCalls.filter((call) => call.input === MINT_PATH)
}
function countCalls(fake: FakeDeviceSecret, name: string): number {
  return fake.calls.filter((call) => call === name || call.startsWith(`${name}:`)).length
}
function bodyOf<T>(schema: z.ZodType<T>, call: ApiCall | undefined): T {
  return schema.parse(JSON.parse(String(call?.init?.body)))
}

const PRESENT: PeekResult = { present: true, fingerprint: "a1b2c3d4", domain: "pinned" }
const ABSENT: PeekResult = { present: false, fingerprint: null, domain: "pinned" }

describe("DeviceSecretSync", () => {
  it("does nothing off the native shell — no plugin call, no POST", async () => {
    const fake = makeFakePlugin()
    installPlugin(fake, false)
    render(tree(USER_ID))
    await flush()

    expect(fake.calls).toEqual([])
    expect(apiCalls).toEqual([])
  })

  it("logs a rebuild-the-shell error when the DeviceSecret plugin is absent", async () => {
    installPlugin(null)
    render(tree(USER_ID))
    await flush()

    expect(errorText().toLowerCase()).toContain("rebuild")
    expect(apiCalls).toEqual([])
  })

  it("MINT-IF-ABSENT: never mints when peek reports the secret is already present", async () => {
    const fake = makeFakePlugin({ peek: PRESENT })
    installPlugin(fake)
    render(tree(USER_ID))
    await flush()

    expect(countCalls(fake, "peek")).toBe(1)
    expect(mintCalls()).toEqual([])
    expect(fake.storeArgs).toEqual([])
  })

  it("mints and hands the plaintext to store exactly once when peek reports absent", async () => {
    const fake = makeFakePlugin({ peek: ABSENT })
    installPlugin(fake)
    render(tree(USER_ID))
    await flush()

    expect(mintCalls()).toHaveLength(1)
    const call = mintCalls()[0]
    expect(call?.init?.method).toBe("POST")
    expect(bodyOf(MintDeviceSecretSchema, call)).toEqual({ deviceId: DEVICE_ID })
    expect(fake.storeArgs).toEqual([{ secret: MINTED_SECRET, userId: USER_ID }])
  })

  it("keeps the plaintext out of every log and out of localStorage", async () => {
    const fake = makeFakePlugin({ peek: ABSENT })
    installPlugin(fake)
    render(tree(USER_ID))
    await flush()

    expect(fake.storeArgs).toEqual([{ secret: MINTED_SECRET, userId: USER_ID }])
    expect(consoleText()).not.toContain(MINTED_SECRET)
    expect(storedText()).not.toContain(MINTED_SECRET)
  })

  it("mints when the probe itself fails — an unreadable Keychain must not strand a device", async () => {
    const fake = makeFakePlugin({ peek: "reject" })
    installPlugin(fake)
    render(tree(USER_ID))
    await flush()

    expect(mintCalls()).toHaveLength(1)
    expect(mintCalls()[0]?.init?.method).toBe("POST")
  })

  it("discards a failed store — logs loudly, and never re-mints or re-probes to recover", async () => {
    const fake = makeFakePlugin({ peek: ABSENT, store: "reject" })
    installPlugin(fake)
    render(tree(USER_ID))
    await flush()

    expect(errorText()).not.toBe("")
    expect(apiCalls).toHaveLength(1)
    expect(countCalls(fake, "getDeviceId")).toBe(1)
    expect(countCalls(fake, "peek")).toBe(1)
    expect(countCalls(fake, "store")).toBe(1)
  })

  it("SIGN-OUT: clears the Keychain copy BEFORE the revoke POST", async () => {
    const fake = makeFakePlugin({ peek: PRESENT })
    installPlugin(fake)
    const view = render(tree(USER_ID))
    await flush()
    callOrder.length = 0

    view.rerender(tree(null))
    await flush()

    expect(countCalls(fake, "clear")).toBe(1)
    const clearAt = callOrder.indexOf("clear")
    const revokeAt = callOrder.indexOf(`fetch:${REVOKE_PATH}`)
    expect(clearAt).toBeGreaterThanOrEqual(0)
    expect(revokeAt).toBeGreaterThanOrEqual(0)
    expect(clearAt).toBeLessThan(revokeAt)
  })

  it("POSTs a strict revoke body, and a rejecting revoke does not throw", async () => {
    revokeRejects = true
    const fake = makeFakePlugin({ peek: PRESENT })
    installPlugin(fake)
    const view = render(tree(USER_ID))
    await flush()

    view.rerender(tree(null))
    await flush()

    const revoke = apiCalls.find((call) => call.input === REVOKE_PATH)
    expect(revoke?.init?.method).toBe("POST")
    expect(bodyOf(RevokeDeviceSecretSchema, revoke)).toEqual({ deviceId: DEVICE_ID })
    expect(() => view.unmount()).not.toThrow()
  })
})
