import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const coverageStatus = {
  id: "01a06584-9bf3-7006-8d49-ab6fd3063393",
  pageTypeSlug: "module",
  slug: "coverage-status",
  definition: "measured nodes counted against the outline, by part, by division and over the whole",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node is measured unless its status is unopened.",
    },
    {
      invariantKind: "departure",
      statement: "A section is a node three below the root.",
    },
    {
      invariantKind: "departure",
      statement: "A total counts what the outline holds rather than what the disk holds.",
    },
    {
      invariantKind: "departure",
      statement: "A part or a division the disk lacks counts zero measured against its own total.",
    },
    {
      invariantKind: "departure",
      statement: "A count over nothing is nought per cent rather than refused.",
    },
  ],
} as const satisfies Module
