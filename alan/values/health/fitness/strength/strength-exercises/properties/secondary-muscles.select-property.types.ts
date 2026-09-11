import type { secondaryMuscles } from "akasha/alan/values/health/fitness/strength/strength-exercises/properties/secondary-muscles.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type SecondaryMuscles = List<(typeof secondaryMuscles.values)[number]>
