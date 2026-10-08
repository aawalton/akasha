import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const shuffleState = {
  id: "01a0a027-e111-7251-a3b3-9db653ec1ed9",
  type: "page-type/argument",
  slug: "shuffle-state",
  said: "--shuffle",
  takes: "whether a device draws its tracks at random or in the order they are queued",
  value: "text",
  placeholder: "on|off",
  createdAt: "2026-09-14T13:42:43.217Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
