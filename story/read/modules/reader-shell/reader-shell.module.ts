import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readerShell = {
  id: "01a0a114-e185-7eb0-8943-4533dfe74f46",
  type: "page-type/module",
  slug: "reader-shell",
  definition:
    "the reader a story read draws over its own chapters, with its alerts and its channel",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapters drawn are the chapters naming this story and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is drawn until the chapters of the story have arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no chapter of its own draws nothing at all.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No chapter's prose is fetched here, so the shell costs one row a chapter.",
    },
  ],
} as const satisfies Module
