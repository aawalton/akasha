import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const sshKey = {
  id: "01a094e9-3ded-7a54-95f3-aab5f7e53c03",
  type: "argument",
  slug: "ssh-key",
  said: "--ssh-key",
  takes: "the private key that user is reached with",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
