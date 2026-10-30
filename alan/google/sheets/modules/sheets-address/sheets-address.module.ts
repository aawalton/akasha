import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetsAddress = {
  id: "01a13ab0-c506-7e3a-aca7-95e922ebc076",
  type: "page-type/module",
  slug: "sheets-address",
  definition: "how code finds a spreadsheet from a URL or an id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A share URL and a bare id name the same sheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab a URL names is read from its `gid`, in the fragment before the query.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A range naming its own tab is taken as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A range naming no tab is read in the tab the URL names, or else the first tab.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab is named by its title in quotes, so a title with a space is reached.",
    },
  ],
  createdAt: "2026-10-14T13:53:45.733Z",
  updatedAt: "2026-10-30T16:28:29.749Z",
} as const satisfies Module
