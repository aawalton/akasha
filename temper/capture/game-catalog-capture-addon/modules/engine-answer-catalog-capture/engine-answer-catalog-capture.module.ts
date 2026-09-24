import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineAnswerCatalogCapture = {
  id: "01a0d42c-33d0-7ff4-8038-09dcb9eccb0b",
  type: "page-type/module",
  slug: "engine-answer-catalog-capture",
  definition: "the collector asking the game's functions for the fixed facts they answer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game publishes what kind each function answers and none of the answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function asked takes nothing, so no value handed in can be out of range.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function asked answers a fact of the game rather than of the player.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The functions asked are a list kept here of those the game's interface asks while it loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function that raises or is not there is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are kept up to the first that is no number, word or truth.",
    },
  ],
} as const satisfies Module
