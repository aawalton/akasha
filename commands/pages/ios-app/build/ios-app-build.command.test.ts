import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { listedFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { DATA, INPUT } from "../../../modules/cli/cli.module.code.ts"
import { scratchWorld } from "../../../modules/scratching/scratching.module.code.ts"
import { iosAppBuild, readIn } from "./ios-app-build.command.code.ts"

const root = join(import.meta.dir, "..", "..", "..")

const QUIET_ID = "01a05fd2-4c1e-7a3e-9b70-2c6a5d81f4e2"

const QUIET_AT = "akasha/quiet.ios-app.ts"

const QUIET_BODY =
  `export const quiet = { id: "${QUIET_ID}", pageTypeSlug: "ios-app", slug: "quiet",` +
  ` definition: "an app naming no build script", bundleId: "me.quiet.app" }\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function given(at: string): Given {
  return { root: at, calledAs: "akasha ios-app build", from: at, writer: null, agentId: null }
}

function namingNoBuildScript(): string {
  const at = scratch.rootFor("akasha-ios-app-")
  put(at, QUIET_AT, QUIET_BODY)
  listedFiled(at, "ios-app", "quiet", [{ path: QUIET_AT, id: QUIET_ID }])
  return at
}

test("naming no app is refused rather than defaulted", () => {
  const held = readIn([])

  expect("refused" in held ? held.refused : "").toContain("names an app")
})

test("one call names one app", () => {
  const held = readIn(["alanwalton", "smilingjenny"])

  expect("refused" in held ? held.refused : "").toContain("one call names one app")
})

test("the app is the word said in place", () => {
  expect(readIn(["alanwalton"])).toEqual({ app: "alanwalton", www: null })
})

test("a site is named by a flag rather than by its place among the words", () => {
  expect(readIn(["alanwalton", "--www", "/elsewhere/site"])).toEqual({
    app: "alanwalton",
    www: "/elsewhere/site",
  })
})

test("a flag naming no directory is refused rather than taken as the app", () => {
  const held = readIn(["alanwalton", "--www"])

  expect("refused" in held ? held.refused : "").toContain("names a directory")
})

test("a flag this does not take is refused rather than ignored", () => {
  const held = readIn(["alanwalton", "--release"])

  expect("refused" in held ? held.refused : "").toContain("--release")
})

test("an app no page is slugged for refuses at the data rather than the caller", () => {
  const answer = iosAppBuild(["nosuchapp"], given(root))

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("nosuchapp")
})

test("an app naming no build script refuses before reaching a machine", () => {
  const answer = iosAppBuild(["quiet"], given(namingNoBuildScript()))

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("build-script")
  expect(answer.report).toEqual([])
})

test("a caller saying nothing is refused as the caller's fault", () => {
  expect(iosAppBuild([], given(root)).code).toBe(INPUT)
})
