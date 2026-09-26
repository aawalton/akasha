import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiBondStage = {
  id: "01a0de4f-393d-7b39-8415-acb4f77286b0",
  type: "page-type/page-type",
  slug: "partners-ii-bond-stage",
  definition: "a stage on the ladder a bond in Partners II climbs",
  pluralSlug: "stages",
  extends: ["page-type/world-rank"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stage crossed is told as felt, never as arithmetic.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
