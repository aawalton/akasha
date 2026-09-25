import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const wording = {
  id: "01a0d9ad-2987-7831-b561-7b52cefbeed0",
  type: "page-type/argument",
  slug: "wording",
  said: "--wording",
  takes: "a phrase the grammar parses",
  value: "text",
  placeholder: "wording",
} as const satisfies Argument
