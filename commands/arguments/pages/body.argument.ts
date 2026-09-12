import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const body = {
  id: "01a094ee-f2bf-762f-b826-3f394c8693fe",
  type: "argument",
  slug: "body",
  said: "--body",
  takes: "the plain-text body",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
