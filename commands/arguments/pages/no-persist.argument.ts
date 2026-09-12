import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const noPersist = {
  id: "01a094b6-9a6b-7f96-b85e-650a0457eed1",
  type: "argument",
  slug: "no-persist",
  said: "--no-persist",
  takes: "leave what was written where it is and file no page for it",
  value: "none",
} as const satisfies Argument
