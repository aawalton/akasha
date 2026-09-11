import { afterAll, expect, test } from "bun:test"
import { nothingFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { judgingBy } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  DECLARES_NO_PAGE,
  refusalsOver,
  STATES_NO_PAGE_TYPE,
} from "./page-matches-its-type.code-check.decision.code.ts"
import {
  ALPHA_AT,
  BETA_AT,
  extending,
  generating,
  HELD_ID,
  NARROWED,
  NOW_ALPHA,
  NOW_BETA,
  ONE_HELD,
  ONE_HELD_AT,
  scratch,
  seeded,
  THING_AT,
  THING_BODY,
  typing,
  WAS_ALPHA,
} from "./page-matches-its-type.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const HELD_AT = "akasha/held.page-type.ts"

function bytesFor(bodies: Readonly<Record<string, string>>, root?: string) {
  const disk = root === undefined ? (): null => null : onDisk(root)
  return (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? disk(path) : new TextEncoder().encode(said)
  }
}

const judged = judgingBy(refusalsOver)

function judgedOver(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const root = scratch.rootFor("akasha-matches-")
  nothingFiled(root)
  const at = bytesFor(bodies)
  return judged({ root, changed: Object.keys(bodies).sort(), after: at, before: at })
}

function landing(
  root: string,
  now: Readonly<Record<string, string>>,
  was: Readonly<Record<string, string>>
): readonly Judged[] {
  return judged({
    root,
    changed: Object.keys(now).sort(),
    after: bytesFor(now, root),
    before: bytesFor(was),
  })
}

test("a page stating no page type is refused, and is not passed over", () => {
  const body = 'export const held = { id: "a", slug: "held" }\n'
  expect(judgedOver({ [HELD_AT]: body })).toEqual([{ path: HELD_AT, reason: STATES_NO_PAGE_TYPE }])
})

test("a page whose body declares no page is refused, and is not passed over", () => {
  expect(judgedOver({ [HELD_AT]: "export const held = 1\n" })).toEqual([
    { path: HELD_AT, reason: DECLARES_NO_PAGE },
  ])
})

test("a page whose body will not load is refused, and the refusal carries why it would not", () => {
  const said = judgedOver({ [HELD_AT]: "export const held = (\n" })
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(HELD_AT)
  expect(said[0]?.reason).toContain("would not load")
  expect(said[0]?.reason).toContain("Unexpected end of file")
})

test("a page whose page type declares nothing is passed over, as it was before", () => {
  const body = 'export const held = { id: "a", slug: "held", pageTypeSlug: "page-type" }\n'
  expect(judgedOver({ [HELD_AT]: body })).toEqual([])
})

test("a file the index does not name as a page is passed over, whatever its body says", () => {
  expect(judgedOver({ "akasha/held.ts": "export const held = (\n" })).toEqual([])
})

function overThing(already: boolean, generator = "waiting"): readonly Judged[] {
  const held = { [THING_AT]: THING_BODY }
  const root = generating(scratch.rootFor("akasha-generating-"), generator)
  return judged({
    root,
    changed: [THING_AT],
    after: bytesFor(held, root),
    before: bytesFor(already ? held : {}),
  })
}

const DEMANDED = {
  path: THING_AT,
  reason: "does not state `held`, which `page-type/thing` requires",
}

test("a page being created is not refused for a property a generator fills after the checks", () => {
  expect(overThing(false)).toEqual([])
})

test("a page being created is refused for a property a generator fills before the checks", () => {
  expect(overThing(false, "uuid-v7")).toEqual([DEMANDED])
})

test("a page already there is refused for dropping a property a generator fills", () => {
  expect(overThing(true)).toEqual([DEMANDED])
})

test("a page stating what a page type the change puts above its own declares is let through", () => {
  const root = extending(scratch.rootFor("akasha-extending-"))
  const now = {
    [ALPHA_AT]: NOW_ALPHA,
    [BETA_AT]: NOW_BETA,
    "akasha/one.alpha.ts": 'export const one = { pageTypeSlug: "alpha", note: "hi" }\n',
  }
  expect(landing(root, now, { [ALPHA_AT]: WAS_ALPHA })).toEqual([])
})

test("a page type the change carries is read as the change leaves it", () => {
  const root = scratch.rootFor("akasha-carried-")
  seeded(root)
  const narrowing = { [HELD_AT]: typing(HELD_ID, "held", '["page-type/page"]', NARROWED) }
  expect(landing(root, { ...narrowing, [ONE_HELD_AT]: ONE_HELD }, {})).toEqual([
    { path: ONE_HELD_AT, reason: "does not state `name`, which `page-type/held` requires" },
  ])
  expect(landing(root, { [ONE_HELD_AT]: ONE_HELD }, {})).toEqual([])
})
