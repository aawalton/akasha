import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navCommand = {
  id: "01a0655d-dab8-766a-bd17-37923d93e5a3",
  type: "page-type/module",
  slug: "nav-command",
  definition: "the commands offered beside Alan's navigation items",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command reaching home is named by the title of the home site document.",
    },
  ],
  createdAt: "2026-09-03T03:44:04.792Z",
  updatedAt: "2026-09-27T12:08:18.000Z",
} as const satisfies Module
