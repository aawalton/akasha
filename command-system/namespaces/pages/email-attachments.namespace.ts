import type { Namespace } from "../namespace.page-type.ts"

export const emailAttachments = {
  id: "01a07bbf-258e-75b2-82ad-d3ff78cae0ca",
  pageTypeSlug: "namespace",
  slug: "email-attachments",
  definition: "a file carried by a message",
  partSlugs: ["command/email-attachments-get", "command/email-attachments-list"],
} as const satisfies Namespace
