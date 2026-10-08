import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorReport = {
  id: "01a05c48-deeb-7014-9896-b95f9f374200",
  type: "page-type/module",
  slug: "error-report",
  definition: "the shape a browser's account of an error must have to be taken",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A report naming a key the shape does not have is refused whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every app that may report is named here.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Module
