import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const logDir = {
  id: "01a094cd-d4fe-7ea2-af08-7de1795bb123",
  type: "argument",
  slug: "log-dir",
  said: "--log-dir",
  takes: "the directory the watcher's logs are read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
