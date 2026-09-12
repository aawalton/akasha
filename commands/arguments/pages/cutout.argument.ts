import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const cutout = {
  id: "01a0950c-ac25-7b45-ae3c-23f727997342",
  type: "argument",
  slug: "cutout",
  said: "--cutout",
  takes: "also write the foreground on transparency",
  value: "none",
} as const satisfies Argument
