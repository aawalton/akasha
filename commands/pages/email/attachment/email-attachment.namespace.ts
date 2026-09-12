import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const emailAttachment = {
  id: "01a07bbf-258e-75b2-82ad-d3ff78cae0ca",
  type: "namespace",
  slug: "email-attachment",
  definition: "a file carried by a message",
  parts: ["command/email-attachment-list", "command/email-attachment-show"],
  name: "attachment",
} as const satisfies Namespace
