import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsAppShell = {
  id: "01a0c537-ba8c-76cf-8c53-2c9af0c65345",
  type: "page-type/module",
  slug: "requests-app-shell",
  definition: "the Requests site's page frame",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The sidebar carries the nav pages naming `web-app/alanwalton-requests-web` and nothing else.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This frame has no bottom section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name over the sidebar is the title of the site document at the empty path.",
    },
  ],
} as const satisfies Module
