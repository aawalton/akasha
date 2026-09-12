import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const signInPath = {
  id: "01a094c3-0b0d-7d4c-b783-700799c5a7f4",
  type: "argument",
  slug: "sign-in-path",
  said: "--sign-in-path",
  takes: "the path the sign-in form is at, `/sign-in` where none is said",
  value: "text",
  placeholder: "path",
} as const satisfies Argument
