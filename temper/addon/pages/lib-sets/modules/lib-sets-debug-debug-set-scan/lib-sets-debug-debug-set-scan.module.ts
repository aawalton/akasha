import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDebugDebugSetScan = {
  id: "01a0623c-2df7-7642-8643-ff60b0ac0a6c",
  type: "page-type/module",
  slug: "lib-sets-debug-debug-set-scan",
  definition: "the item ids tried one by one against the client and the set names that come back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item id is tried by building a link for that id and asking the client for set info.",
    },
    { decisionKind: "decision-kind/departure", statement: "Crafted items are skipped." },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The uncompressed item id table is deleted again unless asked to keep that table.",
    },
  ],
} as const satisfies Module
