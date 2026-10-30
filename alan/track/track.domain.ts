import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const track = {
  id: "01a062dc-1b7f-7bbe-a348-b71f1bbf4c9c",
  type: "page-type/domain",
  slug: "track",
  definition: "how Alan measures his life",
  parts: [
    "domain/track-daily",
    "module/track-landing",
    "page-type/food-entry",
    "page-type/rejection",
    "page-type/session-activity",
    "page-type/to-do",
  ],
  createdAt: "2026-09-02T16:03:07.263Z",
  updatedAt: "2026-10-30T17:06:29.031Z",
} as const satisfies Domain
