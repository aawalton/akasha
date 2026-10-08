import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const personalConnectionsFile = {
  id: "01a094e5-bce6-7760-8053-279c4f482aae",
  type: "page-type/argument",
  slug: "personal-connections-file",
  said: "--personal-connections-file",
  takes: "the file the personal connections are read from",
  value: "path",
  placeholder: "file",
  createdAt: "2026-09-12T09:14:39.206Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
