import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const callbackUrl = {
  id: "01a094db-c691-78ab-be22-5abde9688eeb",
  type: "argument",
  slug: "callback-url",
  said: "--callback-url",
  takes: "the callback URL pasted from the browser, where the loopback listener cannot be reached",
  value: "text",
  placeholder: "url",
} as const satisfies Argument
