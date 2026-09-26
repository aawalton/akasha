import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const knower = {
  id: "01a0def0-8330-736b-a40c-174a070316a8",
  type: "page-type/argument",
  slug: "knower",
  said: "--knower",
  takes: "a character who comes to know a fact, said again for each",
  value: "text",
  placeholder: "page",
} as const satisfies Argument
