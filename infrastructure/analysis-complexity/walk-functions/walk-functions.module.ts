import type { Module } from "@akasha/code/module"

export const walkFunctions = {
  id: "01a0680f-d1b7-72c6-a3b9-0ccb673e665d",
  pageTypeSlug: "module",
  type: "module",
  slug: "walk-functions",
  definition: "every function a source file has, with the name and line each one is at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A function nested inside another is walked as a function of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A function with no name of its own is named by where that function is.",
    },
  ],
} as const satisfies Module
