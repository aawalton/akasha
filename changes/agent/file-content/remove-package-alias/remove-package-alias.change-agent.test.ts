import { afterAll, expect, test } from "bun:test"
import { bodyOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import ts from "typescript"
import { bodiesIn, type World, worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import {
  aliasedTo,
  aliasGoingIn,
  removePackageAlias,
  runChange,
} from "./remove-package-alias.change-agent.code.ts"

afterAll(scratch.sweep)

const WAS = "@probe/was"

const HELD = "@probe/held"

const HELD_MANIFEST = "akasha/held/package.json"

const ROOT_MANIFEST = "akasha/root/package.json"

const SIDE_MANIFEST = "akasha/side/package.json"

const READER_CODE = "akasha/side/reader.module.code.ts"

const idAt = (one: string): string => `01a07c16-0003-7000-8000-00000000000${one}`

const HELD_BODY = `{
  "name": "${HELD}",
  "exports": {
    ".": "./one.ts"
  }
}
`

const ROOT_BODY = `{
  "name": "@probe/root",
  "dependencies": {
    "${WAS}": "workspace:${HELD}@*",
    "typescript": "npm:typescript@5.9.3"
  }
}
`

const ROOT_WANTED = `{
  "name": "@probe/root",
  "dependencies": {
    "typescript": "npm:typescript@5.9.3"
  }
}
`

const SIDE_BODY = `{
  "name": "@probe/side",
  "dependencies": {
    "typescript": "npm:typescript@5.9.3",
    "${WAS}": "workspace:${HELD}@*"
  }
}
`

const SIDE_WANTED = `{
  "name": "@probe/side",
  "dependencies": {
    "typescript": "npm:typescript@5.9.3"
  }
}
`

const PLAIN_BODY = `{
  "name": "@probe/plain",
  "dependencies": {
    "${WAS}": "^1.2.3"
  }
}
`

const CLEAR_CODE = `export const spoken = "${WAS} is the name this package went by"

export const reader = spoken.length
`

const REACHING_CODE = `import { one } from "${WAS}"

export const reader = one
`

const SPEAKING: Readonly<Record<string, string>> = {
  "akasha/text-property.page-type.ts": bodyOf({
    id: idAt("0"),
    pageTypeSlug: "page-type",
    slug: "text-property",
    extendsSlug: ["page-type/page-property"],
  }),
  "akasha/file-name.text-property.ts": bodyOf({
    id: idAt("1"),
    pageTypeSlug: "text-property",
    slug: "file-name",
    propertySlug: "file-name",
  }),
  "akasha/file-property.page-type.ts": bodyOf({
    id: idAt("2"),
    pageTypeSlug: "page-type",
    slug: "file-property",
    extendsSlug: ["page-type/page-property"],
    properties: [{ pagePropertySlug: "text-property/file-name", required: false, many: false }],
  }),
  "akasha/manifest.file-property.ts": bodyOf({
    id: idAt("3"),
    pageTypeSlug: "file-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  }),
  "akasha/workspace-package.page-type.ts": bodyOf({
    id: idAt("4"),
    pageTypeSlug: "page-type",
    slug: "workspace-package",
    extendsSlug: ["page-type/domain"],
    properties: [{ pagePropertySlug: "file-property/manifest", required: true, many: false }],
  }),
}

const PACKAGED: Readonly<Record<string, string>> = {
  "akasha/held/held.workspace-package.ts": pageOf({
    id: idAt("5"),
    pageTypeSlug: "workspace-package",
    slug: "held",
    manifest: "json",
  }),
  [HELD_MANIFEST]: HELD_BODY,
  "akasha/held/one.ts": "export const one = 1\n",
  "akasha/root/root.workspace-package.ts": pageOf({
    id: idAt("6"),
    pageTypeSlug: "workspace-package",
    slug: "root",
    manifest: "json",
  }),
  [ROOT_MANIFEST]: ROOT_BODY,
  "akasha/side/side.workspace-package.ts": pageOf({
    id: idAt("7"),
    pageTypeSlug: "workspace-package",
    slug: "side",
    manifest: "json",
  }),
  [SIDE_MANIFEST]: SIDE_BODY,
  "akasha/side/reader.module.ts": pageOf({
    id: idAt("8"),
    pageTypeSlug: "module",
    slug: "reader",
    code: "ts",
  }),
}

function worldOver(code: string): World {
  const root = indexedRepo({ ...SPEAKING, ...PACKAGED, [READER_CODE]: code })
  return worldAt(root, textIn(root))
}

function dropped(): ReadonlyMap<string, string | null> {
  const world = worldOver(CLEAR_CODE)
  const said = removePackageAlias(world, { at: HELD_MANIFEST, was: WAS })
  expect(said.refused).toBe(null)
  return bodiesIn(said, world.base)
}

function heldIn(text: string): ts.ObjectLiteralExpression {
  const source = ts.parseJsonText(SIDE_MANIFEST, text)
  const first = source.statements[0]
  if (first === undefined || !ts.isObjectLiteralExpression(first.expression)) {
    throw new Error("the fixture reads as no JSON object")
  }
  for (const one of first.expression.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text === "dependencies" && ts.isObjectLiteralExpression(one.initializer)) {
      return one.initializer
    }
  }
  throw new Error("the fixture states no dependencies")
}

function withoutAliasIn(at: string, text: string, was: string, to: string): string {
  let body = text
  for (const one of [...aliasGoingIn(at, text, was, to)].sort(
    (here, there) => there.from - here.from
  )) {
    body = `${body.slice(0, one.from)}${one.put}${body.slice(one.to)}`
  }
  return body
}

test("an entry whose value aliases the name now carried is found", () => {
  expect(aliasedTo(heldIn(SIDE_BODY), WAS, HELD)).toBe(true)
})

test("an entry whose value is no alias is not found", () => {
  expect(aliasedTo(heldIn(PLAIN_BODY), WAS, HELD)).toBe(false)
})

test("an entry the manifest does not state is not found", () => {
  expect(aliasedTo(heldIn(ROOT_BODY), "@probe/absent", HELD)).toBe(false)
})

test("an alias parted from a later entry takes its comma with it", () => {
  expect(withoutAliasIn(ROOT_MANIFEST, ROOT_BODY, WAS, HELD)).toBe(ROOT_WANTED)
})

test("an alias stated last takes the comma before it", () => {
  expect(withoutAliasIn(SIDE_MANIFEST, SIDE_BODY, WAS, HELD)).toBe(SIDE_WANTED)
})

test("an entry under the old name whose value is no alias is left alone", () => {
  expect(withoutAliasIn(SIDE_MANIFEST, PLAIN_BODY, WAS, HELD)).toBe(PLAIN_BODY)
})

test("every manifest aliasing the old name is answered", () => {
  expect([...dropped().keys()].sort()).toEqual([ROOT_MANIFEST, SIDE_MANIFEST])
})

test("each manifest the alias goes out of is stated as a replace", () => {
  const said = removePackageAlias(worldOver(CLEAR_CODE), { at: HELD_MANIFEST, was: WAS })

  expect(said.edits.map((one) => one.kind)).toEqual(["replace", "replace"])
})

test("the alias goes and the entries left behind keep their spacing", () => {
  expect(dropped().get(ROOT_MANIFEST)).toBe(ROOT_WANTED)
  expect(dropped().get(SIDE_MANIFEST)).toBe(SIDE_WANTED)
})

test("a body still reaching the package under the old name is refused", () => {
  const said = removePackageAlias(worldOver(REACHING_CODE), { at: HELD_MANIFEST, was: WAS })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${READER_CODE}\` reaches this package as \`${WAS}\`, so no alias is dropped`
  )
})

test("a sentence holding the old name reaches nothing", () => {
  const said = removePackageAlias(worldOver(CLEAR_CODE), { at: HELD_MANIFEST, was: WAS })
  expect(said.refused).toBe(null)
})

test("an old name the package carries now is refused", () => {
  const said = removePackageAlias(worldOver(CLEAR_CODE), { at: HELD_MANIFEST, was: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD}\` is the name this package carries, so no alias is dropped`)
})

test("an old name no manifest aliases is refused", () => {
  const said = removePackageAlias(worldOver(CLEAR_CODE), {
    at: HELD_MANIFEST,
    was: "@probe/absent",
  })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no manifest aliases `@probe/absent`, so no alias is dropped")
})

test("a manifest that could not be read is refused", () => {
  const world = worldAt(scratch.rootFor("alias-"), () => null)
  const said = removePackageAlias(world, { at: HELD_MANIFEST, was: WAS })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_MANIFEST}\` could not be read`)
})

test("a call stating no old name is refused by that key", () => {
  const said = runChange(worldOver(CLEAR_CODE), { at: HELD_MANIFEST })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`was` names what this change is handed, and the arguments hold no `was`"
  )
})
