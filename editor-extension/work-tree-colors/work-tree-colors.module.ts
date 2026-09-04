import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeColors = {
  id: "01a06867-dbcb-7466-9dd7-57e1eb113be5",
  pageTypeSlug: "module",
  slug: "work-tree-colors",
  definition: "the color a work tree row is drawn in, raised through everything standing under it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row takes the liveliest color of itself and everything standing under it.",
    },
    {
      invariantKind: "departure",
      statement: "A color the ranking does not name sits behind every color the ranking names.",
    },
    {
      invariantKind: "departure",
      statement: "A row with no color takes whatever color stands under it.",
    },
    {
      invariantKind: "departure",
      statement: "A row nothing states and holding nothing stated carries no color.",
    },
    {
      invariantKind: "departure",
      statement: "A repaint reads each row's color afresh rather than raising the one it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A repaint moving no row's color answers nothing rather than an equal tree.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is rebuilt rather than colored where it stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a color from the seats.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a color is drawn as.",
    },
  ],
} as const satisfies Module
