import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readerShell = {
  id: "01a0a114-e185-7eb0-8943-4533dfe74f46",
  type: "page-type/module",
  slug: "reader-shell",
  definition: "the alerts a story read raises over its own chapters",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapters watched are the chapters naming this story and no other.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "Only the prompt to allow alerts is drawn, and only while the browser asks for it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No chapter is listed here, since the view the story embeds lists them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No chapter's prose is fetched here, so the shell costs one row a chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only this story's chapters are asked for, never every chapter there is.",
    },
  ],
} as const satisfies Module
