import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sshUser = {
  id: "01a094e8-82d4-7db3-983a-75691f5b2e04",
  type: "page-type/argument",
  slug: "ssh-user",
  said: "--ssh-user",
  takes: "the user to reach the host as, holding sudo without a password",
  value: "text",
  placeholder: "user",
  createdAt: "2026-09-12T09:17:40.948Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
