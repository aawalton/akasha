import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const promptFile = {
  id: "01a094d8-1ebc-7412-b4d3-ea11fd0ef809",
  type: "page-type/argument",
  slug: "prompt-file",
  said: "--prompt-file",
  takes: "the file the prompt is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:59:46.748Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
