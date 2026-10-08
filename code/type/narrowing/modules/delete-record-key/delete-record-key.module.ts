import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deleteRecordKey = {
  id: "01a06057-367a-7da6-aab7-c707ebb15466",
  type: "page-type/module",
  slug: "delete-record-key",
  definition: "a record key set to nothing rather than deleted",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Lua compiled from this code empties a table key by assigning nothing.",
    },
  ],
  createdAt: "2026-09-02T04:18:43.450Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module
