import type { Module } from "../../code-system/modules/module.page-type.ts"

export const errorFingerprint = {
  id: "01a05c48-deeb-7016-a6d6-1a0c3bcc2c59",
  pageTypeSlug: "module",
  slug: "error-fingerprint",
  definition: "the one value two accounts of the same fault share",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two faults differing in line numbers or asset hashes alone fingerprint alike.",
    },
  ],
} as const satisfies Module
