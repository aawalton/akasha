import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIvCultivationStage = {
  id: "01a0e9fe-6b1e-7d89-a51f-157e82496998",
  type: "page-type/page-type",
  slug: "otherwhere-iv-cultivation-stage",
  definition: "how far up the realms a character has climbed",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value counts the stages a character has climbed, and 0 is a mortal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each realm past the mortal has nine stages, so stage 1 to 9 is the Initiate's Realm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stages 10 to 18 are the Profound Realm, and each nine after is the next realm up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a breakthrough settled on the cultivating check raises the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grievous wound or a shattered dantian can lower the value.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
