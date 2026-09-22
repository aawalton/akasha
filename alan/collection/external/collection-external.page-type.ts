import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const collectionExternal = {
  id: "01a063de-2c60-701b-ab74-7e3436f4abe3",
  type: "page-type/page-type",
  slug: "collection-external",
  definition: "a collection recorded by a provider outside akasha",
  parts: [
    "calendar-date-property/last-synced-at",
    "module/external-identity-reading",
    "record-property/external-identity",
    "select-property/source",
    "text-property/external-id",
    "url-property/external-link",
  ],
  extends: ["page-type/collection"],
  properties: [
    {
      pageProperty: "record-property/external-identity",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the provider does not answer with is left as the field was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values a person records about a collection outlive every sync.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection no provider holds a record of states no record.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
