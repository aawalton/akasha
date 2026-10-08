import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const attachmentId = {
  id: "01a094e7-2e6f-72fe-bb36-97a157784a71",
  type: "page-type/argument",
  slug: "attachment-id",
  said: "--attachment-id",
  takes: "which attachment to fetch, said as `email attachment list` names it",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T09:16:13.807Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
