import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const proof = {
  id: "01a0657f-5da8-7d50-9da8-5ad4177c9541",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "proof",
  definition: "one attempt at deriving a proposition in the formal system",
  pluralSlug: "proofs",
  extends: ["page-type/page"],
  parts: [
    "file-property/derivation",
    "number-property/attempt",
    "relation-property/proves",
    "select-property/proof-status",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/proves", required: true, many: false },
    { pageProperty: "select-property/proof-status", required: true, many: false },
    { pageProperty: "number-property/attempt", required: true, many: false },
    { pageProperty: "file-property/derivation", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A proof names the proposition the proof attempts.",
    },
    {
      invariantKind: "departure",
      statement: "A second attempt at one proposition is a second proof rather than an edit.",
    },
    {
      invariantKind: "departure",
      statement: "A proof's derivation is in a file of the derivation's own.",
    },
    {
      invariantKind: "departure",
      statement: "A derivation justifies every line the derivation numbers.",
    },
  ],
  types: "ts",
} as const satisfies PageType
