import { afterAll, expect, test } from "bun:test"
import { indexedRepo, NAMER_PAGE, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { runChange as addPropertyValue } from "../../../mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
  worldAt,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./add-property-values.change-agent.code.ts"

afterAll(scratch.sweep)

const ADD = "change-mechanical-file-content/add-property-value"

const PARTS = "partSlugs"

const CARRIER = "akasha/one/carrier.module.ts"

const ONE = "akasha/one/one.module.ts"

const TWO = "akasha/one/two.module.ts"

const OF_ONE = "module/one"

const OF_TWO = "module/two"

const OF_HELD = "module/held"

const GONE = "akasha/one/gone.module.ts"

const BESIDE: Readonly<Record<string, string>> = {
  [CARRIER]: pageOf({
    id: "01a08000-0000-7000-8000-000000000001",
    pageTypeSlug: "module",
    slug: "carrier",
    definition: "a page an indexed repository carries a list of parts on",
    code: "ts",
    partSlugs: [OF_HELD],
  }),
  "akasha/one/carrier.module.code.ts": "export const carrier = 1\n",
  [ONE]: pageOf({
    id: "01a08000-0000-7000-8000-000000000002",
    pageTypeSlug: "module",
    slug: "one",
    definition: "a page an indexed repository carries to be named",
    code: "ts",
  }),
  "akasha/one/one.module.code.ts": "export const one = 1\n",
  [TWO]: pageOf({
    id: "01a08000-0000-7000-8000-000000000003",
    pageTypeSlug: "module",
    slug: "two",
    definition: "a second page an indexed repository carries to be named",
    code: "ts",
  }),
  "akasha/one/two.module.code.ts": "export const two = 1\n",
}

type Asked = Parameters<typeof addPropertyValue>[1]

function repo(): string {
  return indexedRepo(BESIDE)
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), async (world, at, given) => {
    if (at === ADD) return addPropertyValue(world, given as Asked)
    return refusing(`\`${at}\` is reached by nothing here`)
  })
}

test("every line is put in one answer", async () => {
  const said = await runChange(worldIn(repo()), {
    added: `${CARRIER} ${PARTS} ${OF_ONE}\n${NAMER_PAGE} ${PARTS} ${OF_TWO}\n`,
  })

  expect(said.refused).toBeNull()
  expect([...pathsIn(said)].sort()).toEqual([CARRIER, NAMER_PAGE].sort())
})

test("a line is put in against the world the lines before it leave", async () => {
  const world = worldIn(repo())
  const said = await runChange(world, {
    added: `${CARRIER} ${PARTS} ${OF_ONE}\n${CARRIER} ${PARTS} ${OF_TWO}\n`,
  })
  const body = bodiesIn(said, world.base).get(CARRIER) ?? ""

  expect(said.refused).toBeNull()
  expect(body).toContain(`"${OF_ONE}"`)
  expect(body).toContain(`"${OF_TWO}"`)
  expect(body.split(PARTS)).toHaveLength(2)
})

test("a value naming no page is refused where the key names a relation", async () => {
  const line = `${CARRIER} ${PARTS} module/nobody`
  const said = await runChange(worldIn(repo()), { added: `${line}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("carries the slug `nobody`")
  expect(said.refused ?? "").toContain(line)
})

test("a path the world names no page at is refused and names the line", async () => {
  const said = await runChange(worldIn(repo()), {
    added: `${GONE} ${PARTS} ${OF_ONE}\n`,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page")
})

test("a line the change beneath refuses refuses the whole call and names that line", async () => {
  const line = `${CARRIER} ${PARTS} ${OF_HELD}`
  const said = await runChange(worldIn(repo()), {
    added: `${NAMER_PAGE} ${PARTS} ${OF_ONE}\n${line}\n`,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("already")
  expect(said.refused ?? "").toContain(line)
})

test("a line with nothing on it is read over", async () => {
  const said = await runChange(worldIn(repo()), {
    added: `\n${CARRIER} ${PARTS} ${OF_ONE}\n\n`,
  })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([CARRIER])
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldIn(repo()), {})

  expect(said.refused ?? "").toContain("`added`")
})

test("a body with no line is refused", async () => {
  const said = await runChange(worldIn(repo()), { added: "\n\n" })

  expect(said.refused ?? "").toContain("no line was handed in")
})

test("a line that is not a path, a key and a value parted by spaces is refused", async () => {
  const said = await runChange(worldIn(repo()), {
    added: `${CARRIER} ${PARTS}\n`,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("parted by spaces")
})

test("a value carrying a space is taken whole", async () => {
  let handed: unknown = null
  const root = repo()
  const world = worldAt(root, textIn(root), (_world, _at, given) => {
    handed = given
    return Promise.resolve(NOTHING_OVER)
  })

  await runChange(world, { added: `${CARRIER} definition a page of two words\n` })

  expect(handed).toMatchObject({ at: CARRIER, key: "definition", value: "a page of two words" })
})

test("each value is left to the change reached at its address", async () => {
  const reached: string[] = []
  const root = repo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve(NOTHING_OVER)
  })

  await runChange(world, {
    added: `${CARRIER} ${PARTS} ${OF_ONE}\n${NAMER_PAGE} ${PARTS} ${OF_TWO}\n`,
  })

  expect(reached).toEqual([ADD, ADD])
})
