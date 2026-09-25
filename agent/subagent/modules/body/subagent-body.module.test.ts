import { expect, test } from "bun:test"
import { explore } from "akasha/agent/subagent/kind/pages/explore/explore.subagent-kind.ts"
import { generalPurpose } from "akasha/agent/subagent/kind/pages/general-purpose/general-purpose.subagent-kind.ts"
import { subagentKind } from "akasha/agent/subagent/kind/subagent-kind.page-type.ts"
import { bodyOf, kindOf } from "akasha/agent/subagent/modules/body/subagent-body.module.code.ts"
import { subagent } from "akasha/agent/subagent/subagent.page-type.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

const SUBAGENT_AT = `${pageType.slug}/${subagent.slug}` as const

const STATES = [
  "import type { Subagent } from",
  "export const akashaAbc = {",
  `type: "${SUBAGENT_AT}"`,
  'slug: "akasha-abc"',
  'principalSeatName: "seat/akasha"',
  'assignmentSlug: "domain/akasha-system"',
  'dispatchedAs: "Explore"',
  'agentId: "seat--own"',
]

const NAMED = [
  "type:",
  "slug:",
  "principalSeatName:",
  "assignmentSlug:",
  "dispatchedAs:",
  "subagentKind:",
  "agentId:",
]

test("a body names the kind page whose dispatched-as it repeats", () => {
  const body = bodyOf("a-abc", "akasha", "domain/akasha-system", explore.dispatchedAs, "seat--own")
  expect(body).toContain(`subagentKind: "${subagentKind.slug}/${explore.slug}"`)
  expect(kindOf(ownRepoRoot(), generalPurpose.dispatchedAs)).toBe(
    `${subagentKind.slug}/${generalPurpose.slug}`
  )
})

test("a dispatched-as no kind page states is kept as text and names no kind", () => {
  const body = bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Nameless", "seat--own")
  expect(body).toContain('dispatchedAs: "Nameless"')
  expect(body).not.toContain("subagentKind:")
  expect(kindOf(ownRepoRoot(), explore.slug)).toBeNull()
})

test("a body states the type and slug and seat and assignment and kind and agent id", () => {
  const body = bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  for (const said of STATES) expect(body).toContain(said)
  expect(body).not.toContain("pageTypeSlug:")
})

test("a body composed states no id, leaving the change to mint one", () => {
  expect(
    bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  ).not.toContain("id:")
})

test("a body carries the id it is handed, before everything else the body states", () => {
  const body = bodyOf("a-abc", "akasha", "domain/akasha-system", "Explore", "seat--own", HELD_ID)
  expect(body).toContain(`id: ${JSON.stringify(HELD_ID)}`)
  expect(body.indexOf("id:")).toBeLessThan(body.indexOf("type:"))
})

test("a body states its keys in the order this module names them", () => {
  const body = bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  const at = NAMED.map((one) => body.indexOf(one))
  expect(at.includes(-1)).toBe(false)
  expect(at).toEqual([...at].sort((one, next) => one - next))
})
