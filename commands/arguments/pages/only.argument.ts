import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const only = {
  id: "01a094cf-3f2f-7c14-982e-4a7e9a6c58c9",
  type: "argument",
  slug: "only",
  said: "--only",
  takes: "restrict the run to one addon folder, said once per folder",
  value: "text",
  placeholder: "dir",
  repeats: true,
} as const satisfies Argument
