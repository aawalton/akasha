import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const place = {
  id: "01a0d42e-f05d-7b7a-b366-dceb25db06b5",
  type: "page-type/page-type",
  slug: "place",
  definition: "somewhere in a world",
  pluralSlug: "places",
  extends: ["page-type/lore"],
  parts: [
    "relation-property/place-within",
    "number-property/place-depth",
    "record-property/place-exits",
    "relation-property/place-exit-to",
    "text-property/place-exit-way",
  ],
  properties: [
    { pageProperty: "relation-property/place-within", required: false, many: false },
    { pageProperty: "number-property/place-depth", required: false, many: false },
    { pageProperty: "record-property/place-exits", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place inside another place is a place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place is known to whoever its lore-disclosure names, with the facts it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact about a place known to fewer than the place is on a lore page about it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
