import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const loraPaths = {
  id: "01a094d8-ef44-7277-a6d0-383be90fed6f",
  type: "argument",
  slug: "lora-paths",
  said: "--lora-paths",
  takes: "the one checkpoint the render is measured against",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
