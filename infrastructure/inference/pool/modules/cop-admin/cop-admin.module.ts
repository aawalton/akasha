import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const copAdmin = {
  id: "01a0685d-4b35-700b-a3ee-538f05dcbe5d",
  type: "page-type/module",
  slug: "cop-admin",
  definition: "asking the traffic cop which service is resident and telling it to swap",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The admin port is reached from the host over ssh rather than across the network.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cop that answers something other than the expected answer is raised as an operational failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activate posted is named before its answer is read, since that read can fail.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
