import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const offlineText = {
  id: "01a0655d-daab-77d7-a316-1495d9684b74",
  type: "module",
  slug: "offline-text",
  definition: "a reader's positions kept in a file on the device",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A position is read back from the device file it was written to.",
    },
    {
      invariantKind: "absence",
      statement: "No completion is kept on the device.",
    },
    {
      invariantKind: "gap",
      statement: "What is kept here reaches the page store.",
    },
  ],
} as const satisfies Module
