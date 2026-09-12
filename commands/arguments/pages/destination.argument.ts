import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const destination = {
  id: "01a094b6-e847-7975-a992-89143e28f753",
  type: "argument",
  slug: "destination",
  said: "--destination",
  takes: "where the item goes, for the actions that move it",
  value: "text",
  placeholder: "destination",
} as const satisfies Argument
