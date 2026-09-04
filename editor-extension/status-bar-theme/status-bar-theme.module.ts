import type { Module } from "../../code-system/modules/module.page-type.ts"

export const statusBarTheme = {
  id: "01a064c8-9a9c-7a35-9db1-b8f1d3cbf839",
  pageTypeSlug: "module",
  slug: "status-bar-theme",
  definition:
    "the two colors the status bar's usage slots take and the color and glyph a separator takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color here is written as a hex triplet.",
    },
    {
      invariantKind: "departure",
      statement: "The session usage and the weekly usage take different colors.",
    },
    {
      invariantKind: "departure",
      statement: "A separator takes a color apart from the two usage colors.",
    },
    {
      invariantKind: "departure",
      statement: "The glyph a separator shows is a vertical bar.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which slot takes which color.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a color the editor's own theme names.",
    },
  ],
} as const satisfies Module
