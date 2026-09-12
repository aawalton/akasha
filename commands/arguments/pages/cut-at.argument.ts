import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const cutAt = {
  id: "01a094c8-b5af-7d33-a6ee-de87ed6edf18",
  type: "argument",
  slug: "cut-at",
  said: "--cut-at",
  takes: "when the cut was taken, this moment where none is said",
  value: "text",
  placeholder: "instant",
} as const satisfies Argument
