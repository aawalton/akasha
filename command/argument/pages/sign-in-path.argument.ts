import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const signInPath = {
  id: "01a094c3-0b0d-7d4c-b783-700799c5a7f4",
  type: "page-type/argument",
  slug: "sign-in-path",
  said: "--sign-in-path",
  takes: "the path the sign-in form is at, `/sign-in` where none is said",
  value: "text",
  placeholder: "path",
  default: "/sign-in",
  createdAt: "2026-09-12T08:36:45.453Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
