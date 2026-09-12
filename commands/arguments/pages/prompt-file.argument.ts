import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const promptFile = {
  id: "01a094d8-1ebc-7412-b4d3-ea11fd0ef809",
  type: "argument",
  slug: "prompt-file",
  said: "--prompt-file",
  takes: "the file the prompt is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
