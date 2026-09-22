import { afterAll, expect, test } from "bun:test"
import { renameCodeToken } from "akasha/change/agent/file-content/rename-code-token/rename-code-token.change-agent.code.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { renameLocalVariable } from "akasha/change/mechanical/file-content/rename/rename-local-variable/rename-local-variable.change-mechanical-file-content.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import {
  bodyOf,
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const LOCAL = "akasha/one/local.module.code.ts"

const PAGE = "akasha/one/local.module.ts"

const BODY = `export function held(): number {
  const kept = 1
  return kept + 1
}
`

const PAGE_BODY = `export const local = 1\n`

const PAGE_TYPE_BODY = `export type Kept = boolean

export const local = 1
`

const TYPES = "akasha/one/local.module.types.ts"

const TYPES_BODY = `export type Kept = { readonly one: number }\n`

const STRAY = "held.ts"

const FILE_TYPE_BODY = `type Kept = { readonly one: number }

export const held: Kept = { one: 1 }
`

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, running)
}

function heldIn(root: string, at: string, body: string): World {
  return worldIn(root, (path) => (path === at ? body : null))
}

test("a path that is no TypeScript body is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), () => null)
  const said = await renameCodeToken(world, { at: "a.md", of: "one", to: "two" })
  expect(said.refused).toBe("`a.md` names no TypeScript body")
})

test("a body that could not be read is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), () => null)
  const said = await renameCodeToken(world, { at: LOCAL, of: "one", to: "two" })
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` could not be read")
})

test("a page's own export is refused, since a page's export is its slug", async () => {
  const world = heldIn(scratch.rootFor("token-"), PAGE, PAGE_BODY)
  const said = await renameCodeToken(world, { at: PAGE, of: "local", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${PAGE}\` is a page, and a page's export is its slug`)
})

test("a type a page's file declares is read rather than refused as a page", async () => {
  const world = heldIn(scratch.rootFor("token-"), PAGE, PAGE_TYPE_BODY)
  const said = await renameCodeToken(world, { at: PAGE, of: "Kept", to: "Carried" })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(PAGE)).toBe(PAGE_TYPE_BODY.replace("Kept", "Carried"))
})

test("a path beside no page is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), STRAY, PAGE_BODY)
  const said = await renameCodeToken(world, { at: STRAY, of: "held", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${STRAY}\` sits beside no page`)
})

test("a file beside a page holding types is read rather than refused as a page", async () => {
  const world = heldIn(scratch.rootFor("token-"), TYPES, TYPES_BODY)
  const said = await renameCodeToken(world, { at: TYPES, of: "Kept", to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(TYPES)).toBe(TYPES_BODY.replace("Kept", CARRIED))
})

test("a name no body could carry is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "held", to: "2two" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`2two` is no name a body carries")
})

test("the name it already carries is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "held", to: "held" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`held` is the name it already carries")
})

test("an index naming no importer renames the export over that body alone", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "held", to: CARRIED })
  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))]).toEqual([LOCAL])
  expect(bodiesIn(said, world.base).get(LOCAL)).toBe(BODY.replace("held", CARRIED))
})

test("an exported name is renamed through every importer", async () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))].sort()).toEqual([HELD_CODE, NAMER_CODE])
  expect(bodiesIn(said, world.base).get(HELD_CODE)).toBe(`export const ${CARRIED} = 1\n`)
})

test("a rename refuses where a file it would change already reaches the new name", async () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: "named" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_CODE}\` already reaches a \`named\``)
})

test("the bodies are answered rather than written", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await renameCodeToken(worldIn(root, text), {
    at: HELD_CODE,
    of: HELD_EXPORT,
    to: CARRIED,
  })
  expect(said.refused).toBe(null)
  expect(text(HELD_CODE)).toBe(`export const ${HELD_EXPORT} = 1\n`)
  expect(text(NAMER_CODE)).toContain(`import { ${HELD_EXPORT} }`)
})

test("a name no export carries is renamed over its own file", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(LOCAL)).toBe(BODY.replaceAll("kept", CARRIED))
  expect(said.edits[0]?.kind).toBe("replace")
})

test("a top-level type alias no export carries is spelled anew over its own file", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, FILE_TYPE_BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "Kept", to: "Carried" })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(LOCAL)).toBe(FILE_TYPE_BODY.replaceAll("Kept", "Carried"))
})

test("a name the file declares nowhere is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "missing", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` declares no `missing`")
})

test("a local name is handed to the change reached at the local address", async () => {
  const reached: string[] = []
  const world = worldAt(
    scratch.rootFor("token-"),
    (path) => (path === LOCAL ? BODY : null),
    (_world, at) => {
      reached.push(at)
      return Promise.resolve({ edits: [], refused: null })
    }
  )

  await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })

  expect(reached).toEqual([`${changeMechanicalFileContent.slug}/${renameLocalVariable.slug}`])
})

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const DECLARING_TYPE = "akasha/type-declaration.page-type.ts"

