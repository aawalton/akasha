import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const terminalAlertedAt = {
  id: "01a054d8-1d39-7a31-97f6-b3b598ca6af5",
  type: "page-type/instant-property",
  slug: "terminal-alerted-at",
  propertySlug: "terminal-alerted-at",
  definition: "when the dead refresh token last drew an alert",
  types: "ts",
} as const satisfies InstantProperty
