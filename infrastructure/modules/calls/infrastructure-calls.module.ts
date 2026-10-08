import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const infrastructureCalls = {
  id: "01a0953e-1dc9-7000-bf51-cd67b1cd4894",
  type: "page-type/module",
  slug: "infrastructure-calls",
  definition: "the calls a provisioning script makes, composed from the pages naming their levels",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call here is worked out from the pages rather than spelled as words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level renamed on its page is a call renamed here with no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script that runs on a machine reaches its calls here rather than spelling one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index or the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No call here is run from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level put between two named here is left whole in the call until this names it.",
    },
  ],
  createdAt: "2026-09-12T10:51:11.177Z",
  updatedAt: "2026-09-24T22:57:11.000Z",
} as const satisfies Module
