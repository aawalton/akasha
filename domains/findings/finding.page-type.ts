import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { DomainSlug } from "../properties/domain-slug.relation-property.ts"
import type { Claim } from "./properties/claim.text-property.ts"
import type { Evidence } from "./properties/evidence.text-property.ts"

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
  pluralSlug: "findings",
  partSlugs: ["text-property/claim", "text-property/evidence"],
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "domain-slug", required: true, many: false },
    { pagePropertySlug: "claim", required: true, many: false },
    { pagePropertySlug: "evidence", required: true, many: false },
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
        "An observation that comes up again is filed as a new finding rather than the old finding restored.",
    },
    {
      invariantKind: "absence",
      statement: "A file or property close to its length limit is no finding.",
    },
  ],
} as const satisfies PageType
