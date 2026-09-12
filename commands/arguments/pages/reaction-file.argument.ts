import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const reactionFile = {
  id: "01a094e5-aa06-7d5d-bda7-1f039460309c",
  type: "argument",
  slug: "reaction-file",
  said: "--reaction-file",
  takes: "the file the reaction is read from",
  value: "path",
  placeholder: "file",
} as const satisfies Argument
