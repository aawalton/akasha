import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pathShowing = {
  id: "01a04f6a-0db6-72c2-9b05-8e1a84ed9649",
  type: "page-type/module",
  slug: "path-showing",
  definition: "how code writes a path for an agent in a folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under the root is said relative to the root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path outside the root is said whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root itself is said whole.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the filesystem.",
    },
  ],
  createdAt: "2026-08-29T21:25:45.526Z",
  updatedAt: "2026-09-25T17:55:24.000Z",
} as const satisfies Module
