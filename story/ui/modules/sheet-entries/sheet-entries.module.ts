import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetEntries = {
  id: "01a17ebf-87fa-783a-ae80-629f446a6cbd",
  type: "page-type/module",
  slug: "sheet-entries",
  definition: "the rows a character sheet lists, each opening to its description and its acts",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row opens only where it has a description or an act to show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section may show a count at the right of its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section's title and count are set at the size of the rows under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search keeps the rows whose name or description holds what was typed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act sends a turn in the player's words, the way a choice is sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act naming a held ability sets it aside or takes it up at once, and makes no turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such an act is answered under the acts with the event its beat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is offered only to the player signed in, on the player's own sheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the game refuses, as while a turn is being made, is said under the acts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Drop sits apart at the left, and the other acts sit at the right.",
    },
  ],
  createdAt: "2026-10-27T19:04:03.834Z",
  updatedAt: "2026-10-28T14:23:40.905Z",
} as const satisfies Module
