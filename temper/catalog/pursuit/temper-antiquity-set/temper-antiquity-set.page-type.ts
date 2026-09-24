import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAntiquitySet = {
  id: "01a0d5cb-32b5-74ee-a95d-60f339a82129",
  type: "page-type/page-type",
  slug: "temper-antiquity-set",
  definition:
    "a set of antiquity leads the game joins into one reward once every antiquity in it is dug up",
  extends: ["page-type/temper-pursuit-thing"],
  parts: ["number-property/eso-antiquity-set-id"],
  properties: [
    { pageProperty: "number-property/eso-antiquity-set-id", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's slug is the number the game gives it, as no capture yet holds its name.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
