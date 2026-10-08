import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCardPerf = {
  id: "01a0610c-430e-758f-9da6-bed7278e0bdb",
  type: "page-type/module",
  slug: "page-card-perf",
  definition: "a page-card edit timed from click through visible, stored and settled",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The readings put on the window are read by a console rather than by code.",
    },
  ],
  createdAt: "2026-09-02T07:36:28.686Z",
  updatedAt: "2026-09-22T10:17:30.000Z",
} as const satisfies Module
