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
      statement:
        "A path under the root is said relative to it, because a reader standing at the root names it that way and would read the whole one as somewhere else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path outside the root is said whole, because no shortening of it still points at the same place.",
    },
    {
      invariantKind: "departure",
      statement: "The root itself is said whole, because said relative to itself it is nothing.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reaches the filesystem, so a path is shown whether or not anything stands at it, and a link on it is not followed. A caller wanting that settles the path first.",
    },
  ],
} as const satisfies Module
