import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const outdated = {
  id: "01a094ce-e05d-7620-a728-702cafe320ca",
  type: "page-type/argument",
  slug: "outdated",
  said: "--outdated",
  takes: "name only the addons an update is published for",
  value: "none",
} as const satisfies Argument
