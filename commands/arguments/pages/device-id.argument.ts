import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const deviceId = {
  id: "01a094c0-6f94-7138-928e-ec6863b9e4c1",
  type: "argument",
  slug: "device-id",
  said: "--device-id",
  takes: "the Spotify device played on, rather than the active one",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
