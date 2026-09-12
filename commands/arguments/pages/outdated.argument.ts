import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const outdated = {
  id: "01a094ce-e05d-7620-a728-702cafe320ca",
  type: "argument",
  slug: "outdated",
  said: "--outdated",
  takes: "name only the addons an update is published for",
  value: "none",
} as const satisfies Argument
