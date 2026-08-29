import type { Module } from "../code-system/module/module.page-type.ts"

export const walking = {
  id: "01a04ef8-da76-76ad-9345-28b37bd75cdd",
  pageTypeSlug: "module",
  slug: "walking",
  definition: "everything standing under a folder, read back as one sorted list a test can compare",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is said from the folder walked rather than from the root, so two trees stood up at different places compare equal.",
    },
    {
      invariantKind: "departure",
      statement:
        "The list is sorted, so what the file system happened to hand back in what order says nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is read as text, so a tree holding bytes that are no text is out of reach here.",
    },
  ],
} as const satisfies Module
