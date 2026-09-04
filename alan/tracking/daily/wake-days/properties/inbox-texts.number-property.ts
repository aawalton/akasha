import type { NumberProperty } from "@akasha/pages-system/number-property"

export type InboxTexts = number

export const inboxTexts = {
  id: "01a05fd8-c30f-7f9d-9c0a-a76cb2d43438",
  pageTypeSlug: "number-property",
  slug: "inbox-texts",
  propertySlug: "inbox-texts",
  definition: "the texts left unanswered at the end of a day",
  max: null,
} as const satisfies NumberProperty
