import { expect, test } from "bun:test"
import {
  addonUpstreamDir,
  esoLiveDirCandidates,
  esouiDir,
  esouiDocPath,
  esouiSourceDir,
} from "./eso-paths.module.code.ts"

test("a directory named outright is taken over every other answer", () => {
  expect(
    esoLiveDirCandidates({ platform: "linux", env: { ESO_LIVE_DIR: "/l", HOME: "/h" } })
  ).toEqual(["/l"])
  expect(esouiDir({ platform: "linux", env: { ESOUI_SRC_DIR: "/e", HOME: "/h" } })).toBe("/e")
  expect(addonUpstreamDir({ platform: "linux", env: { ESO_UPSTREAM_DIR: "/u", HOME: "/h" } })).toBe(
    "/u"
  )
})

test("an empty name is no name", () => {
  expect(esouiDir({ platform: "linux", env: { ESOUI_SRC_DIR: "", HOME: "/h" } })).toBe("/h/esoui")
})

test("linux is answered from the proton prefix the game runs under", () => {
  const [first] = esoLiveDirCandidates({ platform: "linux", env: { HOME: "/h" } })
  expect(first).toBe(
    "/h/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live"
  )
})

test("windows is answered as two candidates, onedrive first", () => {
  expect(esoLiveDirCandidates({ platform: "win32", env: { USERPROFILE: "/p" } })).toEqual([
    "/p/OneDrive/Documents/Elder Scrolls Online/live",
    "/p/Documents/Elder Scrolls Online/live",
  ])
})

test("the source directory and the documentation sit under the clone", () => {
  expect(esouiSourceDir({ platform: "linux", env: { ESOUI_SRC_DIR: "/e" } })).toBe("/e/esoui")
  expect(esouiDocPath({ platform: "linux", env: { ESOUI_SRC_DIR: "/e" } })).toBe(
    "/e/ESOUIDocumentation.txt"
  )
})

test("an unset home is refused rather than answered as the root", () => {
  expect(() => esoLiveDirCandidates({ platform: "linux", env: {} })).toThrow()
  expect(() => esouiDir({ platform: "linux", env: {} })).toThrow()
  expect(() => addonUpstreamDir({ platform: "win32", env: {} })).toThrow()
})
