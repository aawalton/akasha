import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerSkillRank = {
  id: "01a0de18-0b70-730f-a089-da22794b99f8",
  type: "page-type/page-type",
  slug: "tower-skill-rank",
  definition: "a rung on the Tower's ladder a skill climbs",
  pluralSlug: "ranks",
  extends: ["page-type/world-mechanic"],
  parts: ["number-property/tower-skill-rank-width"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/tower-skill-rank-width", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ranks climb in the order their widths rise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one rank stating no width is the top of the ladder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder has seven ranks and no eighth.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
