import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sshKey = {
  id: "01a094e9-3ded-7a54-95f3-aab5f7e53c03",
  type: "page-type/argument",
  slug: "ssh-key",
  said: "--ssh-key",
  takes: "the private key that user is reached with",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:18:28.845Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
