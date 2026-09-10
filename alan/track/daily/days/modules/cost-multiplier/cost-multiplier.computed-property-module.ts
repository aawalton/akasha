import type { ComputedPropertyModule } from "akasha/pages/computed-property-modules/computed-property-module.page-type.types.ts"

export const costMultiplier = {
  id: "01a08b93-dab4-777c-bdd0-03ab2b96ccb2",
  pageTypeSlug: "computed-property-module",
  type: "computed-property-module",
  slug: "cost-multiplier",
  definition: "what an hour of a stretch costs, read off safety against difficulty",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The gap a cost is read from is the safety level less the difficulty level.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch a full level inside the safety level costs nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch at the safety level costs one hour for each hour it ran.",
    },
    {
      invariantKind: "departure",
      statement: "Each level the gap falls beneath the match roughly doubles the cost.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gap is read at the nearest half step, which is the finest step a level moves in.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch stating no safety level or no difficulty level costs nothing.",
    },
  ],
} as const satisfies ComputedPropertyModule
