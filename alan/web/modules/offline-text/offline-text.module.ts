import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const offlineText = {
  id: "01a0655d-daab-77d7-a316-1495d9684b74",
  type: "module",
  slug: "offline-text",
  definition: "a reader's positions and completions kept in files on the device",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A position is read back from the device file it was written to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing reads the completion queue but the write that adds to it.",
    },
    {
      invariantKind: "gap",
      statement: "What is kept here reaches the page store.",
    },
  ],
} as const satisfies Module
