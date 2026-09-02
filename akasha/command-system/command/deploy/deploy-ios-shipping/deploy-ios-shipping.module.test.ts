import { expect, test } from "bun:test"
import {
  CONFIGURATION,
  changedPaths,
  linesFor,
  linesOf,
  NO_UPLOAD_SAID,
  SHOWN_PATHS,
  saidOfChanged,
  UPLOAD_SAID,
  WHERE_HEAD_IS,
} from "./deploy-ios-shipping.module.code.ts"

test("the report names the app and the page it was read from", () => {
  const lines = linesFor("atlas", "akasha:pages/ios-app/atlas-ios.ios-app.md", true, WHERE_HEAD_IS)
  expect(lines[0]).toBe("ios-app\tatlas\takasha:pages/ios-app/atlas-ios.ios-app.md")
})

test("the report names the configuration and the commit the build is made at", () => {
  const lines = linesFor("atlas", "some/page.md", true, WHERE_HEAD_IS)
  expect(lines[1]).toBe(`build\t${CONFIGURATION}\tat ${WHERE_HEAD_IS}`)
})

test("a build asked for another commit reports that commit rather than a fixed one", () => {
  const lines = linesFor("atlas", "some/page.md", true, "4f2a91c")
  expect(lines[1]).toBe(`build\t${CONFIGURATION}\tat 4f2a91c`)
  expect(lines[1]).not.toContain(WHERE_HEAD_IS)
})

test("a run that uploads nothing says so before it begins", () => {
  expect(linesFor("atlas", "some/page.md", true, WHERE_HEAD_IS)[2]).toBe(NO_UPLOAD_SAID)
})

test("a run that uploads says a tester is sent the build, since none can decline it", () => {
  expect(linesFor("atlas", "some/page.md", false, WHERE_HEAD_IS)[2]).toBe(UPLOAD_SAID)
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

test("a tree git reports clean holds no changed path", () => {
  expect(changedPaths("")).toEqual([])
  expect(changedPaths("\n")).toEqual([])
})

test("every porcelain line is read as the path it names, whatever its two status letters", () => {
  expect(changedPaths(" M one/a.ts\nMM two/b.ts\nD  three/c.ts\n")).toEqual([
    "one/a.ts",
    "two/b.ts",
    "three/c.ts",
  ])
})

test("the refusal names how many files differ and the call that builds anyway", () => {
  const refusal = saidOfChanged("alanwalton", ["one/a.ts"])
  expect(refusal).toContain("1 tracked file")
  expect(refusal).toContain("one/a.ts")
  expect(refusal).toContain(`akasha deploy alanwalton --ref ${WHERE_HEAD_IS}`)
})

test("a refusal over many files names some of them and counts the rest", () => {
  const paths = ["a.ts", "b.ts", "c.ts", "d.ts", "e.ts"]
  const refusal = saidOfChanged("alanwalton", paths)
  expect(refusal).toContain(`${paths.length} tracked files`)
  expect(refusal).toContain("a.ts, b.ts, c.ts")
  expect(refusal).toContain(`and ${paths.length - SHOWN_PATHS} more`)
  expect(refusal).not.toContain("e.ts")
})
