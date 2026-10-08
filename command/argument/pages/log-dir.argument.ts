import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const logDir = {
  id: "01a094cd-d4fe-7ea2-af08-7de1795bb123",
  type: "page-type/argument",
  slug: "log-dir",
  said: "--log-dir",
  takes: "the directory the watcher's logs are read from",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:48:32.510Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
