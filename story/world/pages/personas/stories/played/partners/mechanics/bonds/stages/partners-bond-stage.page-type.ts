import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersBondStage = {
  id: "01a0de4b-e1c6-7323-a91c-ceea5b0a9447",
  type: "page-type/page-type",
  slug: "partners-bond-stage",
  definition: "a stage on the ladder a bond in Partners climbs",
  pluralSlug: "stages",
  extends: ["page-type/world-mechanic"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stages climb Stranger, Companion, Confidant, Beloved, Linked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stage crossed is told as felt, never as arithmetic.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
