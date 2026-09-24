import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const story = {
  id: "01a0d4e4-451d-7e0d-85f8-42f23ef5d155",
  type: "page-type/argument",
  slug: "story",
  said: "--story",
  takes: "the story being told",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
