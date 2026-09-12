import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const emailDraft = {
  id: "01a07bbf-258e-7659-aa34-83d6be87a5d9",
  type: "namespace",
  slug: "email-draft",
  definition: "a message written and not sent",
  parts: ["command/email-draft-create", "command/email-draft-list"],
  name: "draft",
} as const satisfies Namespace
