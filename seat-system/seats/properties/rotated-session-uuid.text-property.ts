import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RotatedSessionUuid = string

export const rotatedSessionUuid = {
  id: "01a05430-9fa2-7a87-8969-26908fd82401",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "rotated-session-uuid",
  propertySlug: "rotated-session-uuid",
  definition: "the session a seat was cleared into, before it is bound to it",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This property sits between a clear and the binding that takes this property.",
    },
    {
      invariantKind: "departure",
      statement: "This property goes once taken.",
    },
  ],
} as const satisfies TextProperty
