import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterProse = {
  id: "01a06327-e488-7a03-bb37-e36a0d56a4ec",
  type: "page-type/module",
  slug: "chapter-prose",
  definition: "a chapter's prose segments laid out as a reading section",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The covers handed are drawn among the paragraphs, each after the one it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A paragraph wholly in square brackets is an aside rather than story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An aside is drawn smaller and quieter than story, set apart and without its brackets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A paragraph holding brackets short of both its ends is story.",
    },
  ],
  createdAt: "2026-09-02T17:25:53.928Z",
  updatedAt: "2026-10-17T18:03:18.065Z",
} as const satisfies Module
