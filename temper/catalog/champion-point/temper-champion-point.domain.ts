import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperChampionPoint = {
  id: "01a06076-1b64-7dfd-b35b-f6c86003f6c1",
  type: "page-type/domain",
  slug: "temper-champion-point",
  definition: "the champion stars a character earns past level fifty",
  parts: [
    "module/champion-point-source",
    "data-table/champion-star-ids",
    "change-generator/champion-star-ids-keeping",
    "page-type/temper-champion-star",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A star is reached by its kebab id rather than by the number the game gives that star.",
    },
  ],
} as const satisfies Domain
