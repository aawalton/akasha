import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import type { GameAlerts, ResolvedGameDisplay } from "@alanwalton/awen-core/game-schema"
import { act, cleanup, renderHook } from "@shared/utils-test"
import type { AwenGame } from "../components/awen-display"
import type { SessionEnvelope } from "../lib/client-envelope"

const soundCalls: string[] = []
let primeCount = 0

mock.module("../lib/alert-sound", () => ({
  playAlertSound: (preset: string): undefined => {
    soundCalls.push(preset)
  },
  primeAudio: (): undefined => {
    primeCount += 1
  },
}))

const { useContentAlerts } = await import("./use-content-alerts")

type NotifCall = { title: string; body: string | undefined; tag: string | undefined }
const notifyCalls: NotifCall[] = []

interface NotificationSpy {
  (title: string, opts?: { body?: string; tag?: string }): undefined
  permission: string
  requestPermission: () => Promise<string>
}

const origHasFocus = document.hasFocus.bind(document)
const origNotification: unknown = Reflect.get(globalThis, "Notification")

function installNotification(
  permission: "granted" | "denied" | "default",
  grantResult?: string
): undefined {
  function base(title: string, opts?: { body?: string; tag?: string }): undefined {
    notifyCalls.push({ title, body: opts?.body, tag: opts?.tag })
    return undefined
  }
  const resolved = grantResult ?? permission
  const spy: NotificationSpy = Object.assign(base, {
    permission,
    requestPermission: async (): Promise<string> => {
      spy.permission = resolved
      return resolved
    },
  })
  Reflect.set(globalThis, "Notification", spy)
  Reflect.set(window, "Notification", spy)
  return undefined
}

function setFocus(focused: boolean): undefined {
  document.hasFocus = (): boolean => focused
  return undefined
}

function proseEnvelope(
  turns: ReadonlyArray<{ id: string; title: string; text: string; turnNumber: number }>
): SessionEnvelope {
  return { title: "Probe Game", chapterProse: turns.map((t) => ({ ...t })) }
}

function makeGame(alerts?: GameAlerts): AwenGame {
  const display: ResolvedGameDisplay = {
    modules: { chapterProse: {} },
    pollMs: 1500,
    ...(alerts !== undefined ? { alerts } : {}),
  }
  return { externalId: "probe-game", title: "Probe Game", display }
}

const T1 = { id: "t1", title: "One", text: "FIRSTPROSE", turnNumber: 1 }
const T2 = { id: "t2", title: "Two", text: "SECRETPROSE", turnNumber: 2 }

beforeEach(() => {
  installNotification("granted")
  setFocus(false)
})

afterEach(() => {
  cleanup()
  soundCalls.length = 0
  notifyCalls.length = 0
  primeCount = 0
  document.hasFocus = origHasFocus
  if (origNotification === undefined) {
    Reflect.deleteProperty(globalThis, "Notification")
    Reflect.deleteProperty(window, "Notification")
  } else {
    Reflect.set(globalThis, "Notification", origNotification)
    Reflect.set(window, "Notification", origNotification)
  }
})

describe("useContentAlerts — fires only on a live frontier advance (#14524)", () => {
  test("mount with pre-existing content fires NO channel (only a live poll advances)", () => {
    renderHook(({ e }) => useContentAlerts(e, makeGame()), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    expect(soundCalls).toEqual([])
    expect(notifyCalls).toEqual([])
  })

  test("a live advance fires BOTH channels with default prefs (sound=chime, desktop on)", () => {
    const game = makeGame()
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    expect(soundCalls).toEqual(["chime"])
    expect(notifyCalls).toEqual([
      { title: "Probe Game", body: "A new turn is ready.", tag: "probe-game" },
    ])
  })

  test("the desktop channel is spoiler-free — game title + fixed line, never turn text/title", () => {
    const game = makeGame()
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    const serialized = JSON.stringify(notifyCalls)
    expect(serialized).not.toContain("SECRETPROSE")
    expect(serialized).not.toContain("Two")
  })

  test("a rerender with the SAME frontier fires nothing (no advance)", () => {
    const game = makeGame()
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1, T2]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    expect(soundCalls).toEqual([])
    expect(notifyCalls).toEqual([])
  })

  test("empty→content observed live DOES fire (a game beginning while watched)", () => {
    const game = makeGame()
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1]) })
    })
    expect(soundCalls).toEqual(["chime"])
    expect(notifyCalls).toHaveLength(1)
  })

  test("a focused tab suppresses the desktop channel even though the sound still plays", () => {
    setFocus(true)
    const game = makeGame()
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    expect(soundCalls).toEqual(["chime"])
    expect(notifyCalls).toEqual([])
  })
})

describe("useContentAlerts — respects the game's resolved alert prefs (#14524)", () => {
  test('sound:"off" silences the sound channel but the desktop channel still fires', () => {
    const game = makeGame({ sound: "off" })
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    expect(soundCalls).toEqual([])
    expect(notifyCalls).toHaveLength(1)
  })

  test("desktop:false suppresses the desktop channel but the sound still plays", () => {
    const game = makeGame({ desktop: false })
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    expect(soundCalls).toEqual(["chime"])
    expect(notifyCalls).toEqual([])
  })

  test("a named preset routes through to the sound channel verbatim", () => {
    const game = makeGame({ sound: "bell" })
    const { rerender } = renderHook(({ e }) => useContentAlerts(e, game), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    act(() => {
      rerender({ e: proseEnvelope([T1, T2]) })
    })
    expect(soundCalls).toEqual(["bell"])
  })
})

describe("useContentAlerts — permission affordance (#14524)", () => {
  test("needsPermissionPrompt is true only when desktop is on AND permission is default", () => {
    installNotification("default")
    const { result } = renderHook(({ e }) => useContentAlerts(e, makeGame()), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    expect(result.current.needsPermissionPrompt).toBe(true)
  })

  test("desktop:false never prompts, even when permission is default", () => {
    installNotification("default")
    const { result } = renderHook(({ e }) => useContentAlerts(e, makeGame({ desktop: false })), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    expect(result.current.needsPermissionPrompt).toBe(false)
  })

  test("granted permission does not prompt", () => {
    installNotification("granted")
    const { result } = renderHook(({ e }) => useContentAlerts(e, makeGame()), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    expect(result.current.needsPermissionPrompt).toBe(false)
  })

  test("enableAlerts primes audio and, once permission resolves granted, clears the prompt", async () => {
    installNotification("default", "granted")
    const { result } = renderHook(({ e }) => useContentAlerts(e, makeGame()), {
      initialProps: { e: proseEnvelope([T1]) },
    })
    expect(result.current.needsPermissionPrompt).toBe(true)
    await act(async () => {
      result.current.enableAlerts()
    })
    expect(primeCount).toBeGreaterThan(0)
    expect(result.current.needsPermissionPrompt).toBe(false)
  })
})
