import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const refText = {
  id: "01a094ea-4eec-77c6-a6bb-26648e06e57a",
  type: "argument",
  slug: "ref-text",
  said: "--ref-text",
  takes: "what the reference clip says",
  value: "text",
  placeholder: "transcript",
} as const satisfies Argument
