import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const email = {
  id: "01a07bbf-258e-70c9-bb9b-25cb2db9ff7d",
  type: "namespace",
  slug: "email",
  definition: "the mail Alan sends and receives",
  parts: [
    "command/email-unsubscribe",
    "namespace/email-attachment",
    "namespace/email-draft",
    "namespace/email-message",
  ],
  name: "email",
} as const satisfies Namespace
