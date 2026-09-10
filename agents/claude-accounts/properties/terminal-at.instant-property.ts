import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type TerminalAt = string

export const terminalAt = {
  id: "01a054d8-1d39-7aa1-8247-16753be2da34",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "terminal-at",
  propertySlug: "terminal-at",
  definition: "when the account's refresh token was last found dead",
} as const satisfies InstantProperty
