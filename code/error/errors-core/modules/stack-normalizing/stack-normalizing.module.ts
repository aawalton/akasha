import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stackNormalizing = {
  id: "01a05c48-deeb-7017-b565-3730f8ab193a",
  type: "page-type/module",
  slug: "stack-normalizing",
  definition: "a stack trace with line numbers, directories and build hashes taken out",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame repeated directly after itself is dropped.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Module
