import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceRunServices = {
  id: "01a0685d-4b35-700e-a313-871e5b2440ad",
  type: "page-type/module",
  slug: "inference-run-services",
  definition: "the services a run reaches, the operations they do and the versions they ran",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every service names the versions that service ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that pins nothing names an empty set.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-09-26T16:52:57.000Z",
} as const satisfies Module
