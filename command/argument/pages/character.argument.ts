import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const character = {
  id: "01a0deca-7611-757a-a48d-16df0710fba4",
  type: "page-type/argument",
  slug: "character",
  said: "--character",
  takes: "a character present in the turn, named by its address",
  value: "text",
  placeholder: "address",
} as const satisfies Argument
