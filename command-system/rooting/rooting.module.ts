import type { Module } from "@akasha/code-system/module"

export const rooting = {
  id: "01a04f5a-6229-7bed-be21-ddab3550449e",
  pageTypeSlug: "module",
  slug: "rooting",
  definition: "the akasha checkout a file stands in, which is the akasha folder itself",
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
      statement: "The `akasha` folder is the repository root, not a folder inside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path standing outside any `akasha` folder is refused rather than answered with a wrong root.",
    },
  ],
} as const satisfies Module
