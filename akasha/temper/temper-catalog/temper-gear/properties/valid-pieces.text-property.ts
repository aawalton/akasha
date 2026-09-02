import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValidPiece = string
export type ValidPieces = List<ValidPiece>

export const validPieces = {
  id: "01a05fd1-d43f-7be1-a074-25f62cd6a7ee",
  pageTypeSlug: "text-property",
  slug: "valid-pieces",
  propertySlug: "valid",
  definition: "the pieces a set is made in",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    { invariantKind: "departure", statement: "One list holds every piece a set is made in." },
    { invariantKind: "departure", statement: "A star covers every piece the game offers." },
  ],
} as const satisfies TextProperty
