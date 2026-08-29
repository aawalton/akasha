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
      statement:
        "The root is read off the path, never counted, so a file moving deeper still finds it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The last `akasha` in a path marks the folder, the repository being named `akasha` too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path standing outside any `akasha` folder answers nothing rather than a wrong root.",
    },
  ],
} as const satisfies Module
