import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const negativePromptFile = {
  id: "01a094da-6665-7585-a256-c0cbd4471963",
  type: "argument",
  slug: "negative-prompt-file",
  said: "--negative-prompt-file",
  takes: "the file the negative prompt is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
