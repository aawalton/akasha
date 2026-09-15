import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const at = {
  id: "01a094b2-c67e-7881-8c71-fafccbd59215",
  type: "page-type/argument",
  slug: "at",
  said: "--at",
  takes: "the wall time the act is made at",
  value: "text",
  placeholder: "time",
} as const satisfies Argument
