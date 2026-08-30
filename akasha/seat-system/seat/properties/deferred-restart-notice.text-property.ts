import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type DeferredRestartNotice = string

export const deferredRestartNotice = {
  id: "01a05428-ff6b-7339-813b-563b26f966b1",
  pageTypeSlug: "text-property",
  slug: "deferred-restart-notice",
  propertySlug: "deferred-restart-notice",
  definition: "what a seat is owed on its next turn, held while it has none",
  max: 1000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "Nothing claims a notice, so notices merge here and stand until the seat goes.",
    },
    {
      invariantKind: "gap",
      statement: "A notice is claimed once, and claiming it clears it.",
    },
  ],
} as const satisfies TextProperty
