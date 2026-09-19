import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const commit = {
  id: "01a0b711-554f-7d1c-8d3f-9ebe0ddf0c1b",
  type: "page-type/argument",
  slug: "commit",
  said: "--commit",
  takes: "the commit whose tree a dev server runs",
  value: "text",
  placeholder: "commit",
} as const satisfies Argument
