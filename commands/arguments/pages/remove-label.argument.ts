import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const removeLabel = {
  id: "01a094de-f31a-7dfe-9c1a-412a0e83423e",
  type: "argument",
  slug: "remove-label",
  said: "--remove",
  takes: "a label id to take off it, said again for each",
  value: "text",
  placeholder: "label-id",
  repeats: true,
} as const satisfies Argument
