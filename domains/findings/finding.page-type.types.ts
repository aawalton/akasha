import type { Page } from "../../pages/page.page-type.ts"
import type { PageDomain } from "../properties/page-domain.relation-property.ts"
import type { Claim } from "./properties/claim.text-property.ts"
import type { Evidence } from "./properties/evidence.text-property.ts"

export type Finding = Page & {
  domain: PageDomain
  claim: Claim
  evidence: Evidence
}
