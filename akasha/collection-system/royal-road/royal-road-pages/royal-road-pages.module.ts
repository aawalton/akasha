import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const royalRoadPages = {
  id: "01a0657f-4492-7001-ad86-00f3e943bd74",
  pageTypeSlug: "module",
  slug: "royal-road-pages",
  definition: "a Royal Road fiction page and chapter page read into values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter list is read off the `window.chapters` array the page carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fiction's title and author are read off the linked-data Book block the page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is not always laid out in paragraph tags.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter holding no paragraph tag is read by its line breaks instead.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter that yields a paragraph is read byte for byte as it was before.",
    },
    {
      invariantKind: "departure",
      statement: "A container that is absent and a container that yields nothing are two readings.",
    },
  ],
} as const satisfies Module
