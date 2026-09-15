import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const onto = {
  id: "01a094d3-925c-79a2-b210-53d1739f1f3b",
  type: "page-type/argument",
  slug: "onto",
  said: "--onto",
  takes: "the statement the intent it is moved onto states",
  value: "text",
  placeholder: "onto",
} as const satisfies Argument
