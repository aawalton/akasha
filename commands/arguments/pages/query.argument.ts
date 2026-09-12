import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const query = {
  id: "01a094c1-688c-7f20-a6f3-46b64ad1b922",
  type: "argument",
  slug: "query",
  said: "--query",
  takes: "the track looked for",
  value: "text",
  placeholder: "query",
} as const satisfies Argument
