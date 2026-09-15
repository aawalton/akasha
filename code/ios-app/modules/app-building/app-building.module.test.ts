import { afterAll, expect, test } from "bun:test"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { planFor } from "akasha/code/ios-app/modules/app-building/app-building.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const root = rootOf(import.meta.dir)

const QUIET_ID = "01a05fd3-71b8-7c04-8a6e-3f19d4470b55"

const QUIET_AT = "akasha/quiet.ios-app.ts"

const QUIET_BODY =
  `export const quiet = { id: "${QUIET_ID}", pageTypeSlug: "ios-app", slug: "quiet",` +
  ` definition: "an app naming no build script", bundleId: "me.quiet.app" }\n`

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

test("both apps are built by the one script sitting above them", () => {
  expect(planned("smilingjenny").buildScriptPath).toBe(planned("alanwalton").buildScriptPath)
})

test("the build script is the shell file beside the page the app names", () => {
  expect(planned("alanwalton").buildScriptPath).toEndWith("build-sim.shell-script.shell.sh")
})

test("the only directory delivered whole is the app's own package", () => {
  const held = planned("alanwalton")
  expect(held.deliverPaths).toEqual([held.shellPath])
})

test("each app is delivered from a directory of its own", () => {
  expect(planned("alanwalton").shellPath).not.toBe(planned("smilingjenny").shellPath)
})

test("the script both apps run sits outside the directory either app is delivered from", () => {
  const script = planned("alanwalton").buildScriptPath
  expect(script.startsWith(`${planned("alanwalton").shellPath}/`)).toBe(false)
  expect(script.startsWith(`${planned("smilingjenny").shellPath}/`)).toBe(false)
})

test("the shell, the Swift and the plists the mac reads are each delivered", () => {
  const said = planned("alanwalton").deliverFiles.join("\n")
  expect(said).toContain("widget-components.shell-script.shell.sh")
  expect(said).toContain("ring.ios-component.swift.swift")
  expect(said).toContain("alanwalton-widget.ios-program.info-plist.plist")
  expect(said).toContain("alanwalton-widget.ios-program.entitlements.entitlements")
  expect(said).toContain("alanwalton-decode-harness")
})

test("a shell script no app build shares reaches no mac", () => {
  const said = planned("alanwalton").deliverFiles.join("\n")
  expect(said).not.toContain("statusline.shell-script.shell.sh")
})

test("no page's own file is delivered, because the mac reads no TypeScript", () => {
  for (const one of planned("alanwalton").deliverFiles) expect(one.endsWith(".ts")).toBe(false)
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
  expect(said).toContain("ring.ios-component.swift.swift")
  expect(said).toContain("tier.ios-component.swift.swift")
})
