import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutCredential = {
  id: "01a054d9-d41f-796f-a2ff-b2c0fa9863a0",
  type: "page-type/module",
  slug: "readout-credential",
  definition: "the secret a request needs to reach a readout route",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One guard answers for every route serving a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret is compared in constant time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names no reason.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A secret that is unset or empty admits nobody.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a person or a device.",
    },
  ],
  createdAt: "2026-08-30T22:45:56.895Z",
  updatedAt: "2026-10-30T16:03:02.715Z",
} as const satisfies Module
