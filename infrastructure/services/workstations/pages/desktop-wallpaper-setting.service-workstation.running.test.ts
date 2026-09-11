import { expect, mock, test } from "bun:test"

const HANDED: (readonly unknown[])[] = []
let CODE = 0

const setting = await import(
  "akasha/personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts"
)

mock.module(
  "akasha/personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts",
  () => ({
    ...setting,
    runDesktopWallpaperSetting: (...given: readonly unknown[]) => {
      HANDED.push(given)
      return CODE
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

test("a run turns the setting module's own setting rather than a setting written again here", () => {
  HANDED.length = 0
  CODE = 0
  running.runService()
  expect(HANDED.length).toBe(1)
})

test("the setting is handed nothing, which is what the unit's command line hands it", () => {
  HANDED.length = 0
  CODE = 0
  running.runService()
  expect(HANDED).toEqual([[]])
})

test("a setting that was done hands nothing back, so the run ends of its own accord", () => {
  HANDED.length = 0
  CODE = 0
  expect(running.runService()).toBeUndefined()
})
