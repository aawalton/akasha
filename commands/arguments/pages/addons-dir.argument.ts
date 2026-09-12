import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const addonsDir = {
  id: "01a094a2-dcee-75d8-8610-2fb1b35cc8d9",
  type: "argument",
  slug: "addons-dir",
  said: "--addons-dir",
  takes: "the game's addon directory read and written",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
