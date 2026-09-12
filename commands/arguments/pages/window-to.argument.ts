import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const windowTo = {
  id: "01a09511-42e2-77ef-a6d5-10ec73869990",
  type: "argument",
  slug: "window-to",
  said: "--to",
  takes: "where the window closes",
  value: "text",
  placeholder: "iso",
} as const satisfies Argument
