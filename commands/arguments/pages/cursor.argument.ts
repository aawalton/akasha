import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const cursor = {
  id: "01a094ec-a64a-74ff-9210-971931060f39",
  type: "argument",
  slug: "cursor",
  said: "--cursor",
  takes: "the cursor a previous answer stated, reaching the page before it",
  value: "text",
  placeholder: "b64",
} as const satisfies Argument
