import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const bodyFile = {
  id: "01a094e3-5fae-7680-82b6-55f4d63533b2",
  type: "page-type/argument",
  slug: "body-file",
  said: "--body-file",
  takes: "the file the body is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:12:04.270Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
