import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const renderChapter = {
  id: "01a05bc6-fa4a-700e-b0d2-d86d252a6ff5",
  pageTypeSlug: "module",
  slug: "render-chapter",
  definition: "a chapter's beats written out as one text with its word count",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A beat rendering to nothing leaves no gap between its neighbours.",
    },
    {
      invariantKind: "departure",
      statement: "A system beat without a title is headed as the system.",
    },
  ],
} as const satisfies Module
