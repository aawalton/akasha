import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadPages = {
  id: "01a0657f-4492-7001-ad86-00f3e943bd74",
  type: "page-type/module",
  slug: "royal-road-pages",
  definition: "a Royal Road fiction page and chapter page turned into values",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter list is read off the `window.chapters` array the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fiction's title and author are read off the linked-data Book block the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is not always laid out in paragraph tags.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter with no paragraph tag is read by its line breaks instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter that yields a paragraph is read byte for byte as that chapter was before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container that is absent and a container that yields nothing are two readings.",
    },
  ],
} as const satisfies Module
