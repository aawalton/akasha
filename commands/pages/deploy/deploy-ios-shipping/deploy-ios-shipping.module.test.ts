import { expect, test } from "bun:test"
import {
  CONFIGURATION,
  linesFor,
  linesOf,
  NO_UPLOAD_SAID,
  saidOfUnpushed,
  UPLOAD_SAID,
} from "akasha/commands/pages/deploy/deploy-ios-shipping/deploy-ios-shipping.module.code.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

test("the refusal over a branch that would not push names the checkout and the commit", () => {
  const refusal = saidOfUnpushed("/repos/akasha", "83e57975")
  expect(refusal).toContain("/repos/akasha")
  expect(refusal).toContain("83e57975")
  expect(refusal).toContain("origin")
})

test("the report names the app and the page it was read from", () => {
  const lines = linesFor("atlas", "akasha:pages/ios-app/atlas-ios.ios-app.md", true, COMMIT)
  expect(lines[0]).toBe("ios-app\tatlas\takasha:pages/ios-app/atlas-ios.ios-app.md")
})

test("the report names the configuration and the commit the build is made at", () => {
  const lines = linesFor("atlas", "some/page.md", true, COMMIT)
  expect(lines[1]).toBe(`build\t${CONFIGURATION}\tat ${COMMIT}`)
})

test("a build asked for another commit reports that commit rather than a fixed one", () => {
  const lines = linesFor("atlas", "some/page.md", true, "4f2a91c")
  expect(lines[1]).toBe(`build\t${CONFIGURATION}\tat 4f2a91c`)
  expect(lines[1]).not.toContain(COMMIT)
})

test("a run that uploads nothing says so before it begins", () => {
  expect(linesFor("atlas", "some/page.md", true, COMMIT)[2]).toBe(NO_UPLOAD_SAID)
})

test("a run that uploads says a tester is sent the build, since none can decline it", () => {
  expect(linesFor("atlas", "some/page.md", false, COMMIT)[2]).toBe(UPLOAD_SAID)
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
