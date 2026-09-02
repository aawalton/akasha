import type { Module } from "../../code-system/modules/module.page-type.ts"

export const deleteRecordKey = {
  id: "01a06057-367a-7da6-aab7-c707ebb15466",
  pageTypeSlug: "module",
  slug: "delete-record-key",
  definition: "a record key set to nothing rather than deleted",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Lua compiled from this code empties a table key by assigning nothing.",
    },
  ],
} as const satisfies Module
