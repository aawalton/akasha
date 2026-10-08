import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seatDomain = {
  id: "01a094e7-3ac9-7a8b-846c-76e703cc0f1f",
  type: "page-type/argument",
  slug: "seat-domain",
  said: "--domain",
  takes: "where this seat works, outranking the persona's own domain",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:16:16.969Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
