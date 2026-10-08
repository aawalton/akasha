import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const callbackUrl = {
  id: "01a094db-c691-78ab-be22-5abde9688eeb",
  type: "page-type/argument",
  slug: "callback-url",
  said: "--callback-url",
  takes: "the callback URL pasted from the browser, where the loopback listener cannot be reached",
  value: "text",
  placeholder: "url",
  createdAt: "2026-09-12T09:03:46.321Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
