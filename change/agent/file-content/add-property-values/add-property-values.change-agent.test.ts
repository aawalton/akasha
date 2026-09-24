import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/change/agent/file-content/add-property-values/add-property-values.change-agent.code.ts"
import {
  ADD,
  AIDS,
  ASKED,
  ASKED_LINE,
  CARRIER,
  FOUND,
  GONE,
  HELD_AT,
  handing,
  IN_RECORD,
  OF_HELD,
  OF_ONE,
  OF_TWO,
  ONE,
  PARTS,
  RECORD,
  recordWorld,
  repo,
  worldIn,
  worldSaying,
  worldTold,
} from "akasha/change/agent/file-content/add-property-values/add-property-values.change-agent.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  NAMER_PAGE,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const NONE = { slug: null, target: null, found: [] }

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
  const said = await runChange(worldIn(repo()), { added: `${GONE} ${PARTS} ${OF_ONE}\n` })

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

test("a bare name of a page already named by its address is refused as held already", async () => {
  const line = `${CARRIER} ${PARTS} held`
  const said = await runChange(worldIn(repo()), { added: `${line}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`holds \`${OF_HELD}\` already`)
  expect(said.refused ?? "").toContain(line)
})

test("a line with nothing on it is read over", async () => {
  const said = await runChange(worldIn(repo()), { added: `\n${CARRIER} ${PARTS} ${OF_ONE}\n\n` })

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
  const said = await runChange(worldIn(repo()), { added: `${CARRIER} ${PARTS}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("parted by spaces")
})

test("a value carrying a space is taken whole", async () => {
  const { handed } = await handing(worldIn(repo()), {
    added: `${CARRIER} test a page of two words\n`,
  })

  expect(handed[0]).toMatchObject({ at: CARRIER, key: "test", value: "a page of two words" })
})

test("the key the pages of its type write it after is handed on", async () => {
  const { handed } = await handing(worldIn(repo()), { added: `${CARRIER} note ${OF_ONE}\n` })

  expect(handed[0]).toMatchObject({ at: CARRIER, key: "note", value: OF_ONE, after: "code" })
})

test("a key falls before the keys the pages of its type write after it", async () => {
  const world = worldIn(repo())

  const said = await runChange(world, { added: `${CARRIER} note ${OF_ONE}\n` })
  const body = bodiesIn(said, world.base).get(CARRIER) ?? ""

  expect(said.refused).toBeNull()
  expect(body.indexOf("note:")).toBeLessThan(body.indexOf(`"${PARTS}"`))
})

test("`after` is left out where the pages of that type write the key nowhere", async () => {
  const { handed } = await handing(worldIn(repo()), { added: `${ONE} test ts\n` })

  expect("after" in (handed[0] as object)).toBe(false)
})

test("`after` stated for the call is handed on for every line", async () => {
  const { said, handed } = await handing(worldIn(repo()), {
    added: `${CARRIER} note ${OF_ONE}\n${ONE} note ${OF_TWO}\n`,
    after: "slug",
  })

  expect(said.refused).toBeNull()
  expect(handed).toEqual([
    { at: CARRIER, key: "note", value: OF_ONE, single: true, after: "slug" },
    { at: ONE, key: "note", value: OF_TWO, single: true, after: "slug" },
  ])
})

test("each value is left to the change reached at its address", async () => {
  const { reached } = await handing(worldIn(repo()), {
    added: `${CARRIER} ${PARTS} ${OF_ONE}\n${NAMER_PAGE} ${PARTS} ${OF_TWO}\n`,
  })

  expect(reached).toEqual([ADD, ADD])
})

test("a property holding a boolean is handed on as holding a boolean", async () => {
  const world = worldSaying([{ key: "worked", many: false, pageTypeSlug: "boolean-property" }])

  const { said, handed } = await handing(world, { added: `${ONE} worked true\n` })

  expect(said.refused).toBeNull()
  expect(handed[0]).toMatchObject({ at: ONE, key: "worked", value: "true", holds: "boolean" })
})

test("a key the page's type declares no property for is refused and names the line", async () => {
  const line = `${ONE} aids one`

  const said = await runChange(worldSaying([{ key: "code", many: false }]), { added: `${line}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(
    "`aids` is no property `module` declares, so nothing is put in. " +
      "A list field inside a record is reached with `where`, `is` and `field` under the record's key."
  )
  expect(said.refused ?? "").toContain(line)
})

test("a slug the page's type declares a key for is refused by naming that key", async () => {
  const line = `${ONE} transcript-path /one.jsonl`
  const world = worldSaying([{ key: "transcriptPath", many: false }])

  const said = await runChange(world, { added: `${line}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(
    "`transcript-path` is a slug, and `module` declares that property under the key " +
      "`transcriptPath`, so nothing is put in. Name the key."
  )
  expect(said.refused ?? "").toContain(line)
})

test("a slug the page's type declares no key for is refused as no property", async () => {
  const world = worldSaying([{ key: "transcriptPath", many: false }])

  const said = await runChange(world, { added: `${ONE} no-such-thing one\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`no-such-thing` is no property `module` declares")
})

test("a bare name is handed on as the address of the page it reaches", async () => {
  const world = worldTold({ slug: "part-slugs", target: "command", found: FOUND })

  const { handed } = await handing(world, { added: `${HELD_AT} ${PARTS} two\n` })

  expect(handed).toEqual([ASKED])
})

test("an address is handed on as it was handed in", async () => {
  const world = worldTold({ slug: "part-slugs", target: "command", found: FOUND })

  const { handed } = await handing(world, { added: ASKED_LINE })

  expect(handed).toEqual([ASKED])
})

test("a key naming no relation is handed on with no page reached", async () => {
  const { handed, reached } = await handing(worldTold(NONE), { added: ASKED_LINE })

  expect(reached).toEqual([ADD])
  expect(handed).toEqual([ASKED])
})

test("`after` stated for the call is handed on as stated", async () => {
  const { handed } = await handing(worldTold(NONE), { added: ASKED_LINE, after: "slug" })

  expect(handed).toEqual([{ ...ASKED, after: "slug" }])
})

test("`after` is left out where the call states no `after`", async () => {
  const { handed } = await handing(worldTold(NONE), { added: ASKED_LINE })

  expect("after" in (handed[0] as object)).toBe(false)
})

test("a key the page type declares as carrying one value is handed on as single", async () => {
  const world = worldTold({ ...NONE, carried: [{ key: "manifest", many: false }] })

  const { handed } = await handing(world, { added: `${HELD_AT} manifest json\n` })

  expect(handed).toEqual([{ at: HELD_AT, key: "manifest", value: "json", single: true }])
})

test("a key the page's type holds text under is handed on saying nothing of what it holds", async () => {
  const carried = [{ key: "manifest", many: false, pageTypeSlug: "file-property" }]

  const { handed } = await handing(worldTold({ ...NONE, carried }), {
    added: `${HELD_AT} manifest json\n`,
  })

  expect(handed).toEqual([{ at: HELD_AT, key: "manifest", value: "json", single: true }])
})

test("a page whose type cannot be read has no key refused", async () => {
  const world = worldTold({ ...NONE, carried: null })

  const { reached } = await handing(world, { added: `${HELD_AT} aids one\n` })

  expect(reached).toEqual([ADD])
})

test("a value for a record's list field is handed on naming the record and the field", async () => {
  const world = recordWorld({ ...NONE, slug: "directives" }, [AIDS])

  const { said, handed } = await handing(world, {
    ...RECORD,
    added: `${HELD_AT} directives third\n`,
  })

  expect(said.refused).toBeNull()
  expect(handed).toEqual([{ ...IN_RECORD, value: "third" }])
})

test("a bare name under a record's relation field is handed on as an address", async () => {
  const world = recordWorld({ slug: "directives", target: "command", found: FOUND }, [AIDS])

  const { handed } = await handing(world, { ...RECORD, added: `${HELD_AT} directives two\n` })

  expect(handed).toEqual([{ ...IN_RECORD, value: "command/two" }])
})

test("a field the record property declares as no list is refused", async () => {
  const one = { ...AIDS, key: "name", many: false }
  const world = recordWorld({ ...NONE, slug: "directives" }, [one])

  const { said, handed } = await handing(world, {
    ...RECORD,
    field: "name",
    added: `${HELD_AT} directives x\n`,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(
    "`name` is no list field `directives` declares, so nothing is put in"
  )
  expect(handed).toEqual([])
})

test("a field the record property declares nowhere is refused", async () => {
  const world = recordWorld({ ...NONE, slug: "directives" }, [AIDS])

  const { said } = await handing(world, {
    ...RECORD,
    field: "helps",
    added: `${HELD_AT} directives x\n`,
  })

  expect(said.refused ?? "").toContain(
    "`helps` is no list field `directives` declares, so nothing is put in"
  )
})

test("`where` and `is` stated without `field` are refused", async () => {
  const { said, handed } = await handing(worldTold(NONE), {
    where: "name",
    is: "One",
    added: `${HELD_AT} directives x\n`,
  })

  expect(said.refused).toBe(
    "`where`, `is` and `field` are stated together or not at all, so nothing is put in"
  )
  expect(handed).toEqual([])
})

test("`after` stated with a record is refused", async () => {
  const { said, handed } = await handing(worldTold(NONE), {
    ...RECORD,
    after: "name",
    added: `${HELD_AT} directives x\n`,
  })

  expect(said.refused).toBe(
    "`after` places a key rather than a value inside a record, so nothing is put in"
  )
  expect(handed).toEqual([])
})
