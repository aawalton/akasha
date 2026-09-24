import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const place = {
  id: "01a0d42e-f05d-7b7a-b366-dceb25db06b5",
  type: "page-type/page-type",
  slug: "place",
  definition: "somewhere in a world",
  pluralSlug: "places",
  extends: ["page-type/page"],
  parts: [
    "relation-property/place-within",
    "number-property/place-depth",
    "record-property/place-exits",
    "relation-property/place-exit-to",
    "text-property/place-exit-way",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: true, many: false },
    { pageProperty: "relation-property/place-within", required: false, many: false },
    { pageProperty: "number-property/place-depth", required: false, many: false },
    { pageProperty: "record-property/place-exits", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place inside another place is a place.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
