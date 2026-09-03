import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchNotesRevert = {
  id: "01a06865-ecc3-7197-8546-e38b32431638",
  pageTypeSlug: "module",
  slug: "monarch-notes-revert",
  definition:
    "the notes and tags a transaction carried before this project wrote, and putting them back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The before-picture is taken once and never taken again over itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run over a snapshot that already stands leaves it alone and says how many rows postdate it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row already standing as it was snapshotted is passed over rather than rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "A revert says what it would do before it is asked to do it.",
    },
    {
      invariantKind: "departure",
      statement: "Notes and tags are both put back, because both were changed together.",
    },
    {
      invariantKind: "departure",
      statement:
        "The live row is read on its own day before it is judged, rather than judged from our copy.",
    },
    {
      invariantKind: "stopgap",
      statement: "The snapshot stands in one file under $HOME rather than as a page.",
    },
  ],
} as const satisfies Module
