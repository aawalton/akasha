import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorFingerprint = {
  id: "01a05c48-deeb-7016-a6d6-1a0c3bcc2c59",
  type: "page-type/module",
  slug: "error-fingerprint",
  definition: "the value two accounts of the same fault share",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two faults differing in line numbers or asset hashes alone fingerprint alike.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Module
