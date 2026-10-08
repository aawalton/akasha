import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const emailDraft = {
  id: "01a07bbf-258e-7659-aa34-83d6be87a5d9",
  type: "page-type/namespace",
  slug: "email-draft",
  definition: "a message written and not sent",
  parts: ["command/email-draft-create", "command/email-draft-list"],
  name: "draft",
  createdAt: "2026-09-07T12:01:59.694Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
