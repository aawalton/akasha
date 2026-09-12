import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const insights = {
  id: "01a094f0-1f66-7a58-aa01-b25bd3b478d9",
  type: "argument",
  slug: "insights",
  said: "--insights",
  takes: "what Alan found in a song",
  value: "text",
  placeholder: "md",
} as const satisfies Argument
