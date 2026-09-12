import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const addLabel = {
  id: "01a094de-95e7-7ee2-bd58-202deec13cd4",
  type: "argument",
  slug: "add-label",
  said: "--add",
  takes: "a label id to put on it, said again for each",
  value: "text",
  placeholder: "label-id",
} as const satisfies Argument
