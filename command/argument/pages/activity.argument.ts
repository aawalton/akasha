import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const activity = {
  id: "01a183ee-da95-75c9-bf46-364f5b7f6d50",
  type: "page-type/argument",
  slug: "activity",
  said: "--activity",
  takes: "the risk activity to price, named by its slug",
  value: "text",
  placeholder: "activity",
  createdAt: "2026-10-28T19:13:51.253Z",
  updatedAt: "2026-10-28T19:13:51.253Z",
} as const satisfies Argument
