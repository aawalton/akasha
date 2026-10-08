import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const emailAttachment = {
  id: "01a07bbf-258e-75b2-82ad-d3ff78cae0ca",
  type: "page-type/namespace",
  slug: "email-attachment",
  definition: "a file carried by a message",
  parts: ["command/email-attachment-list", "command/email-attachment-show"],
  name: "attachment",
  createdAt: "2026-09-07T12:01:59.694Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
