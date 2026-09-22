import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const locationCollection = {
  id: "01a06589-d12e-7daf-abd1-8fb5c89e9127",
  type: "page-type/page-type",
  slug: "location-collection",
  definition: "places filed under a name",
  extends: ["page-type/page"],
  parts: ["file-property/location-collection-description"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "file-property/location-collection-description",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/icon", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection lists no place of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place names the collection that place is in.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
