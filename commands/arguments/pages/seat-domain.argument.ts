import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const seatDomain = {
  id: "01a094e7-3ac9-7a8b-846c-76e703cc0f1f",
  type: "argument",
  slug: "seat-domain",
  said: "--domain",
  takes: "where this seat works, outranking the persona's own domain",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
