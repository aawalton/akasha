import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentChannel = {
  id: "01a05bcd-25e3-7b2c-b378-4f00fd2d5eaa",
  type: "page-type/module",
  slug: "agent-channel",
  definition: "which persona's channel a set of recipient headers names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The header values are joined and taken as one lowercase string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first channel address that string has names the handle.",
    },
  ],
  createdAt: "2026-09-01T07:09:26.371Z",
  updatedAt: "2026-09-22T14:37:11.000Z",
} as const satisfies Module
