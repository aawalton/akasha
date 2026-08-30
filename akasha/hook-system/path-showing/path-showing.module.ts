import type { Module } from "../../code-system/module/module.page-type.ts"

export const pathShowing = {
  id: "01a04f6a-0db6-72c2-9b05-8e1a84ed9649",
  pageTypeSlug: "module",
  slug: "path-showing",
  definition: "a path named for a reader standing at the root",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under the root is said relative to it.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the root is said whole.",
    },
    {
      invariantKind: "departure",
      statement: "The root itself is said whole.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the filesystem.",
    },
  ],
} as const satisfies Module
