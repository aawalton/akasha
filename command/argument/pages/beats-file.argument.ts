import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const beatsFile = {
  id: "01a0deca-7610-77c6-a20b-a876df8b873c",
  type: "page-type/argument",
  slug: "beats-file",
  said: "--beats-file",
  takes: "the file a turn's beats are read from, one beat to a line",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-26T17:36:45.584Z",
  updatedAt: "2026-09-26T17:36:57.000Z",
} as const satisfies Argument
