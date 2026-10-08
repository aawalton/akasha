import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const questTracePath = {
  id: "01a094db-86da-7d18-8462-06319328edfa",
  type: "page-type/argument",
  slug: "quest-trace-path",
  said: "--file-path",
  takes: "the saved-variables file a world add-on trace is read from",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:03:30.010Z",
  updatedAt: "2026-10-08T17:10:57.884Z",
} as const satisfies Argument
