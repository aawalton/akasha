import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const strengthVolume = {
  id: "01a077d1-f967-7eef-a0ce-7139eaa1b54d",
  type: "page-type/computed-property",
  slug: "strength-volume",
  propertySlug: "strength-volume",
  definition: "the weight Alan moved on a day, in pounds",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's volume is the volume of every set naming that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's volume is worked out on the page of the set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's volume is rounded where a set's volume is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day no set names is worth nothing rather than no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day counts the sets naming that day rather than the sets dated alike.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
