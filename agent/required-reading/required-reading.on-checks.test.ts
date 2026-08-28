import { expect, test } from "bun:test"
import type { AddressIndex } from "../../page/required-reading/address-index/address-index.ts"
import type { PageAt } from "../../page/page.ts"
import { seatWarrantsWithDefaults, subagentWarrantsFor, type Warranted } from "./required-reading.ts"

const SILENT = '---\npage-type-slug: seat\ntitle: "a seat saying nothing of itself"\n---\n'

const STATED =
  "---\npage-type-slug: seat\npersona-slug: athena\ndomain-slug: domain/agent-harness\nrole-slug: definer\n---\n"

const UNDECLARED = "this body opens with no frontmatter block, so it declares nothing\n"

function pageAt(address: string): PageAt {
  const [type = "", stem = ""] = address.split("/")
  return { repo: "instructions", key: `pages/${type}/${stem}.${type}.md`, stem, type }
}

const ANY_ADDRESS: AddressIndex = {
  frontmatterOf: () => null,
  domainAt: (address) => pageAt(address),
  pageTypeNamed: () => null,
  pageNamed: () => null,
  pagesFrom: () => [],
}

function addressesIn(warranted: readonly Warranted[]): readonly string[] {
  return [...warranted].map((one) => `${one.claimant} ${one.page.key}`).sort()
}

function claimantsIn(warranted: readonly Warranted[]): readonly string[] {
  return [...new Set([...warranted].map((one) => one.claimant))].sort()
}

test("a body declaring nothing warrants nothing, there being no frontmatter to read", () => {
  expect(addressesIn(seatWarrantsWithDefaults(UNDECLARED, ANY_ADDRESS))).toEqual([])
  expect(addressesIn(subagentWarrantsFor(UNDECLARED, ANY_ADDRESS))).toEqual([])
})

test("a seat leaving an attribute unsaid stands on what its page type declares by default", () => {
  const claimants = claimantsIn(seatWarrantsWithDefaults(SILENT, ANY_ADDRESS))
  expect(claimants).toContain("persona")
  expect(claimants).toContain("domain")
  expect(claimants).toContain("role")
})

test("a seat states its own attributes, so no declared default stands over them", () => {
  expect(addressesIn(seatWarrantsWithDefaults(STATED, ANY_ADDRESS))).toEqual([
    "domain pages/domain/agent-harness.domain.md",
    "persona pages/persona/athena.persona.md",
    "role pages/role/definer.role.md",
  ])
})

test("a subagent stands on its seat's domain, never on its seat's persona or role", () => {
  const said = addressesIn(subagentWarrantsFor(STATED, ANY_ADDRESS))
  expect(said).toContain("domain pages/domain/agent-harness.domain.md")
  expect(said).not.toContain("persona pages/persona/athena.persona.md")
  expect(said).not.toContain("role pages/role/definer.role.md")
  const claimants = claimantsIn(subagentWarrantsFor(STATED, ANY_ADDRESS))
  expect(claimants).toContain("persona")
  expect(claimants).toContain("role")
})
