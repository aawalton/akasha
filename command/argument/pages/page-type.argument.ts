import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const pageType = {
  id: "01a094cb-b27d-7e31-8801-889570dada1c",
  type: "page-type/argument",
  slug: "page-type",
  said: "--page-type",
  takes: "the page type the answer is said about",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T08:46:12.605Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
