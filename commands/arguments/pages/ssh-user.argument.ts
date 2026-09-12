import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const sshUser = {
  id: "01a094e8-82d4-7db3-983a-75691f5b2e04",
  type: "argument",
  slug: "ssh-user",
  said: "--ssh-user",
  takes: "the user to reach the host as, holding sudo without a password",
  value: "text",
  placeholder: "user",
} as const satisfies Argument
