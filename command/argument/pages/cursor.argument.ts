import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const cursor = {
  id: "01a094ec-a64a-74ff-9210-971931060f39",
  type: "page-type/argument",
  slug: "cursor",
  said: "--cursor",
  takes: "the cursor a previous answer stated, reaching the page before it",
  value: "text",
  placeholder: "b64",
  createdAt: "2026-09-12T09:22:12.170Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
