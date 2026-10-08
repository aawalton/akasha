import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsTrace = {
  id: "01a0635f-391c-7cbf-b863-31301fafd0d9",
  type: "page-type/module",
  slug: "quests-trace",
  definition: "what the addon saw and what it decided, written down where it can be read back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A menu is written down once however often the menu is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same decision twice running is written down once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Leaving the dialogue is written down even where the decision repeats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option code is written down beside the name the game gives that code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Turning tracing on again clears the trace written before.",
    },
  ],
  createdAt: "2026-09-02T18:26:20.060Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
