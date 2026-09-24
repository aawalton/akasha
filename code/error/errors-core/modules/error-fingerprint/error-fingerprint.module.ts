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
} as const satisfies Module
