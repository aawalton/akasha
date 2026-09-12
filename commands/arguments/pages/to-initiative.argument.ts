import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toInitiative = {
  id: "01a094d3-2ba3-728c-a3f2-2f70b7d47c35",
  type: "argument",
  slug: "to-initiative",
  said: "--to",
  takes: "the initiative taking the intent",
  value: "text",
  placeholder: "to",
} as const satisfies Argument
