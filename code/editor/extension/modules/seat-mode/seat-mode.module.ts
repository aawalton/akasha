import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatMode = {
  id: "01a064c8-9a9c-7a5f-8924-880a9eff5f02",
  type: "page-type/module",
  slug: "seat-mode",
  definition: "the two ways a seat runs, and the zod schema admitting one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat mode is interactive or headless.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat mode type is inferred from the zod schema.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads which mode a seat runs in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a mode a seat falls back to.",
    },
  ],
} as const satisfies Module
