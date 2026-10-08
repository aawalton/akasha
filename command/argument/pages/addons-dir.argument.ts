import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const addonsDir = {
  id: "01a094a2-dcee-75d8-8610-2fb1b35cc8d9",
  type: "page-type/argument",
  slug: "addons-dir",
  said: "--addons-dir",
  takes: "the game's addon directory read and written",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:01:36.494Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
