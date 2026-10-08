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
  createdAt: "2026-09-03T16:24:14.767Z",
  updatedAt: "2026-09-25T16:08:16.000Z",
} as const satisfies Domain
