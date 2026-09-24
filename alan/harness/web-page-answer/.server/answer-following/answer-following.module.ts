import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerFollowing = {
  id: "01a0d578-c0fa-751e-afec-ba89fb6d0097",
  type: "page-type/module",
  slug: "answer-following",
  definition: "a browser's stream of page changes and what it follows, answered by a site",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Any visitor opens a stream, signed in or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each follow is held to what its visitor may read of its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow of a page type its visitor may not read is withheld and named as such.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow whose visitor reads its page type narrowed carries that narrow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow a browser says for itself is dropped.",
    },
  ],
} as const satisfies Module
