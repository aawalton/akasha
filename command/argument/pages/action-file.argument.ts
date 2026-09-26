import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const actionFile = {
  id: "01a0def9-1802-7ed3-9372-a671586f187d",
  type: "page-type/argument",
  slug: "action-file",
  said: "--action-file",
  takes: "the file a turn's action is read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
