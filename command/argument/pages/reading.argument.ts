import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const reading = {
  id: "01a0c5ff-1a00-7b5d-8d89-ce1a0f6f0e29",
  type: "page-type/argument",
  slug: "reading",
  said: "--reading",
  takes: "what the mechanic is handed, written as JSON",
  value: "text",
  placeholder: "json",
} as const satisfies Argument
