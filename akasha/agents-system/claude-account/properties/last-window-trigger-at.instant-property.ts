import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type LastWindowTriggerAt = string

export const lastWindowTriggerAt = {
  id: "01a054d8-1d39-7d4f-8f23-88dd28e6aee3",
  pageTypeSlug: "instant-property",
  slug: "last-window-trigger-at",
  propertySlug: "last-window-trigger-at",
  definition: "when an allowance window was last opened by a call made to open it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A window opened by ordinary work is not marked here.",
    },
  ],
} as const satisfies InstantProperty
