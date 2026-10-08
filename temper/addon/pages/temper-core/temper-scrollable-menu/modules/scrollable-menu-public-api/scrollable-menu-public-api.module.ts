import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuPublicApi = {
  id: "01a06275-c449-763b-b921-cfa7dd2c3f9b",
  type: "page-type/module",
  slug: "scrollable-menu-public-api",
  definition: "the placing of the library object and its constants into the global namespace",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The library is published on globalThis under TemperScrollableMenu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every entry-type and highlight name is copied into _G as a separate global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Update mode constants are published as three separate globals.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.265Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
