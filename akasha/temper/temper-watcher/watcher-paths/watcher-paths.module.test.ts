import { expect, test } from "bun:test"
import { watcherConfigDir, watcherLogDir } from "./watcher-paths.module.code.ts"

test("a directory named outright is taken over every other answer", () => {
  expect(watcherLogDir({ platform: "linux", env: { WATCHER_LOG_DIR: "/l", HOME: "/h" } })).toBe(
    "/l"
  )
  expect(
    watcherConfigDir({ platform: "linux", env: { WATCHER_CONFIG_DIR: "/c", HOME: "/h" } })
  ).toBe("/c")
})

test("an empty name is no name", () => {
  expect(watcherLogDir({ platform: "linux", env: { WATCHER_LOG_DIR: "", HOME: "/h" } })).toBe(
    "/h/.local/state/temper-watcher"
  )
})

test("the XDG directories answer where they are set", () => {
  expect(watcherLogDir({ platform: "linux", env: { XDG_STATE_HOME: "/x", HOME: "/h" } })).toBe(
    "/x/temper-watcher"
  )
  expect(watcherConfigDir({ platform: "linux", env: { XDG_CONFIG_HOME: "/y", HOME: "/h" } })).toBe(
    "/y/temper"
  )
})

test("windows is answered from the directories windows keeps such files in", () => {
  expect(watcherLogDir({ platform: "win32", env: { LOCALAPPDATA: "/a" } })).toBe("/a/TemperWatcher")
  expect(watcherConfigDir({ platform: "win32", env: { APPDATA: "/b" } })).toBe("/b/temper")
})

test("an unset home is refused rather than answered as the root", () => {
  expect(() => watcherLogDir({ platform: "linux", env: {} })).toThrow("HOME is unset")
  expect(() => watcherConfigDir({ platform: "linux", env: {} })).toThrow("HOME is unset")
})
