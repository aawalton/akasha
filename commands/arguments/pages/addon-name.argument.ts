import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const addonName = {
  id: "01a094c8-7fcd-791f-91d7-b42fd00d4f12",
  type: "argument",
  slug: "addon-name",
  said: "--addon-name",
  takes: "the name resolved: a canonical name, a flat directory leaf or a nested parent domain",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
