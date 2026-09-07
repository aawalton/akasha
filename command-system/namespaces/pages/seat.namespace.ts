import type { Namespace } from "../namespace.page-type.ts"

export const seat = {
  id: "01a0797a-9a06-74a3-9d34-57124a4d5b45",
  pageTypeSlug: "namespace",
  slug: "seat",
  definition: "the seats akasha carries and what runs them",
  partSlugs: [
    "namespace/seat-supervisor",
    "command/seat-resume",
    "command/seat-reset",
    "command/seat-start",
    "command/seat-messaged",
    "command/seat-refresh-settings",
    "command/seat-transcripts",
  ],
} as const satisfies Namespace
