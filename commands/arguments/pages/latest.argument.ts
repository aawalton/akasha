import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const latest = {
  id: "01a094cb-9652-7ad7-b3d8-fef368550a94",
  type: "argument",
  slug: "latest",
  said: "--latest",
  takes: "take the newest snapshot on the account rather than one named",
  value: "none",
} as const satisfies Argument
