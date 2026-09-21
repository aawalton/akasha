import type { Claim } from "akasha/domain/finding/properties/claim.text-property.types.ts"
import type { Evidence } from "akasha/domain/finding/properties/evidence.text-property.types.ts"
import type { ThrowawayProbe } from "akasha/domain/finding/properties/throwaway-probe.boolean-property.types.ts"
import type { PageDomain } from "akasha/domain/properties/page-domain.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Finding = Page & {
  domain: PageDomain
  claim: Claim
  evidence: Evidence
  throwawayProbe?: ThrowawayProbe
}
