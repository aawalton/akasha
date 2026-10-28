import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { FamilyCondition } from "akasha/person/properties/family-condition.text-property.types.ts"
import type { FamilyDeathAge } from "akasha/person/properties/family-death-age.number-property.types.ts"
import type { FamilyHistoryNote } from "akasha/person/properties/family-history-note.text-property.types.ts"
import type { FamilyOnsetAge } from "akasha/person/properties/family-onset-age.number-property.types.ts"
import type { FamilyRelative } from "akasha/person/properties/family-relative.select-property.types.ts"

export type FamilyHistory = List<{
  relative: FamilyRelative
  condition?: FamilyCondition
  onsetAge?: FamilyOnsetAge
  deathAge?: FamilyDeathAge
  note?: FamilyHistoryNote
}>
