import { expect, test } from "bun:test"
import type { AddressIndex } from "../../page/required-reading/address-index/address-index.ts"
import type { PageAt } from "../../page/page.ts"
import { seatWarrantsFor, seatWarrantsWithDefaults } from "./required-reading.ts"

const SILENT = '---\npage-type-slug: subagent\nslug: athena--a1b2\ntitle: "athena--a1b2"\n---\n'

const STATED =
  "---\npage-type-slug: seat\npersona-slug: athena\ndomain-slug: domain/agent-harness\nrole-slug: definer\n---\n"

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

function addressesIn(warranted: ReturnType<typeof seatWarrantsFor>): readonly string[] {
  return [...warranted].map((one) => `${one.claimant} ${one.page.key}`).sort()
}

test("a page stating no attribute warrants nothing, so a subagent's write is gated on nothing", () => {
  expect(addressesIn(seatWarrantsFor(SILENT, ANY_ADDRESS))).toEqual([])
})

test("the reading a seat is handed fills what its page leaves unsaid, where the gate does not", () => {
  expect(addressesIn(seatWarrantsWithDefaults(SILENT, ANY_ADDRESS))).not.toEqual([])
})

test("a page states its own attributes, so no declared default stands over them", () => {
  const stated = [
    "domain pages/domain/agent-harness.domain.md",
    "persona pages/persona/athena.persona.md",
    "role pages/role/definer.role.md",
  ]
  expect(addressesIn(seatWarrantsFor(STATED, ANY_ADDRESS))).toEqual(stated)
  expect(addressesIn(seatWarrantsWithDefaults(STATED, ANY_ADDRESS))).toEqual(stated)
})
