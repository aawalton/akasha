import type { Module } from "../../code-system/module/module.page-type.ts"

export const rooting = {
  id: "01a04f5a-6229-7bed-be21-ddab3550449e",
  pageTypeSlug: "module",
  slug: "rooting",
  definition: "the repository a test is running inside, found by walking up to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The root is walked up to, never counted, so a file moving deeper still finds it.",
    },
    {
      invariantKind: "departure",
      statement: "What marks the root is the `node_modules` a test needs standing in it.",
    },
    {
      invariantKind: "departure",
      statement: "A walk reaching the top of the disk answers nothing rather than a wrong root.",
    },
  ],
} as const satisfies Module
