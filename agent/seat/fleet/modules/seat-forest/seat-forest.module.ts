import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatForest = {
  id: "01a069bd-bdc5-755e-a5da-244f293078f7",
  type: "page-type/module",
  slug: "seat-forest",
  definition: "how code reads every seat with the seat or the person that starts the seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's mode is the mode observed of the supervisor with that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat nothing observed a mode of shows the mode that seat was started in.",
    },
  ],
} as const satisfies Module
