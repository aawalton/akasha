import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navCommand = {
  id: "01a0655d-dab8-766a-bd17-37923d93e5a3",
  type: "page-type/module",
  slug: "nav-command",
  definition: "how code adds each choice of the menu of alanwalton.com to the command palette",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command reaching home is named by the title of the home site document.",
    },
  ],
  createdAt: "2026-09-03T03:44:04.792Z",
  updatedAt: "2026-10-30T16:58:56.640Z",
} as const satisfies Module
