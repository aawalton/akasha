import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const header = {
  id: "01a06053-3637-756b-93c2-519e609ad2d8",
  type: "page-type/module",
  slug: "header",
  definition: "a line naming the group of settings that follows it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A header has no setting of its own.",
    },
  ],
  createdAt: "2026-09-02T04:14:21.239Z",
  updatedAt: "2026-09-21T22:10:28.000Z",
} as const satisfies Module
