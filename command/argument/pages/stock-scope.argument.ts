import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stockScope = {
  id: "01a094b9-333e-781a-bebb-dcf3044d0e7a",
  type: "page-type/argument",
  slug: "stock-scope",
  said: "--stock-scope",
  takes: "whether stocking counts one character or every character",
  value: "text",
  placeholder: "scope",
} as const satisfies Argument
