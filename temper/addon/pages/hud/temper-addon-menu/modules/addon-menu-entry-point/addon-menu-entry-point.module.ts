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
} as const satisfies Module
