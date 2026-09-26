import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelSkillRank = {
  id: "01a0de53-340a-7c6a-a890-09e16471cc50",
  type: "page-type/page-type",
  slug: "harem-hotel-skill-rank",
  definition: "a rung on the Harem Hotel's ladder a skill climbs",
  pluralSlug: "ranks",
  extends: ["page-type/world-mechanic"],
  parts: ["number-property/harem-hotel-skill-rank-width"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/harem-hotel-skill-rank-width", required: false, many: false },
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
