import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonFormat = {
  id: "01a061c5-18dd-7001-884c-e18901d8f626",
  type: "page-type/module",
  slug: "hud-addon-format",
  definition: "the wording a bar cell gives a rate, a delay and a span",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading below zero is shown as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A span under an hour drops the hour.",
    },
  ],
} as const satisfies Module
