import { expect, test } from "bun:test"
import { join } from "node:path"
import { planFor, SHARED_PATHS } from "./app-building.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..", "..")

function planned(slug: string) {
  const held = planFor(root, slug)
  if ("refused" in held) throw new Error(held.refused.join("; "))
  return held
}

test("an app no page is slugged for is refused by that name", () => {
  const held = planFor(root, "nosuchapp")
  expect("refused" in held).toBe(true)
  expect("refused" in held ? held.refused.join(" ") : "").toContain("nosuchapp")
})

test("an app naming no build script is refused rather than walked to", () => {
  const held = planFor(root, "smilingjenny")
  expect("refused" in held).toBe(true)
  expect("refused" in held ? held.refused.join(" ") : "").toContain("build-script")
})

test("the build script is the shell file beside the page the app names", () => {
  expect(planned("alanwalton").buildScriptPath).toEndWith(
    "alanwalton-build-sim/alanwalton-build-sim.shell-script.shell.sh"
  )
})

test("what is delivered carries the app's package and every shared directory", () => {
  const held = planned("alanwalton")
  expect(held.shellPath).toBe("akasha/code-system/ios-app/ios-apps/alanwalton")
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

test("every component the shipped program names is handed to the seam", () => {
  const said = planned("alanwalton").exports.join("\n")
  expect(said).toContain("ring/ring.ios-component.swift.swift")
  expect(said).toContain("tier/tier.ios-component.swift.swift")
})