const AMBIENT_PROPERTY = "akasha/ambient-types.file-property.ts"

const KEPT_PAGE = "akasha/ambient/kept.type-declaration.ts"

const KEPT_DECLARATION = "akasha/ambient/kept.type-declaration.d.ts"

const REACHED_PAGE = "akasha/ambient/reached.type-declaration.ts"

const REACHED_DECLARATION = "akasha/ambient/reached.type-declaration.d.ts"

const ONE_CODE = "akasha/reader-one/reader-one.module.code.ts"

const TWO_CODE = "akasha/reader-two/reader-two.module.code.ts"

const GLOBE_CODE = "akasha/reader-globe/reader-globe.module.code.ts"

const AMBIENT_KEPT = "TemperKept"

const AMBIENT_REACHED = "TemperReached"

const KEPT_AT = "../ambient/kept.type-declaration.d.ts"

const REACHED_AT = "../ambient/reached.type-declaration.d.ts"

function readerBody(at: string, named: string, reached: string): string {
  return `import "${at}"\n\nexport const ${named} = ${reached} + 1\n`
}

function declaringRepo(): string {
  return indexedRepo({
    [DECLARING_TYPE]: bodyOf({
      id: "01a04a4a-0007-7000-8000-000000000001",
      pageTypeSlug: "page-type",
      slug: "type-declaration",
      extends: [DOMAIN_AT],
      properties: [{ pagePropertySlug: "ambient-types", required: true, many: false }],
    }),
    [AMBIENT_PROPERTY]: bodyOf({
      id: "01a04a4a-0007-7000-8000-000000000002",
      pageTypeSlug: "file-property",
      slug: "ambient-types",
      propertySlug: "d",
    }),
    [KEPT_PAGE]: pageOf({
      id: "01a04a4a-0007-7000-8000-000000000003",
      pageTypeSlug: "type-declaration",
      slug: "kept",
      d: "ts",
    }),
    [KEPT_DECLARATION]: `declare const ${AMBIENT_KEPT}: number\n`,
    [REACHED_PAGE]: pageOf({
      id: "01a04a4a-0007-7000-8000-000000000004",
      pageTypeSlug: "type-declaration",
      slug: "reached",
      d: "ts",
    }),
    [REACHED_DECLARATION]: `export {}\n\ndeclare global {\n  const ${AMBIENT_REACHED}: number\n}\n`,
    "akasha/reader-one/reader-one.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000005",
      pageTypeSlug: "module",
      slug: "reader-one",
      code: "ts",
    }),
    [ONE_CODE]: readerBody(KEPT_AT, "one", AMBIENT_KEPT),
    "akasha/reader-two/reader-two.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000006",
      pageTypeSlug: "module",
      slug: "reader-two",
      code: "ts",
    }),
    [TWO_CODE]: readerBody(KEPT_AT, "two", AMBIENT_KEPT),
    "akasha/reader-globe/reader-globe.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000007",
      pageTypeSlug: "module",
      slug: "reader-globe",
      code: "ts",
    }),
    [GLOBE_CODE]: readerBody(REACHED_AT, "globe", AMBIENT_REACHED),
  })
}

test("a name a declaration file declares is renamed there and in every body importing it", async () => {
  const root = declaringRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, {
    at: KEPT_DECLARATION,
    of: AMBIENT_KEPT,
    to: "TemperCarried",
  })
  const bodies = bodiesIn(said, world.base)

  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))].sort()).toEqual([KEPT_DECLARATION, ONE_CODE, TWO_CODE])
  expect(bodies.get(KEPT_DECLARATION)).toBe("declare const TemperCarried: number\n")
  expect(bodies.get(ONE_CODE) ?? "").toContain("TemperCarried + 1")
  expect(bodies.get(TWO_CODE) ?? "").toContain("TemperCarried + 1")
})

test("a name declared inside a global block is renamed there and where it is reached", async () => {
  const root = declaringRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, {
    at: REACHED_DECLARATION,
    of: AMBIENT_REACHED,
    to: "TemperGained",
  })
  const bodies = bodiesIn(said, world.base)

  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))].sort()).toEqual([REACHED_DECLARATION, GLOBE_CODE])
  expect(bodies.get(REACHED_DECLARATION) ?? "").toContain("const TemperGained: number")
  expect(bodies.get(GLOBE_CODE) ?? "").toContain("TemperGained + 1")
})

test("a declaration file declaring no such name is refused", async () => {
  const root = declaringRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, {
    at: KEPT_DECLARATION,
    of: "TemperMissing",
    to: "TemperCarried",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${KEPT_DECLARATION}\` declares no \`TemperMissing\``)
})
