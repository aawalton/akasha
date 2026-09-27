import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperLevelBand = {
  id: "01a0e16a-6334-7f44-b34f-f5518d7dad42",
  type: "page-type/page-type",
  slug: "temper-level-band",
  definition: "a run of item levels, and the worth levels the run is spread over",
  extends: ["page-type/temper-thing"],
  parts: [
    "text-property/level-band-prefix",
    "number-property/level-band-bottom",
    "number-property/level-band-top",
    "number-property/worth-level-start",
    "number-property/worth-level-span",
  ],
  properties: [
    { pageProperty: "text-property/level-band-prefix", required: false, many: false },
    { pageProperty: "number-property/level-band-bottom", required: true, many: false },
    { pageProperty: "number-property/level-band-top", required: true, many: false },
    { pageProperty: "number-property/worth-level-start", required: true, many: false },
    { pageProperty: "number-property/worth-level-span", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level in a band is worth its start plus its share of the span, rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level the item does not state is worth the highest worth level of any band.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
