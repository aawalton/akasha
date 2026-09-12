import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const sms = {
  id: "01a07bcb-0b96-7bdf-bd21-0e3e7f8998c0",
  type: "namespace",
  slug: "sms",
  definition: "a text message to or from a phone",
  parts: ["command/sms-acting-account", "command/sms-send"],
  name: "sms",
} as const satisfies Namespace
