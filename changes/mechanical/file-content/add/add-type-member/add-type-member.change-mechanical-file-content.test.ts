import { expect, test } from "bun:test"
import {
  bodyOf,
  refusalOf,
  worldOf,
} from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addTypeMember, runChange } from "./add-type-member.change-mechanical-file-content.code.ts"

const AT = "held/one.page-type.ts"

const FROM = "./properties/web-directory.build-folder-property.ts"

const HOLDING = `import type { Manifest } from "./properties/manifest.file-property.ts"

export type IosApp = WorkspacePackage & {
  manifest: Manifest
}

export const iosApp = {
  slug: "ios-app",
} as const satisfies PageType
`

function answering(held: string, given: Partial<Parameters<typeof addTypeMember>[1]> = {}) {
  const world = worldOf({ [AT]: held })
  return {
    world,
    said: addTypeMember(world, {
      at: AT,
      type: "IosApp",
      key: "webDirectory",
      held: "WebDirectory",
      from: FROM,
      ...given,
    }),
  }
}

test("a member is put after the members the type already carries", () => {
  const { world, said } = answering(HOLDING)
  const left = bodyOf(said, world.base)
  expect(left.indexOf("webDirectory")).toBeGreaterThan(left.indexOf("manifest: Manifest"))
})

test("a member takes the indent the member above it carries", () => {
  const { world, said } = answering(HOLDING)
  expect(bodyOf(said, world.base)).toContain("  manifest: Manifest\n  webDirectory: WebDirectory\n")
})

test("the type a member names is imported in the same answer", () => {
  const { world, said } = answering(HOLDING)
  expect(bodyOf(said, world.base)).toContain(`import type { WebDirectory } from "${FROM}"`)
})

test("a name the body imports already is not imported a second time", () => {
  const { world, said } = answering(HOLDING, { held: "Manifest", key: "second" })
  const left = bodyOf(said, world.base)
  expect(left.split("import type { Manifest }")).toHaveLength(2)
})

test("a member is written optional where the change is told the member is optional", () => {
  const { world, said } = answering(HOLDING, { optional: true })
  expect(bodyOf(said, world.base)).toContain("webDirectory?: WebDirectory")
})

test("a member the type carries already is refused rather than carried twice", () => {
  const { said } = answering(HOLDING, { key: "manifest" })
  expect(refusalOf(said)).toContain("already")
})

test("an alias built from an intersection is read for the object type inside it", () => {
  const { world, said } = answering(HOLDING)
  expect(bodyOf(said, world.base)).toContain("WorkspacePackage & {")
})

test("a body carrying no such alias is refused", () => {
  const { said } = answering(HOLDING, { type: "Missing" })
  expect(refusalOf(said)).toContain("no object type named")
})

test("a body carrying no import gains the import at its opening", () => {
  const { world, said } = answering(`export type IosApp = {\n  manifest: string\n}\n`)
  expect(bodyOf(said, world.base).startsWith("import type { WebDirectory }")).toBe(true)
})

test("a type written on one line gains its member on that line", () => {
  const { world, said } = answering(`export type IosApp = { manifest: Manifest }\n`)
  expect(bodyOf(said, world.base)).toContain(
    "export type IosApp = { manifest: Manifest; webDirectory: WebDirectory }"
  )
})

test("a type written on one line closing a member gains no second semicolon", () => {
  const { world, said } = answering(`export type IosApp = { manifest: Manifest; }\n`)
  expect(bodyOf(said, world.base)).toContain("manifest: Manifest; webDirectory: WebDirectory }")
})

test("the change is reached through its own runner", () => {
  const world = worldOf({ [AT]: HOLDING })
  const said = runChange(world, {
    at: AT,
    type: "IosApp",
    key: "webDirectory",
    held: "WebDirectory",
    from: FROM,
  })
  expect(bodyOf(said, world.base)).toContain("webDirectory: WebDirectory")
})
