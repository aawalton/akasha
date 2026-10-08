import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const category = {
  id: "01a094bc-be92-7c1f-8454-61c09d7caa68",
  type: "page-type/argument",
  slug: "category",
  said: "--category",
  takes: "the category of items the rule reaches",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T08:29:52.658Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
