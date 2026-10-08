import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const registrationAccount = {
  id: "01a094fd-9360-7f92-aee0-ead4740b7cc1",
  type: "page-type/argument",
  slug: "registration-account",
  said: "--account",
  takes: "the registration account the boot environment carries",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T09:40:41.440Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
