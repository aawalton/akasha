import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { DomainSlug } from "../domain/properties/domain-slug.page-property-type.ts"
import type { Claim } from "./properties/claim.page-property-type.ts"
import type { Evidence } from "./properties/evidence.page-property-type.ts"

export type Finding = Page & {
  domainSlug: DomainSlug
  claim: Claim
  evidence: Evidence
}

export const finding = {
  id: "01a04bc5-f8c3-758c-b460-da70df03bb96",
  pageTypeSlug: "page-type",
  slug: "finding",
  definition: "something noticed about a domain, written down before anyone judges what it means",
  extendsSlug: "page-type/page",
  properties: [
    { propertySlug: "page-property-type/domain-slug", required: true, many: false },
    { propertySlug: "page-property-type/claim", required: true, many: false },
    { propertySlug: "page-property-type/evidence", required: true, many: false },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A finding informs a decision rather than demanding one.",
    },
    {
      invariantKind: "departure",
      statement: "A finding is keyed only by its file stem.",
    },
    {
      invariantKind: "departure",
      statement: "A finding whose claim is no longer true is done.",
    },
    {
      invariantKind: "departure",
      statement: "A finding carried into a domain intent or an initiative intent is done.",
    },
    {
      invariantKind: "departure",
      statement: "A finding ruled not worth acting on is done.",
    },
    {
      invariantKind: "departure",
      statement:
        "If the same observation comes up again, it is filed as a new finding rather than the old one restored.",
    },
  ],
} as const satisfies PageType
