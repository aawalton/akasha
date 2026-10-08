import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const communityAddon = {
  id: "01a094c8-dfc5-7d7f-abf8-6ee4e76c33a4",
  type: "page-type/argument",
  slug: "community-addon",
  said: "--community-addon",
  takes: "the community addon's name, or one of the folder names it installs",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:43:07.589Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
