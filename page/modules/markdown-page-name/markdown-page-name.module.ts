import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markdownPageName = {
  id: "01a05cc6-2a1c-776c-88f5-4be2c8d49e52",
  type: "module",
  slug: "markdown-page-name",
  definition: "the stem and the page type read off the name of a markdown file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A markdown page is named stem then page type then `md`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name with no page type names no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the part after the last slash is read.",
    },
  ],
} as const satisfies Module
