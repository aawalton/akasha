import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const remove = {
  id: "01a094ed-cfd7-72bf-b667-e9c1230a7a65",
  type: "page-type/argument",
  slug: "remove",
  said: "--remove",
  takes: "take away the pages this run judged stale",
  value: "none",
  createdAt: "2026-09-12T09:23:28.343Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
