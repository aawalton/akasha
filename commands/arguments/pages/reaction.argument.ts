import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const reaction = {
  id: "01a094ef-4167-7524-963f-db43ef2f1b87",
  type: "argument",
  slug: "reaction",
  said: "--reaction",
  takes: "what Alan said about an artist",
  value: "text",
  placeholder: "md",
} as const satisfies Argument
