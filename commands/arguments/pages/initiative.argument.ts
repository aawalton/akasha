import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const initiative = {
  id: "01a094d1-4442-7787-9a41-90ddbf86c61e",
  type: "argument",
  slug: "initiative",
  said: "--initiative",
  takes: "an initiative, named by the slug that initiative declares",
  value: "text",
  placeholder: "initiative",
} as const satisfies Argument
