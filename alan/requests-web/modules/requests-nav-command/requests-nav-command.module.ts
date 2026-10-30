import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsNavCommand = {
  id: "01a0c537-baaa-710a-91ba-8d1a3c37ca13",
  type: "page-type/module",
  slug: "requests-nav-command",
  definition: "how code adds each choice of the menu of the Requests site to the command palette",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commands are the nav pages the sidebar draws, as those pages are now.",
    },
  ],
  createdAt: "2026-09-21T18:25:58.954Z",
  updatedAt: "2026-10-30T16:26:42.280Z",
} as const satisfies Module
