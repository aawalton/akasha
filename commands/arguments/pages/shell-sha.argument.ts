import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const shellSha = {
  id: "01a094c8-8da6-7f0c-8b6a-c33ad0740c67",
  type: "argument",
  slug: "shell-sha",
  said: "--shell-sha",
  takes: "the shell-repo commit the cut was taken at, where it named one",
  value: "text",
  placeholder: "sha",
} as const satisfies Argument
