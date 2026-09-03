import type { Module } from "../../code-system/modules/module.page-type.ts"

export const editorLayoutColumns = {
  id: "01a0680d-8b3d-7000-9414-939aff9377c5",
  pageTypeSlug: "module",
  slug: "editor-layout-columns",
  definition:
    "the editor's groups and their tabs, and the arrangement of them a panel is drawn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group is placed by the column it is in.",
    },
    {
      invariantKind: "departure",
      statement: "An arrangement names the window it was taken from.",
    },
    {
      invariantKind: "departure",
      statement: "A tab with no process carries no terminal in the arrangement.",
    },
    {
      invariantKind: "departure",
      statement: "A tab with no seat carries no seat in the arrangement.",
    },
    {
      invariantKind: "departure",
      statement: "A tab's kind and uri are left out of an arrangement.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the editor.",
    },
  ],
} as const satisfies Module
