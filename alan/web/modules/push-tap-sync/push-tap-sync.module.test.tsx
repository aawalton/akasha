import { beforeEach, expect, mock, test } from "bun:test"
import { render } from "@testing-library/react"
import * as capacitorBridge from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { act, useEffect } from "react"
import { MemoryRouter, useLocation } from "react-router"

type Tapped = { notification?: { data?: unknown } }

const LISTENERS = new Map<string, (event: Tapped) => void>()

const VISITED: string[] = []

const PLUGIN = {
  addListener: (name: string, listener: (event: Tapped) => void) => {
    LISTENERS.set(name, listener)
    return Promise.resolve({ remove: () => Promise.resolve() })
  },
}

mock.module("akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts", () => ({
  ...capacitorBridge,
  isNativeShell: () => true,
  getPushNotifications: () => PLUGIN,
}))

const { PushTapSync } = await import(
  "akasha/alan/web/modules/push-tap-sync/push-tap-sync.module.code.tsx"
)

function LocationRecorder() {
  const location = useLocation()
  useEffect(() => {
    VISITED.push(`${location.pathname}${location.search}`)
  }, [location])
  return null
}

async function settle(): Promise<void> {
  for (let i = 0; i < 5; i++) {
    await act(async () => {
      await Promise.resolve()
    })
  }
}

async function tap(data: unknown): Promise<void> {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <PushTapSync />
      <LocationRecorder />
    </MemoryRouter>
  )
  await settle()
  const listener = LISTENERS.get("pushNotificationActionPerformed")
  if (listener === undefined) throw new Error("no tap listener was added")
  await act(async () => {
    listener({ notification: { data } })
  })
}

beforeEach(() => {
  LISTENERS.clear()
  VISITED.length = 0
})

test("a tapped notification carrying a path opens that path", async () => {
  await tap({ path: "/pages/alan?from=push" })

  expect(VISITED.at(-1)).toBe("/pages/alan?from=push")
})

test("a tapped notification carrying a path to another origin opens nothing", async () => {
  await tap({ path: "//elsewhere.example/pages" })

  expect(VISITED).toEqual(["/"])
})

test("a tapped notification carrying no path opens nothing", async () => {
  await tap({})

  expect(VISITED).toEqual(["/"])
})
