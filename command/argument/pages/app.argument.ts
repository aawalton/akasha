import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const app = {
  id: "01a094b3-2dc9-740a-a24b-dbe3f4f8be45",
  type: "page-type/argument",
  slug: "app",
  said: "--app",
  takes: "the app acted on, the default app where none is said",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T08:19:25.769Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
