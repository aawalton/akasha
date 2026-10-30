import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const walkFunctions = {
  id: "01a0680f-d1b7-72c6-a3b9-0ccb673e665d",
  type: "page-type/module",
  slug: "walk-functions",
  definition: "every function a TypeScript file has, with each one's name and line",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function nested inside another is walked as a function of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function with no name of its own is named by where that function is.",
    },
  ],
  createdAt: "2026-09-03T16:17:42.327Z",
  updatedAt: "2026-10-30T16:05:35.731Z",
} as const satisfies Module
