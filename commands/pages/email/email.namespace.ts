import type { Namespace } from "../../../command-system/namespaces/namespace.page-type.ts"

export const email = {
  id: "01a07bbf-258e-70c9-bb9b-25cb2db9ff7d",
  pageTypeSlug: "namespace",
  slug: "email",
  definition: "the mail Alan sends and receives",
  partSlugs: [
    "namespace/email-attachments",
    "command/email-auth-login",
    "namespace/email-drafts",
    "namespace/email-messages",
    "command/email-unsubscribe",
  ],
} as const satisfies Namespace
