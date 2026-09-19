import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterTurns = {
  id: "01a0a10a-d1f9-7c13-b526-33d95a14d7dc",
  type: "page-type/module",
  slug: "chapter-turns",
  definition: "the chapters of a story somebody else wrote, shaped into the turns a channel draws",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter stating no position sorts after every chapter that states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter counts as read where that chapter states the moment it was completed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A turn carries no prose, because a chapter's prose is read on that chapter's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The span holds the first chapter that has not been read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with every chapter read has its last chapter for a frontier.",
    },
  ],
} as const satisfies Module
