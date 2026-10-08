import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const memoryFile = {
  id: "01a10289-e311-75a0-a3f6-23be56a9a8ec",
  type: "page-type/argument",
  slug: "memory-file",
  said: "--memory-file",
  takes: "the file the memory recorder's memories are read from, one json memory to a line",
  value: "path",
  placeholder: "path",
  createdAt: "2026-10-03T16:12:33.425Z",
  updatedAt: "2026-10-03T16:13:22.000Z",
} as const satisfies Argument
