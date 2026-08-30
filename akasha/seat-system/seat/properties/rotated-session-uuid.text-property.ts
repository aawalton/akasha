import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type RotatedSessionUuid = string

export const rotatedSessionUuid = {
  id: "01a05430-9fa2-7a87-8969-26908fd82401",
  pageTypeSlug: "text-property",
  slug: "rotated-session-uuid",
  propertySlug: "rotated-session-uuid",
  definition: "the session a seat was cleared into, before it is bound to it",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This stands between a clear and the binding that takes it.",
    },
    {
      invariantKind: "departure",
      statement: "This goes once taken.",
    },
  ],
} as const satisfies TextProperty
