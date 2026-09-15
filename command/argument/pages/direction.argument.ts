import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const direction = {
  id: "01a094d3-0a13-79d6-bffe-f6fc14aad95b",
  type: "page-type/argument",
  slug: "direction",
  said: "--direction",
  takes: "whether the fresh frames land after the clip's end or before its start",
  value: "text",
  placeholder: "forward|back",
} as const satisfies Argument
