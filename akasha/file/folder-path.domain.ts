import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const folderPath = {
  id: "01a06815-ceaf-7e75-9fa7-088f438db82f",
  pageTypeSlug: "domain",
  slug: "folder-path",
  definition: "a path saying where a folder is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file path begins with a folder path.",
    },
  ],
} as const satisfies Domain
