import { expect, test } from "bun:test"
import {
  bodyOf,
  refusalOf,
  worldOf,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  removeTypeMember,
  runChange,
} from "./remove-type-member.change-mechanical-file-content.code.ts"

const AT = "held/one.page-type.ts"

const MANIFEST_FROM = `import type { Manifest } from "./properties/manifest.file-property.ts"`

const WEB_FROM = `import type { WebDirectory } from "./properties/web-directory.build-folder-property.ts"`

const HOLDING = `${MANIFEST_FROM}
${WEB_FROM}

export type IosApp = WorkspacePackage & {
  manifest: Manifest
  webDirectory: WebDirectory
}

export const iosApp = {
  slug: "ios-app",
} as const satisfies PageType
`

function answering(held: string, given: Partial<Parameters<typeof removeTypeMember>[1]> = {}) {
  const world = worldOf({ [AT]: held })
  return {
    world,
    said: removeTypeMember(world, { at: AT, type: "IosApp", key: "webDirectory", ...given }),
  }
}

test("a member goes with the line that member sits on", () => {
  const { world, said } = answering(HOLDING)
  const left = bodyOf(said, world.base)
  expect(left).not.toContain("webDirectory")
  expect(left).toContain("  manifest: Manifest\n}")
})

test("the type the member named loses its import in the same answer", () => {
  const { world, said } = answering(HOLDING)
  expect(bodyOf(said, world.base)).not.toContain("WebDirectory")
})

test("a type the body names somewhere else keeps its import", () => {
  const held = `${MANIFEST_FROM}
${WEB_FROM}

export type IosApp = {
  webDirectory: WebDirectory
  otherDirectory: WebDirectory
}
`
  const { world, said } = answering(held)
  const left = bodyOf(said, world.base)
  expect(left).toContain(WEB_FROM)
  expect(left).toContain("otherDirectory: WebDirectory")
})

test("an import naming other types loses that one name rather than the whole line", () => {
  const held = `import type { Manifest, WebDirectory } from "./properties/held.ts"

export type IosApp = {
  manifest: Manifest
  webDirectory: WebDirectory
}
`
  const { world, said } = answering(held)
  const left = bodyOf(said, world.base)
  expect(left).toContain("import type { Manifest }")
  expect(left).not.toContain("WebDirectory")
})

test("a member the type carries none of is refused rather than passed over", () => {
  const { said } = answering(HOLDING, { key: "missing" })
  expect(refusalOf(said)).toContain("carries no `missing`")
})

test("an alias built from an intersection is read for the object type inside it", () => {
  const { world, said } = answering(HOLDING)
  expect(bodyOf(said, world.base)).toContain("WorkspacePackage & {")
})

test("a body carrying no such alias is refused", () => {
  const { said } = answering(HOLDING, { type: "Missing" })
  expect(refusalOf(said)).toContain("no object type named")
})

test("a type written on one line loses its member on that line", () => {
  const held = `${MANIFEST_FROM}
${WEB_FROM}

export type IosApp = { manifest: Manifest; webDirectory: WebDirectory }
`
  const { world, said } = answering(held)
  expect(bodyOf(said, world.base)).toContain("export type IosApp = { manifest: Manifest; }")
})

test("a type keeps its braces when the last member goes", () => {
  const held = `${WEB_FROM}

export type IosApp = {
  webDirectory: WebDirectory
}
`
  const { world, said } = answering(held)
  expect(bodyOf(said, world.base)).toContain("export type IosApp = {}")
})

test("a body holding nothing at that path is refused", () => {
  const said = removeTypeMember(worldOf({}), { at: AT, type: "IosApp", key: "webDirectory" })
  expect(refusalOf(said)).toContain("could not be read")
})

test("the change is reached through its own runner", () => {
  const world = worldOf({ [AT]: HOLDING })
  const said = runChange(world, { at: AT, type: "IosApp", key: "webDirectory" })
  expect(bodyOf(said, world.base)).not.toContain("webDirectory")
})
