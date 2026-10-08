import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneTypes = {
  id: "01a061e7-92f1-7d24-873f-7531d9341088",
  type: "page-type/module",
  slug: "zone-types",
  definition: "the shapes zone data, the library object and the slash-command library take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The slash-command library is shaped here rather than in the shared game declarations.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.521Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
