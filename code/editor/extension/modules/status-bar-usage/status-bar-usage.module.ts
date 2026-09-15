import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarUsage = {
  id: "01a0655b-ae42-784d-bd36-ba69482649b6",
  type: "module",
  slug: "status-bar-usage",
  definition: "the session and weekly figures the status bar draws of the fleet's spend",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mean taken over no account is no figure rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mean is handed in rather than read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two means are taken apart from one another.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a child process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens an account's page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says how a figure is drawn.",
    },
  ],
} as const satisfies Module
