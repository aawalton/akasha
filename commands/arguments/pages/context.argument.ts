import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const context = {
  id: "01a094d2-f6ce-70e8-9457-4e23ee45dc87",
  type: "argument",
  slug: "context",
  said: "--context",
  takes: "the clip the conditioning window is taken from",
  value: "path",
  placeholder: "mp4",
} as const satisfies Argument
