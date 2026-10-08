import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transportNaming = {
  id: "01a06816-2f11-7561-81cd-c9dd76b64b8a",
  type: "page-type/module",
  slug: "transport-naming",
  definition: "the names and labels every resource of this workload carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is read here from the cluster service's page, and every resource takes it from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod carries labels beyond the labels that pod is selected by.",
    },
  ],
  createdAt: "2026-09-03T16:24:39.441Z",
  updatedAt: "2026-09-24T23:47:18.000Z",
} as const satisfies Module
