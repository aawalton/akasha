import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const emptyDraft = {
  id: "01a18333-a477-7cad-abd9-37699f42a72f",
  type: "page-type/argument",
  slug: "empty-draft",
  said: "--empty-draft",
  takes: "leave the story's action draft empty rather than holding the turn's action",
  value: "none",
  createdAt: "2026-10-28T15:49:22.166Z",
  updatedAt: "2026-10-28T15:49:22.166Z",
} as const satisfies Argument
