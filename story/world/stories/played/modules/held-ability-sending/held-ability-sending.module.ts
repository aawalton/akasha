import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldAbilitySending = {
  id: "01a18007-3c58-7e0e-a411-717372d6b8e4",
  type: "page-type/module",
  slug: "held-ability-sending",
  definition: "a held ability the sheet asks to have set aside or taken up again, and the answer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask names the game, the held ability's page and the change wanted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change made is answered with the event its beat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change made tells every sheet on the screen to read itself again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer nothing can be read out of says the game did not respond.",
    },
  ],
  createdAt: "2026-10-28T01:02:00.279Z",
  updatedAt: "2026-10-28T01:02:00.279Z",
} as const satisfies Module
