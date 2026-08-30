import type { Module } from "../../code-system/module/module.page-type.ts"

export const rooting = {
  id: "01a04f5a-6229-7bed-be21-ddab3550449e",
  pageTypeSlug: "module",
  slug: "rooting",
  definition: "the repository holding the akasha folder a file stands in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The root is read off the path rather than counted.",
    },
    {
      invariantKind: "departure",
      statement: "The last `akasha` in a path marks the folder.",
    },
    {
      invariantKind: "departure",
      statement: "The repository is named `akasha` too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path standing outside any `akasha` folder is refused rather than answered with a wrong root.",
    },
  ],
} as const satisfies Module
