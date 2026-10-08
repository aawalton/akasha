import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const surfaceFile = {
  id: "01a094e6-aa2e-7017-a0b7-f2f86e68cfe7",
  type: "page-type/argument",
  slug: "surface-file",
  said: "--surface-file",
  takes: "the file the delivered surface is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:15:39.950Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
