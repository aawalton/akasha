import type { primaryMuscles } from "akasha/alan/values/health/fitness/exercises/properties/primary-muscles.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type PrimaryMuscles = List<(typeof primaryMuscles.values)[number]>
