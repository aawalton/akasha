import { expect, test } from "bun:test"
import {
  CONFIGURATION,
  linesFor,
  linesOf,
  NO_UPLOAD_SAID,
  REF,
  UPLOAD_SAID,
} from "./deploy-ios-shipping.module.code.ts"

test("the report names the app and the page it was read from", () => {
  const lines = linesFor("atlas", "akasha:pages/ios-app/atlas-ios.ios-app.md", true)
  expect(lines[0]).toBe("ios-app\tatlas\takasha:pages/ios-app/atlas-ios.ios-app.md")
})

test("the report names the configuration and the ref the build is made from", () => {
  const lines = linesFor("atlas", "some/page.md", true)
  expect(lines[1]).toBe(`build\t${CONFIGURATION}\tfrom ${REF}`)
})

test("a run that uploads nothing says so before it begins", () => {
  expect(linesFor("atlas", "some/page.md", true)[2]).toBe(NO_UPLOAD_SAID)
})

test("a run that uploads says a tester is sent the build, since none can decline it", () => {
  expect(linesFor("atlas", "some/page.md", false)[2]).toBe(UPLOAD_SAID)
})

test("what the build said becomes one report line for each line it said", () => {
  expect(linesOf(["one\ntwo\n", "three\n"])).toEqual(["one", "two", "three"])
})

test("a chunk broken mid-line joins rather than becoming two lines", () => {
  expect(linesOf(["ARCHIVE ", "SUCCEEDED\n"])).toEqual(["ARCHIVE SUCCEEDED"])
})

test("a build that said nothing adds nothing to the report", () => {
  expect(linesOf([])).toEqual([])
  expect(linesOf(["\n \n"])).toEqual([])
})
