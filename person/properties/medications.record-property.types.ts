import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { MedicationDoseMg } from "akasha/person/properties/medication-dose-mg.number-property.types.ts"
import type { MedicationDosesPerWeek } from "akasha/person/properties/medication-doses-per-week.number-property.types.ts"
import type { MedicationName } from "akasha/person/properties/medication-name.text-property.types.ts"
import type { MedicationNote } from "akasha/person/properties/medication-note.text-property.types.ts"

export type Medications = List<{
  name: MedicationName
  doseMg: MedicationDoseMg
  dosesPerWeek: MedicationDosesPerWeek
  note?: MedicationNote
}>
