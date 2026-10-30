import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateWriting = {
  id: "01a09ca3-cbe9-7489-b97b-135b73b4be8a",
  type: "page-type/module",
  slug: "state-writing",
  definition: "how code writes what the editor shows to the file the editor reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file is replaced by writing a second file elsewhere and renaming that second file over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file written first is outside the folder the editor watches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file written first is named for the process writing that file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here holds a picture between one write and the next.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here watches a file or reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a picture, and no landing reaches this.",
    },
  ],
  createdAt: "2026-09-13T21:19:35.401Z",
  updatedAt: "2026-10-30T15:37:21.136Z",
} as const satisfies Module
