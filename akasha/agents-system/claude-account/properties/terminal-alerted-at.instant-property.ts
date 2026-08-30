import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type TerminalAlertedAt = string

export const terminalAlertedAt = {
  id: "01a054d8-1d39-7a31-97f6-b3b598ca6af5",
  pageTypeSlug: "instant-property",
  slug: "terminal-alerted-at",
  propertySlug: "terminal-alerted-at",
  definition: "when the dead refresh token was last alerted on",
} as const satisfies InstantProperty
