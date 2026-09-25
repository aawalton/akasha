import { afterAll, expect, test } from "bun:test"
import { judgingBy } from "akasha/check/code/pages/domain-is-a-part-of-a-domain/domain-is-a-part-of-a-domain.check-code.decision.code.ts"
import type { Judging } from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import {
  claiming,
  declaring,
  edging,
  founded,
  pathFor,
  relating,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ONE = "01a0d94a-c731-7001-8000-000000000001"

const TWO = "01a0d94a-c731-7002-8000-000000000002"

const UP = "01a0d94a-c731-7003-8000-000000000003"

const TYPE_AT = "akasha/domain.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-part-of-a-domain-decision-")
  founded(root)
  typed(root, "page-type", "page")
  typed(root, "domain", "page")
  typed(root, "story-read", "page")
  claiming(root, TYPE_AT, "id-domain")
  declaring(root, "part-slugs", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  relating(root)
  return root
}

function judging(root: string): Judging {
  return judgingBy(shadowAt(root))
}

test("a domain no page names among its parts is refused, and the refusal names the address", () => {
  const root = rooted()
  claiming(root, pathFor("domain", "held"), ONE)
  expect(judging(root)(ONE, "domain/held")).toContain("no domain names `domain/held`")
})

test("a domain only a page outside domain names is refused", () => {
  const root = rooted()
  claiming(root, pathFor("domain", "held"), ONE)
  edging(root, ONE, "part-slugs", TWO, pathFor("story-read", "over"))
  expect(judging(root)(ONE, "domain/held")).toContain("no domain names `domain/held`")
})

test("a domain a domain names among its parts is let through", () => {
  const root = rooted()
  claiming(root, pathFor("domain", "held"), ONE)
  edging(root, ONE, "part-slugs", UP, pathFor("domain", "over"))
  expect(judging(root)(ONE, "domain/held")).toBe(null)
})

test("a domain a page of a page type under domain names is let through", () => {
  const root = rooted()
  typed(root, "module", "domain")
  claiming(root, pathFor("domain", "held"), ONE)
  edging(root, ONE, "part-slugs", UP, pathFor("module", "over"))
  expect(judging(root)(ONE, "domain/held")).toBe(null)
})

test("a domain named by a domain through a reference carrying no id is let through", () => {
  const root = rooted()
  claiming(root, pathFor("domain", "held"), ONE)
  edging(root, ONE, "part-slugs", null, pathFor("domain", "over"))
  expect(judging(root)(ONE, "domain/held")).toBe(null)
})
