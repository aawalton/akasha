import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const snapshot = {
  id: "01a094cb-f4f8-7109-9fa0-5f342220a31f",
  type: "argument",
  slug: "snapshot",
  said: "--snapshot",
  takes: "the snapshot read, by its page id or by its slug",
  value: "text",
  placeholder: "snapshot",
} as const satisfies Argument
