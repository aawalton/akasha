import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const captureWriter = {
  id: "01a060b5-5ba9-7490-bcc8-208680a38a27",
  type: "page-type/module",
  slug: "capture-writer",
  definition: "one descriptor turned into an add-on that saves what it captured",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved table is made up once the game says the add-on has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller's own setup runs after the saved table is made up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load time is measured only where the descriptor asks for a load time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measured load time is kept in the saved table beside the capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The listener sits under the saved-variable name, so two captures in one bundle keep two listeners.",
    },
  ],
} as const satisfies Module
