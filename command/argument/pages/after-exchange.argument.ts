import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const afterExchange = {
  id: "01a0c977-c8fc-770a-8ed2-83e76225359d",
  type: "page-type/argument",
  slug: "after-exchange",
  said: "--after",
  takes: "the uuid of the last exchange already taken",
  value: "text",
  placeholder: "uuid",
} as const satisfies Argument
