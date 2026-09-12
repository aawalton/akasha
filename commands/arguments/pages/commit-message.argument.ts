import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const commitMessage = {
  id: "01a094e4-0037-7a96-9c88-5894ceea3151",
  type: "argument",
  slug: "commit-message",
  said: "--message",
  takes: "what the commit is for",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
