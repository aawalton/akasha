import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const attachmentId = {
  id: "01a094e7-2e6f-72fe-bb36-97a157784a71",
  type: "argument",
  slug: "attachment-id",
  said: "--attachment-id",
  takes: "which attachment to fetch, said as `email attachment list` names it",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
