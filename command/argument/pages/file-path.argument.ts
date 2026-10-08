import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const filePath = {
  id: "01a094ba-2be7-705c-a07a-55efaeb8526f",
  type: "page-type/argument",
  slug: "file-path",
  said: "--file-path",
  takes: "a file in the repository, said from the repository root",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:27:04.039Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
