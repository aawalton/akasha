import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const importLosing = {
  id: "01a0d8fc-6f50-7226-9ea5-d591aec7c572",
  type: "page-type/module",
  slug: "import-losing",
  definition: "the names the files a change carries stop importing from other files",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a file imported before a change and does not import after it is lost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a change takes away loses every name it imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file imported whole before a change loses every name unless still imported whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name lost from a file the change carries itself is not counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the bodies the change carries are read, before and after it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the index or reads a file the change does not carry.",
    },
  ],
} as const satisfies Module
