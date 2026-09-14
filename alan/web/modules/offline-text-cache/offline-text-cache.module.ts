import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const offlineTextCache = {
  id: "01a0655d-daab-74e1-ab68-7d53cf730d46",
  type: "module",
  slug: "offline-text-cache",
  definition: "the shapes a reading position and a finished chapter are held in on the device",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing writes an index of the chapters the device holds.",
    },
    {
      invariantKind: "departure",
      statement: "A store written under the older shape carries forward without chapter lengths.",
    },
  ],
} as const satisfies Module
