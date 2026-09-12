import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const hydrationSelector = {
  id: "01a094cb-db8d-732a-abbc-570ad238d494",
  type: "argument",
  slug: "hydration-selector",
  said: "--hydration-selector",
  takes: "an element that is there once the page has hydrated",
  value: "text",
  placeholder: "sel",
} as const satisfies Argument
