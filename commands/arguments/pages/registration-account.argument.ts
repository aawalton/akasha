import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const registrationAccount = {
  id: "01a094fd-9360-7f92-aee0-ead4740b7cc1",
  type: "argument",
  slug: "registration-account",
  said: "--account",
  takes: "the registration account the boot environment carries",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
