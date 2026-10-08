import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const sms = {
  id: "01a07bcb-0b96-7bdf-bd21-0e3e7f8998c0",
  type: "page-type/namespace",
  slug: "sms",
  definition: "a text message to or from a phone",
  parts: ["command/sms-acting-account", "command/sms-send"],
  name: "sms",
  createdAt: "2026-09-07T12:14:59.478Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
