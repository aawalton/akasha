import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const newestDivider = {
  id: "01a0629b-682c-7208-a65c-1d5fdba6f831",
  type: "page-type/module",
  slug: "newest-divider",
  definition: "the ruled line marking where the newest turn or chapter begins",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The divider is drawn wherever there is a current turn or chapter to mark.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No game opts out of it, so a plain story and a game with a window both carry it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It reads as a quiet reader's label rather than as a game's own chrome.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It takes the same form as the divider marking the story so far.",
    },
  ],
} as const satisfies Module
