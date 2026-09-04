import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { listedFiled } from "@akasha/indexes/testing"
import { put } from "@akasha/testing-system/putting"
import type { Given } from "../../calling/calling.module.code.ts"
import { DATA, INPUT } from "../../cli/cli.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { iosApp, readIn } from "./ios-app.command.code.ts"
import { iosApp as page } from "./ios-app.command.ts"

const root = join(import.meta.dir, "..", "..", "..")

const QUIET_ID = "01a05fd2-4c1e-7a3e-9b70-2c6a5d81f4e2"

const QUIET_AT = "akasha/quiet.ios-app.ts"

const QUIET_BODY =
  `export const quiet = { id: "${QUIET_ID}", pageTypeSlug: "ios-app", slug: "quiet",` +
  ` definition: "an app naming no build script", bundleId: "me.quiet.app" }\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function given(at: string): Given {
  return { root: at, calledAs: "akasha ios-app", from: at, writer: null, agentId: null }
}

function namingNoBuildScript(): string {
  const at = scratch.rootFor("akasha-ios-app-")
  put(at, QUIET_AT, QUIET_BODY)
  listedFiled(at, "ios-app", "quiet", [{ path: QUIET_AT, id: QUIET_ID }])
  return at
}

test("an act nobody named is refused with the acts there are", () => {
  const held = readIn([])
  expect("refused" in held ? held.refused : "").toContain("build")
})

test("an act this does not carry is refused rather than tried", () => {
  const held = readIn(["deploy", "alanwalton"])
  expect("refused" in held ? held.refused : "").toContain("deploy")
})

test("an act naming no app is refused rather than defaulted", () => {
  const held = readIn(["build"])
  expect("refused" in held ? held.refused : "").toContain("names an app")
})

test("one call names one app", () => {
  const held = readIn(["build", "alanwalton", "smilingjenny"])
  expect("refused" in held ? held.refused : "").toContain("one call names one app")
})

test("an app and an act stand as the first word and the second", () => {
  expect(readIn(["build", "alanwalton"])).toEqual({ act: "build", app: "alanwalton", www: null })
})

test("a site is named by a flag rather than by its place among the words", () => {
  expect(readIn(["build", "alanwalton", "--www", "/var/tmp/site"])).toEqual({
    act: "build",
    app: "alanwalton",
    www: "/var/tmp/site",
  })
})

test("a flag naming no directory is refused rather than taken as the app", () => {
  const held = readIn(["build", "alanwalton", "--www"])
  expect("refused" in held ? held.refused : "").toContain("names a directory")
})

test("a flag this does not take is refused rather than ignored", () => {
  const held = readIn(["build", "alanwalton", "--release"])
  expect("refused" in held ? held.refused : "").toContain("--release")
})

test("an app no page is slugged for refuses at the data rather than the caller", () => {
  const answer = iosApp(["build", "nosuchapp"], given(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("nosuchapp")
})

test("an app naming no build script refuses before reaching a machine", () => {
  const answer = iosApp(["build", "quiet"], given(namingNoBuildScript()))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("build-script")
  expect(answer.report).toEqual([])
})

test("a caller saying nothing is refused as the caller's fault", () => {
  expect(iosApp([], given(root)).code).toBe(INPUT)
})

test("every act the page shows is one this takes", () => {
  for (const one of page.taking) {
    const first = one.said.split(" ")[0] ?? ""
    if (first.startsWith("<") || first.startsWith("-")) continue
    const held = readIn([first])
    expect("refused" in held ? held.refused : "").not.toContain("is no act this carries")
  }
})
