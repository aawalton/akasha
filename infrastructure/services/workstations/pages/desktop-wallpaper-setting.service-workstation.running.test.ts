import { expect, mock, test } from "bun:test"

const STARTED: (readonly unknown[])[] = []
let THROWS = false

const SETTLE_MS = 20

const setting = await import(
  "akasha/personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts"
)

mock.module(
  "akasha/personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts",
  () => ({
    ...setting,
    watchDesktopWallpaper: (...given: readonly unknown[]) => {
      STARTED.push(given)
      if (THROWS) throw new Error("no watch")
      return () => undefined
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/desktop-wallpaper-setting.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the watch the setting module holds rather than one written again here", () => {
  STARTED.length = 0
  THROWS = false
  void running.runService()
  expect(STARTED).toEqual([[]])
})

test("a run that started the watch does not end, so systemd is left with a service running", async () => {
  STARTED.length = 0
  THROWS = false
  let ended = false
  const settle = (): undefined => {
    ended = true
    return undefined
  }
  running.runService().then(settle, settle)
  await Bun.sleep(SETTLE_MS)
  expect(ended).toBe(false)
})

test("a watch that cannot start ends the run, so systemd is left with a service that failed", async () => {
  STARTED.length = 0
  THROWS = true
  await expect(running.runService()).rejects.toThrow()
})
