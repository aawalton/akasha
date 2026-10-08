import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editorLayoutColumns = {
  id: "01a0680d-8b3d-7000-9414-939aff9377c5",
  type: "page-type/module",
  slug: "editor-layout-columns",
  definition: "the editor's groups and the tabs sitting in them, as a panel reads them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group is placed by the column that group is in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the editor.",
    },
  ],
  createdAt: "2026-09-03T16:15:13.213Z",
  updatedAt: "2026-09-15T18:33:01.000Z",
} as const satisfies Module
