import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const antiquitiesEntry = {
  id: "01a06274-b089-7140-959d-d67b4777dffa",
  type: "page-type/module",
  slug: "antiquities-entry",
  definition: "the modules the antiquities feature runs as the bundle loads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lead window is set up only once the game says the add-on has loaded.",
    },
  ],
} as const satisfies Module
