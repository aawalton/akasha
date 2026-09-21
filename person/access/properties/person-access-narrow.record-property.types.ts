import type { AccessNarrowIs } from "akasha/person/access/properties/access-narrow-is.text-property.types.ts"
import type { AccessNarrowKey } from "akasha/person/access/properties/access-narrow-key.text-property.types.ts"

export type PersonAccessNarrow = {
  key: AccessNarrowKey
  is: AccessNarrowIs
}
