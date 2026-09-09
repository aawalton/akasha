import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  claiming,
  declaring,
  edging,
  filing,
  founded,
  pathFor,
  typed,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  type Judging,
  judgingBy,
  partsOf,
  theWhole,
} from "./domain-is-named-by-a-parent.code-check.decision.code.ts"

const ONE = "01a04d5f-c731-7001-8000-000000000001"

const TWO = "01a04d5f-c731-7002-8000-000000000002"

const UP = "01a04d5f-c731-7003-8000-000000000003"

const UP_AT = "akasha/up.domain.ts"

const TYPE_AT = "akasha/types/domain.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-parented-decision-")
  founded(root)
  typed(root, "page-type", "page")
  typed(root, "domain", "page")
  claiming(root, TYPE_AT, TYPE_AT, "id-domain")
  declaring(root, "part-slugs", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  return root
}

function judging(root: string): Judging {
  return judgingBy(shadowAt(root))
}

test("a page no page names among its parts is refused, and the refusal names the address", () => {
  const root = rooted()
  filing(root, "domain", "held", ONE)
  expect(judging(root)(ONE, "domain/held")).toContain("no page names `domain/held`")
})

test("a page two pages name is refused for being shared rather than for having no parent", () => {
  const root = rooted()
  filing(root, "domain", "held", ONE)
  edging(root, ONE, "part-slugs", TWO, UP_AT)
  edging(root, ONE, "part-slugs", UP, pathFor("domain", "over"))
  const said = judging(root)(ONE, "domain/held")
  expect(said).toContain("2 pages name `domain/held`")
  expect(said).not.toContain("no page names")
})

test("a page one page names, whose chain ends above it, is let through", () => {
  const root = rooted()
  filing(root, "domain", "held", ONE)
  edging(root, ONE, "part-slugs", TWO, UP_AT)
  expect(judging(root)(ONE, "domain/held")).toBe(null)
})

test("pages naming each other in a ring are refused for looping, though each has one parent", () => {
  const root = rooted()
  filing(root, "domain", "under", ONE)
  filing(root, "domain", "over", TWO)
  edging(root, ONE, "part-slugs", TWO, pathFor("domain", "over"))
  edging(root, TWO, "part-slugs", ONE, pathFor("domain", "under"))
  expect(judging(root)(ONE, "domain/under")).toContain("loop rather than reaching `domain/akasha`")
})

test("the second page climbing into one ring is refused from what the first settled", () => {
  const root = rooted()
  filing(root, "domain", "one", ONE)
  filing(root, "domain", "two", TWO)
  edging(root, ONE, "part-slugs", UP, pathFor("domain", "up"))
  edging(root, TWO, "part-slugs", UP, pathFor("domain", "up"))
  edging(root, UP, "part-slugs", UP, pathFor("domain", "up"))
  const judged = judging(root)
  expect(judged(ONE, "domain/one")).toContain("loop")
  expect(judged(TWO, "domain/two")).toContain("loop")
})

test("the whole is the domain page named akasha and nothing else", () => {
  expect(theWhole("akasha/akasha.domain.ts")).toBe(true)
  expect(theWhole("akasha/held.domain.ts")).toBe(false)
  expect(theWhole("akasha/akasha.domain.code.ts")).toBe(false)
})

test("the parts a page names are read from `parts` and from the older `partSlugs`", () => {
  expect(partsOf({ parts: ["domain/one"] })).toEqual(["domain/one"])
  expect(partsOf({ partSlugs: ["domain/two"] })).toEqual(["domain/two"])
  expect(partsOf({})).toEqual([])
  expect(partsOf(null)).toEqual([])
})
