import { afterAll, expect, test } from "bun:test"
import {
  addPageInstants,
  lastCommitted,
} from "akasha/change/mechanical/page-type/add/add-page-instants/add-page-instants.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  declaring,
  worldOfType,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { momentOfVersionSeven } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const TYPE = "thing"

const ONE_AT = "akasha/one.thing.ts"

const TWO_AT = "akasha/two.thing.ts"

const ONE_ID = "01a11c02-1cc1-7a9a-ba3c-c377f6d15cf2"

const TWO_ID = "01a11c02-1cc2-7277-b4b3-fe9a8c427ce4"

const ONCE = Date.parse("2026-10-08T15:00:00.000Z")

const STATED = "2020-01-01T00:00:00.000Z"

function bodyFor(slug: string, id: string, more = ""): string {
  return `export const ${slug} = {\n  id: "${id}",\n  type: "page-type/${TYPE}",\n  slug: "${slug}",\n${more}} as const\n`
}

const BODIES = { [ONE_AT]: bodyFor("one", ONE_ID), [TWO_AT]: bodyFor("two", TWO_ID) }

const VALUES = new Map<string, Value>([
  [ONE_AT, { id: ONE_ID, type: `page-type/${TYPE}`, slug: "one" }],
  [TWO_AT, { id: TWO_ID, type: `page-type/${TYPE}`, slug: "two" }],
])

const DECLARED = [declaring("createdAt", false), declaring("updatedAt", false)]

function worldFor(bodies = BODIES, values = VALUES): World {
  return worldOfType(TYPE, bodies, DECLARED, values, listing([]))
}

const LAST: ReadonlyMap<string, number> = new Map([[ONE_AT, ONCE]])

function last(): ReadonlyMap<string, number> {
  return LAST
}

function said(at: number): string {
  return `"${new Date(at).toISOString()}"`
}

test("a page stating neither instant is given both", () => {
  const world = worldFor()
  const answer = addPageInstants(world, { pageType: TYPE }, last)
  expect(answer.refused).toBeNull()
  const body = bodiesIn(answer, world.base).get(ONE_AT) ?? ""
  expect(body).toContain(`createdAt: ${said(momentOfVersionSeven(ONE_ID) ?? 0)}`)
  expect(body).toContain(`updatedAt: ${said(ONCE)}`)
})

test("a page git has no commit for is changed when it was created", () => {
  const world = worldFor()
  const body = bodiesIn(addPageInstants(world, { pageType: TYPE }, last), world.base).get(TWO_AT)
  const made = said(momentOfVersionSeven(TWO_ID) ?? 0)
  expect(body ?? "").toContain(`createdAt: ${made}`)
  expect(body ?? "").toContain(`updatedAt: ${made}`)
})

test("a page stating one instant is given only the other", () => {
  const values = new Map(VALUES)
  values.set(ONE_AT, { ...VALUES.get(ONE_AT), updatedAt: STATED })
  const bodies = { ...BODIES, [ONE_AT]: bodyFor("one", ONE_ID, `  updatedAt: "${STATED}",\n`) }
  const world = worldFor(bodies, values)
  const body = bodiesIn(addPageInstants(world, { pageType: TYPE }, last), world.base).get(ONE_AT)
  expect(body ?? "").toContain(`updatedAt: "${STATED}"`)
  expect(body ?? "").toContain("createdAt: ")
  expect((body ?? "").match(/updatedAt/g)).toHaveLength(1)
})

test("a page stating both instants is passed over", () => {
  const values = new Map([
    [ONE_AT, { ...VALUES.get(ONE_AT), createdAt: STATED, updatedAt: STATED }],
  ])
  const answer = addPageInstants(worldFor(BODIES, values), { pageType: TYPE }, last)
  expect(answer.refused).toBeNull()
  expect(answer.edits).toEqual([])
})

test("a count handed in bounds how many pages are given instants", () => {
  const answer = addPageInstants(worldFor(), { pageType: TYPE, atMost: 1 }, last)
  expect(pathsIn(answer)).toEqual([ONE_AT])
})

test("the last commit naming a path is the moment that path last changed", () => {
  const root = scratch.rootFor("add-page-instants-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  for (const [at, note] of [
    ["one.ts", "first"],
    ["two.ts", "second"],
    ["one.ts", "third"],
  ] as const) {
    put(root, at, note)
    gitIn(root, ["add", "--", at])
    gitIn(root, ["commit", "--quiet", "-m", note, "--", at])
  }
  const found = lastCommitted(root)(["one.ts", "two.ts"])
  expect([...found.keys()].sort()).toEqual(["one.ts", "two.ts"])
  expect(found.get("one.ts") ?? 0).toBeGreaterThanOrEqual(found.get("two.ts") ?? 0)
})
