import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const deviceId = {
  id: "01a094c0-6f94-7138-928e-ec6863b9e4c1",
  type: "page-type/argument",
  slug: "device-id",
  said: "--device-id",
  takes: "the Spotify device played on, rather than the active one",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T08:33:54.580Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
