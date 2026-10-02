import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterProse = {
  id: "01a06327-e488-7a03-bb37-e36a0d56a4ec",
  type: "page-type/module",
  slug: "chapter-prose",
  definition: "a chapter's prose segments laid out as a reading section",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The covers handed are drawn among the paragraphs, each after the one it shows.",
    },
  ],
} as const satisfies Module
