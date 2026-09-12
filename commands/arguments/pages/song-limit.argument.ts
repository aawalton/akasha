import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const songLimit = {
  id: "01a09507-7a6a-7519-8c5e-7d83d2277e08",
  type: "argument",
  slug: "song-limit",
  said: "--limit",
  takes: "how many songs at most are brought in",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
