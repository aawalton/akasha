import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const udid = {
  id: "01a094bc-1081-7539-b4b3-483d964f821d",
  type: "page-type/argument",
  slug: "udid",
  said: "--udid",
  takes: "the simulator driven, the session's own or the first booted where none is said",
  value: "text",
  placeholder: "udid",
} as const satisfies Argument
