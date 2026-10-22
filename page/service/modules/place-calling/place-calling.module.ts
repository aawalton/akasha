import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const placeCalling = {
  id: "01a1642d-2618-7ab1-9d7e-e6aa44959141",
  type: "page-type/module",
  slug: "place-calling",
  definition: "bytes sent over HTTP to be placed beside a page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes placed beside a page are sent through this module as base64 text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placing answering no path is refused rather than read as landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placing is sent and tried again as every call through page calling is.",
    },
  ],
  createdAt: "2026-10-22T15:14:02.904Z",
  updatedAt: "2026-10-22T15:14:02.904Z",
} as const satisfies Module
