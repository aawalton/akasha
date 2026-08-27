import { afterEach, describe, expect, test } from "bun:test"
import { fireContentNotification, notificationPermission } from "./alert-notification"

type NotifCall = {
  title: string
  body: string | undefined
  tag: string | undefined
  requireInteraction: boolean | undefined
}
const calls: NotifCall[] = []

interface NotificationSpy {
  (title: string, opts?: { body?: string; tag?: string; requireInteraction?: boolean }): undefined
  permission: string
  requestPermission: () => Promise<string>
}

const origHasFocus = document.hasFocus.bind(document)
const origNotification: unknown = Reflect.get(globalThis, "Notification")

function installNotification(permission: "granted" | "denied" | "default"): undefined {
  function base(
    title: string,
    opts?: { body?: string; tag?: string; requireInteraction?: boolean }
  ): undefined {
    calls.push({
      title,
      body: opts?.body,
      tag: opts?.tag,
      requireInteraction: opts?.requireInteraction,
    })
    return undefined
  }
  const spy: NotificationSpy = Object.assign(base, {
    permission,
    requestPermission: async (): Promise<string> => permission,
  })
  Reflect.set(globalThis, "Notification", spy)
  Reflect.set(window, "Notification", spy)
  return undefined
}

function removeNotification(): undefined {
  Reflect.deleteProperty(globalThis, "Notification")
  Reflect.deleteProperty(window, "Notification")
  return undefined
}

function setFocus(focused: boolean): undefined {
  document.hasFocus = (): boolean => focused
  return undefined
}

afterEach(() => {
  calls.length = 0
  document.hasFocus = origHasFocus
  if (origNotification === undefined) {
    removeNotification()
  } else {
    Reflect.set(globalThis, "Notification", origNotification)
    Reflect.set(window, "Notification", origNotification)
  }
})

describe("fireContentNotification — focus + permission gate (#14524)", () => {
  test("granted + unfocused fires ONE generic, spoiler-free notification that persists until dismissed", () => {
    installNotification("granted")
    setFocus(false)
    fireContentNotification("My Game", "game-xid")
    expect(calls).toHaveLength(1)
    expect(calls[0]).toEqual({
      title: "My Game",
      body: "A new turn is ready.",
      tag: "game-xid",
      requireInteraction: true,
    })
  })

  test("granted but FOCUSED suppresses the notification (Alan is looking at the tab)", () => {
    installNotification("granted")
    setFocus(true)
    fireContentNotification("My Game", "game-xid")
    expect(calls).toHaveLength(0)
  })

  test("denied permission suppresses even when unfocused", () => {
    installNotification("denied")
    setFocus(false)
    fireContentNotification("My Game", "game-xid")
    expect(calls).toHaveLength(0)
  })

  test("default (un-granted) permission suppresses even when unfocused", () => {
    installNotification("default")
    setFocus(false)
    fireContentNotification("My Game", "game-xid")
    expect(calls).toHaveLength(0)
  })
})

describe("notificationPermission — reflects the API, unsupported off-DOM (#14524)", () => {
  test("returns the live permission value", () => {
    installNotification("granted")
    expect(notificationPermission()).toBe("granted")
    installNotification("denied")
    expect(notificationPermission()).toBe("denied")
  })

  test("with no Notification API, reports unsupported and fireContentNotification is a silent no-op", () => {
    removeNotification()
    setFocus(false)
    expect(notificationPermission()).toBe("unsupported")
    expect(() => {
      fireContentNotification("X", "y")
    }).not.toThrow()
    expect(calls).toHaveLength(0)
  })
})
