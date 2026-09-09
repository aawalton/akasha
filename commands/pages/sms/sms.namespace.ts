import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const sms = {
  id: "01a07bcb-0b96-7bdf-bd21-0e3e7f8998c0",
  pageTypeSlug: "namespace",
  slug: "sms",
  definition: "a text message to or from a phone",
  parts: ["command/sms-acting-account", "command/sms-send"],
} as const satisfies Namespace
