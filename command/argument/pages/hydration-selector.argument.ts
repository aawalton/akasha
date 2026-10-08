import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const hydrationSelector = {
  id: "01a094cb-db8d-732a-abbc-570ad238d494",
  type: "page-type/argument",
  slug: "hydration-selector",
  said: "--hydration-selector",
  takes: "an element that is there once the page has hydrated",
  value: "text",
  placeholder: "sel",
  createdAt: "2026-09-12T08:46:23.117Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
