import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const folderPath = {
  id: "01a06815-ceaf-7e75-9fa7-088f438db82f",
  type: "page-type/domain",
  slug: "folder-path",
  definition: "the path to a folder",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file path begins with a folder path.",
    },
  ],
} as const satisfies Domain
