import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportFetching = {
  id: "01a05c14-b11a-7000-a275-a3e0c5949f69",
  type: "page-type/module",
  slug: "export-fetching",
  definition: "an export read off this workstation or off the laptop, and parsed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This workstation is looked in before the laptop is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation with no export falls through to the laptop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One script reads either machine.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is kept on disk between the fetch and the parse.",
    },
  ],
  createdAt: "2026-09-01T08:27:35.066Z",
  updatedAt: "2026-09-24T23:05:06.000Z",
} as const satisfies Module
