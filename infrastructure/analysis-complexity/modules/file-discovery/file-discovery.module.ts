import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileDiscovery = {
  id: "01a0680f-d1b7-7ed0-a713-09a7570e97b9",
  type: "page-type/module",
  slug: "file-discovery",
  definition: "the TypeScript files a git checkout tracks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file git ignores is no file here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration file and a generated file are left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout git will not name answers with no file at all.",
    },
  ],
  createdAt: "2026-09-03T16:17:42.327Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
