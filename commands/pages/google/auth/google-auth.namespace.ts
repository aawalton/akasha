import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const googleAuth = {
  id: "01a08cd7-19ca-7dd4-96ae-8189c3655a3c",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "google-auth",
  definition: "the consent Google is reached as Alan on",
  parts: ["command/google-auth-login"],
} as const satisfies Namespace
