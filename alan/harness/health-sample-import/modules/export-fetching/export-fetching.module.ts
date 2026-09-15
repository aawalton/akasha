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
} as const satisfies Module
