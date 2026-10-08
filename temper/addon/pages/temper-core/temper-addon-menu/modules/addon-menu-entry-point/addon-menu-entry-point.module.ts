import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuEntryPoint = {
  id: "01a06100-0000-7000-8000-000000000004",
  type: "page-type/module",
  slug: "addon-menu-entry-point",
  definition: "the sole import that names the published surface",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No code runs here beyond the import itself.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The file is one line long.",
    },
  ],
  createdAt: "2026-09-02T07:23:05.088Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
