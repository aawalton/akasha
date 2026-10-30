import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gatedWrite = {
  id: "01a06949-b281-7b8d-ae3f-bc451ba4ebb7",
  type: "page-type/module",
  slug: "gated-write",
  definition: "how code holds whether a file was written and the reason for a refusal",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a refusal has a reason with that refusal.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-10-30T17:42:49.704Z",
} as const satisfies Module
