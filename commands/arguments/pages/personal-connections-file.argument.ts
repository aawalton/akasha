import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const personalConnectionsFile = {
  id: "01a094e5-bce6-7760-8053-279c4f482aae",
  type: "argument",
  slug: "personal-connections-file",
  said: "--personal-connections-file",
  takes: "the file the personal connections are read from",
  value: "path",
  placeholder: "file",
} as const satisfies Argument
