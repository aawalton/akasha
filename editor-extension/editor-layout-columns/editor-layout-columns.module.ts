import type { Module } from "../../code-system/modules/module.page-type.ts"

export const editorLayoutColumns = {
  id: "01a0680d-8b3d-7000-9414-939aff9377c5",
  pageTypeSlug: "module",
  type: "module",
  slug: "editor-layout-columns",
  definition: "the editor's groups and the tabs sitting in them, as a panel reads them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group is placed by the column that group is in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the editor.",
    },
  ],
} as const satisfies Module
