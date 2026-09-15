import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const offlineTextSync = {
  id: "01a0655d-dab8-7fdd-98b8-f681d5314c3b",
  type: "page-type/module",
  slug: "offline-text-sync",
  definition: "the chapters brought down to the device and the position kept there as Alan reads",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sends a position or a completion up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A position written while reading is kept on the device and read back there.",
    },
  ],
} as const satisfies Module
