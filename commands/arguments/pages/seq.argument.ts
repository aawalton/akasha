import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const seq = {
  id: "01a094b3-d26d-719d-9179-d2f9d77c5147",
  type: "argument",
  slug: "seq",
  said: "--seq",
  takes: "the branch sequence number naming the worktree, the state file and the log",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
