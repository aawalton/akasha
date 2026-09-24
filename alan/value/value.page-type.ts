import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const value = {
  id: "01a06553-f65f-71f6-898f-df18f6561396",
  type: "page-type/page-type",
  slug: "value",
  definition: "the thing on which a person spends their life",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "value" },
    { partOfSpeech: "part-of-speech/noun", spelling: "values" },
  ],
  parts: [
    "relation-property/value-color",
    "value/faith",
    "value/fun",
    "value/health",
    "value/learn",
    "value/love",
    "value/wealth",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "text-property/label", required: true, many: false },
    { pageProperty: "relation-property/value-color", required: false, many: false },
    { pageProperty: "number-property/place", required: true, many: false },
    { pageProperty: "text-property/unit", required: false, many: false },
    { pageProperty: "relation-property/scale", required: false, many: false },
    {
      pageProperty: "multi-relation-property/groups",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "boolean-property/readout-enabled",
      required: false,
      many: false,
      default: "true",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value states in one line the person a life serving that value makes.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A value has the points earned against the value over the whole record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value names its scale rather than carrying a scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value has one place whatever groups draw the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value states one color and is always drawn in that color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points a value has are read from the personas' days rather than declared.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A value takes no reading of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing draws a value.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
