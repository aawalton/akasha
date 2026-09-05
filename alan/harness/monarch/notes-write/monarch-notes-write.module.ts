import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchNotesWrite = {
  id: "01a06863-ac0c-7d5f-9e84-4f2e2d021b08",
  pageTypeSlug: "module",
  slug: "monarch-notes-write",
  definition: "the note and the tags written back onto a Monarch transaction",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Only a single transaction update is posted back, and Monarch's own rules engine is never written to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A note is written only where the transaction carries none, read live at the moment of writing rather than from our copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction Monarch does not report on the day asked for is refused rather than written blind.",
    },
    {
      invariantKind: "departure",
      statement:
        "What stood before the write is returned, so a caller can say what was passed over and why.",
    },
    {
      invariantKind: "departure",
      statement: "A note written carries the tag saying a machine wrote it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Setting tags states the whole list, so the standing tags are carried rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement:
        "An errors field in a two-hundred answer is a refusal, because the field is the shape a refused mutation arrives in.",
    },
    {
      invariantKind: "departure",
      statement: "Blank space is no note.",
    },
  ],
} as const satisfies Module
