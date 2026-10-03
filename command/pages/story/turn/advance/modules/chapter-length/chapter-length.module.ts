import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterLength = {
  id: "01a0febd-463f-7fd8-aa34-10bebf2fab5e",
  type: "page-type/module",
  slug: "chapter-length",
  definition: "whether the beats or prose handed to a written chapter's advance are of its length",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter's prose is counted in the words between its whitespace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose handed to a written chapter stating no beats is of any length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's beats are counted from its beats file, as the advance reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapter before sets no length, and a refusal says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat restating the story's chapter break is refused; the break is no beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with editor steps doubles a game master's beats and a writer's words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each editor hands in at most half of what its step was handed, with no fewest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's mend of a chapter with editor steps runs to at most 100 beats.",
    },
  ],
} as const satisfies Module
