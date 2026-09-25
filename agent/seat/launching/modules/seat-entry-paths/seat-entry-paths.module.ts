import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatEntryPaths = {
  id: "01a08b87-db08-7b4d-8019-f88e7fd39f19",
  type: "page-type/module",
  slug: "seat-entry-paths",
  definition: "how code finds the paths of the files that start a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path here is written from the checkout rather than from the file reading it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where each entry sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug the index answers nothing for refuses the answer rather than guessing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout asked is the one given, or the one this code is checked out in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a Bun global.",
    },
  ],
} as const satisfies Module
