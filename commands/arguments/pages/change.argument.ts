import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const change = {
  id: "01a094f1-9aec-7414-9a25-b70bffad3f59",
  type: "argument",
  slug: "change",
  said: "--change",
  takes: "the act over the edits kept that this run answers",
  value: "text",
  placeholder: "change",
} as const satisfies Argument
