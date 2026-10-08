import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const insights = {
  id: "01a094f0-1f66-7a58-aa01-b25bd3b478d9",
  type: "page-type/argument",
  slug: "insights",
  said: "--insights",
  takes: "what Alan found in a song",
  value: "text",
  placeholder: "md",
  createdAt: "2026-09-12T09:25:59.782Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
