import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const communityAddon = {
  id: "01a094c8-dfc5-7d7f-abf8-6ee4e76c33a4",
  type: "argument",
  slug: "community-addon",
  said: "--community-addon",
  takes: "the community addon's name, or one of the folder names it installs",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
