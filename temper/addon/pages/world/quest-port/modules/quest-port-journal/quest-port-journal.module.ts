import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortJournal = {
  id: "01a11c78-b914-7d43-a65f-184f40479746",
  type: "page-type/module",
  slug: "quest-port-journal",
  definition:
    "the character's open journal, written into the saved variables as the journal changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every open quest is written down with every step and every condition it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest says whether the tracker assists it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each character keeps one journal, and a new reading replaces the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The journal is read again whenever a quest is added, advanced, counted or removed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that throws leaves the journal written before as it was.",
    },
  ],
  createdAt: "2026-10-08T17:03:56.169Z",
  updatedAt: "2026-10-08T17:03:56.169Z",
} as const satisfies Module
