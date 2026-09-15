import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const finding = {
  id: "01a04bc5-f8c3-758c-b460-da70df03bb96",
  type: "page-type",
  slug: "finding",
  definition: "something noticed about a domain, written down before anyone judges what it means",
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
      invariantKind: "invariant-kind/departure",
      statement: "A finding informs a decision rather than demanding a decision.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A finding is keyed only by its file stem.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A finding whose claim is no longer true is done.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A finding whose evidence has gone false is mended rather than done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A finding carried into a domain intent or an initiative intent is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A finding written into the book section with its subject is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A finding ruled not worth acting on is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An observation that comes up again is filed as a new finding rather than the old finding restored.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A file or property close to its length limit is no finding.",
    },
  ],
  schema: "jsonl",
} as const satisfies PageType
