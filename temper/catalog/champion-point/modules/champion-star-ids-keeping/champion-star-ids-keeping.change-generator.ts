import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const championStarIdsKeeping = {
  id: "01a0e14a-647f-7c8b-beeb-c6e2bbf632fa",
  type: "page-type/change-generator",
  slug: "champion-star-ids-keeping",
  definition: "the type naming every champion star, written from the champion star pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the champion star pages, not an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's id is its page's slug.",
    },
  ],
  createdAt: "2026-09-27T05:15:44.127Z",
  updatedAt: "2026-09-27T05:15:52.000Z",
} as const satisfies ChangeGenerator
