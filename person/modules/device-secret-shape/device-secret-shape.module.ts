import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceSecretShape = {
  id: "01a05d42-bbca-790f-b10c-1d1b1caed1c9",
  type: "page-type/module",
  slug: "device-secret-shape",
  definition: "how a device secret is written, and how anything else is told from it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A device secret opens with `dvs_v1_`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device secret closes with 43 base64url characters.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here hashes a secret.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store.",
    },
  ],
  createdAt: "2026-09-01T13:57:29.674Z",
  updatedAt: "2026-09-15T18:37:21.000Z",
} as const satisfies Module
