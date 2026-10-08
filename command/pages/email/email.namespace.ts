import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const email = {
  id: "01a07bbf-258e-70c9-bb9b-25cb2db9ff7d",
  type: "page-type/namespace",
  slug: "email",
  definition: "the mail Alan sends and receives",
  parts: [
    "command/email-unsubscribe",
    "namespace/email-attachment",
    "namespace/email-draft",
    "namespace/email-message",
  ],
  name: "email",
  createdAt: "2026-09-07T12:01:59.694Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
