import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const app = {
  id: "01a094b3-2dc9-740a-a24b-dbe3f4f8be45",
  type: "page-type/argument",
  slug: "app",
  said: "--app",
  takes: "the app acted on, the default app where none is said",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
