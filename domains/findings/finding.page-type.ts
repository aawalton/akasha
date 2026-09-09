import type { PageType } from "@akasha/pages/page-type"

export const finding = {
  id: "01a04bc5-f8c3-758c-b460-da70df03bb96",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "finding",
  definition: "something noticed about a domain, written down before anyone judges what it means",
  pluralSlug: "findings",
  parts: ["text-property/claim", "text-property/evidence"],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "relation-property/page-domain", required: true, many: false },
    { pageProperty: "text-property/claim", required: true, many: false },
    { pageProperty: "text-property/evidence", required: true, many: false },
  ],
  mortal: true,
  types: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A finding informs a decision rather than demanding a decision.",
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
      statement: "A finding written into the book section with its subject is done.",
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
