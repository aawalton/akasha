import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type TerminalAt = string

export const terminalAt = {
  id: "01a054d8-1d39-7aa1-8247-16753be2da34",
  pageTypeSlug: "instant-property",
  slug: "terminal-at",
  propertySlug: "terminal-at",
  definition: "when the account's refresh token was last found dead",
} as const satisfies InstantProperty
