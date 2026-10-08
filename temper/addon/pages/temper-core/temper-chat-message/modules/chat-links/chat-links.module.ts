import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatLinks = {
  id: "01a06060-0d16-7826-bea5-a5a6d3a4be60",
  type: "page-type/module",
  slug: "chat-links",
  definition: "the custom chat links this library rewrites as a message is formatted",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link of a type no addon registered is rewritten as an unknown link.",
    },
  ],
  createdAt: "2026-09-02T04:28:22.678Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
