import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editorFocus = {
  id: "01a183eb-b22d-785d-89f5-6d488735961d",
  type: "page-type/module",
  slug: "editor-focus",
  definition: "whether any editor window has focus",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each editor window writes whether it has focus whenever that changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window writes under the runtime folder the supervisors share.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor has focus where any window whose process lives has focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window closing removes what it wrote.",
    },
  ],
  createdAt: "2026-10-28T19:10:24.299Z",
  updatedAt: "2026-10-28T19:10:24.299Z",
} as const satisfies Module
