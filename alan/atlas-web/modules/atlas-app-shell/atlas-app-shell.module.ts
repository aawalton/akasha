import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const atlasAppShell = {
  id: "01a06582-6b30-7b9f-8dc2-c8502969adf3",
  type: "page-type/module",
  slug: "atlas-app-shell",
  definition: "Atlas's page frame",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every item this shell draws in its navigation is a nav page, and none is in code.",
    },
  ],
} as const satisfies Module
