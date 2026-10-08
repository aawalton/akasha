import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const destination = {
  id: "01a094b6-e847-7975-a992-89143e28f753",
  type: "page-type/argument",
  slug: "destination",
  said: "--destination",
  takes: "where the item goes, for the actions that move it",
  value: "text",
  placeholder: "destination",
  createdAt: "2026-09-12T08:23:30.119Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
