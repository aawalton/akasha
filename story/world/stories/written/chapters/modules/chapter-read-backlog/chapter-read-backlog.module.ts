import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterReadBacklog = {
  id: "01a101a0-8e82-7cc9-bf4e-7c98a929e008",
  type: "page-type/module",
  slug: "chapter-read-backlog",
  definition: "the word backlog rule run for the story of a chapter Alan has just read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page write stating a written chapter's completed moment is that chapter read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter read runs its story's word backlog rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule run that fails or throws is said as failed and never thrown.",
    },
  ],
} as const satisfies Module
