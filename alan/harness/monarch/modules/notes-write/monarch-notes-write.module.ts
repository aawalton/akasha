import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchNotesWrite = {
  id: "01a06863-ac0c-7d5f-9e84-4f2e2d021b08",
  type: "page-type/module",
  slug: "monarch-notes-write",
  definition: "how code writes the note and the Monarch tags a Monarch transaction carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A note is written only where a live read at the moment of writing shows no note.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A transaction Monarch does not report on the day asked for is refused rather than written blind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The standing transaction is returned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller says which transaction was passed over and why.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A note written has the tag saying a machine wrote that note.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Setting tags states the whole list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The standing tags are carried rather than replaced.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Blank space is no note.",
    },
  ],
  createdAt: "2026-09-03T17:49:17.708Z",
  updatedAt: "2026-10-30T15:42:05.529Z",
} as const satisfies Module
