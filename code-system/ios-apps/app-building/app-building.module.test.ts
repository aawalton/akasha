import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { listedFiled } from "@akasha/indexes/testing"
import { put } from "@akasha/testing-system/putting"
import { planFor, SHARED_PATHS } from "./app-building.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..")

const QUIET_ID = "01a05fd3-71b8-7c04-8a6e-3f19d4470b55"

const QUIET_AT = "akasha/quiet.ios-app.ts"

const QUIET_BODY =
  `export const quiet = { id: "${QUIET_ID}", pageTypeSlug: "ios-app", slug: "quiet",` +
  ` definition: "an app naming no build script", bundleId: "me.quiet.app" }\n`

const HALF_ID = "01a05fd3-71b8-7c04-8a6e-3f19d4470b56"

const HALF_AT = "akasha/half.ios-app.ts"

const HALF_BODY =
  `export const half = { id: "${HALF_ID}", pageTypeSlug: "ios-app", slug: "half",` +
  ` definition: "an app saying where its site comes from and not what stages it",` +
  ` buildScript: "shell-script/build-sim", spaSourcePath: "alanwalton/web" }\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function planned(slug: string) {
  const held = planFor(root, slug)
  if ("refused" in held) throw new Error(held.refused.join("; "))
  return held
}

function namingNoBuildScript(): string {
  const at = scratch.rootFor("akasha-app-building-")
  put(at, QUIET_AT, QUIET_BODY)
  listedFiled(at, "ios-app", "quiet", [{ path: QUIET_AT, id: QUIET_ID }])
  return at
}

function namingHalfIsStaging(): string {
  const at = scratch.rootFor("akasha-app-building-half-")
  put(at, HALF_AT, HALF_BODY)
  listedFiled(at, "ios-app", "half", [{ path: HALF_AT, id: HALF_ID }])
  return at
}

test("an app no page is slugged for is refused by that name", () => {
  const held = planFor(root, "nosuchapp")
  expect("refused" in held).toBe(true)
  expect("refused" in held ? held.refused.join(" ") : "").toContain("nosuchapp")
})

test("an app naming no build script is refused rather than walked to", () => {
  const held = planFor(namingNoBuildScript(), "quiet")
  expect("refused" in held).toBe(true)
  expect("refused" in held ? held.refused.join(" ") : "").toContain("build-script")
})

test("an app naming one half of its staging and not the other is refused", () => {
  const held = planFor(namingHalfIsStaging(), "half")
  expect("refused" in held).toBe(true)
  expect("refused" in held ? held.refused.join(" ") : "").toContain("stage-script")
})

test("both apps are built by the one script standing above them", () => {
  expect(planned("smilingjenny").buildScriptPath).toBe(planned("alanwalton").buildScriptPath)
})

test("the build script is the shell file beside the page the app names", () => {
  expect(planned("alanwalton").buildScriptPath).toEndWith(
    "scripts/build-sim/build-sim.shell-script.shell.sh"
  )
})

test("what is delivered carries the app's package and every shared directory", () => {
  const held = planned("alanwalton")
  expect(held.shellPath).toBe("code-system/ios-apps/pages/alanwalton")
  expect(held.deliverPaths).toContain(held.shellPath)
  for (const one of SHARED_PATHS) expect(held.deliverPaths).toContain(one)
})

test("the team and the shipped program's name are read off the pages", () => {
  const said = planned("alanwalton").exports.join("\n")
  expect(said).toContain("export NATIVE_SHELL_DEVELOPMENT_TEAM='M6AN6NM6FL'")
  expect(said).toContain("export NATIVE_SHELL_WIDGET_BUNDLE_ID='com.alanwalton.app.widgets'")
})

test("the access group and the secret service are worked out rather than stated", () => {
  const said = planned("alanwalton").exports.join("\n")
  expect(said).toContain(
    "export NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP='M6AN6NM6FL.com.alanwalton.app'"
  )
  expect(said).toContain(
    "export NATIVE_SHELL_DEVICE_SECRET_SERVICE='com.alanwalton.app.device-secret'"
  )
})

test("what Xcode builds the shipped program under is read off its page", () => {
  const said = planned("alanwalton").exports.join("\n")
  expect(said).toContain("export NATIVE_SHELL_WIDGET_NAME='ValuesWidgetExtension'")
})

test("an app whose site is a page of its own is planned like any other", () => {
  const held = planned("smilingjenny").exports.join("\n")
  expect(held).toContain("export NATIVE_SHELL_WIDGET_NAME='SmilingJennyWidgetExtension'")
  expect(held).toContain("export NATIVE_SHELL_BUNDLE_ID='me.smilingjenny.app'")
})

test("every component the shipped program names is handed to the seam", () => {
  const said = planned("alanwalton").exports.join("\n")
  expect(said).toContain("ring/ring.ios-component.swift.swift")
  expect(said).toContain("tier/tier.ios-component.swift.swift")
})

test("what stages an app's site and where that site is built from are read off its page", () => {
  const held = planned("alanwalton").staging
  expect(held?.sourcePath).toBe("alan/web-capacitor")
  expect(held?.scriptPath).toEndWith("stage-app/alanwalton-stage-app.shell-script.shell.sh")
})

test("an app whose site is a page of its own stages nothing", () => {
  expect(planned("smilingjenny").staging).toBe(null)
})
