import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperGameCatalogCaptureHost = {
  id: "01a06084-d418-72e5-b162-3bb5b84f91b3",
  type: "page-type/domain",
  slug: "temper-game-catalog-capture-host",
  definition: "the zod schemas reading every game catalog a capture addon saved",
  parts: ["module/antiquity-lore-catalog-schema", "module/lore-library-catalog-schema"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each catalog here is a module of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion catalog here is read from a key the game already gives as a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The inferred type is checked against the shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Domain
