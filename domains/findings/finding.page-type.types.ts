import type { Claim } from "akasha/domains/findings/properties/claim.text-property.ts"
import type { Evidence } from "akasha/domains/findings/properties/evidence.text-property.ts"
import type { PageDomain } from "akasha/domains/properties/page-domain.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Finding = Page & {
  domain: PageDomain
  claim: Claim
  evidence: Evidence
}
