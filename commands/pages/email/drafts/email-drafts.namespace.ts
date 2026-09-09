import type { Namespace } from "../../../namespaces/namespace.page-type.ts"

export const emailDrafts = {
  id: "01a07bbf-258e-7659-aa34-83d6be87a5d9",
  pageTypeSlug: "namespace",
  slug: "email-drafts",
  definition: "a message written and not sent",
  parts: ["command/email-drafts-create", "command/email-drafts-list"],
} as const satisfies Namespace
