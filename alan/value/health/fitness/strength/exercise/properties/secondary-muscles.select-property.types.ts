import type { secondaryMuscles } from "akasha/alan/value/health/fitness/strength/exercise/properties/secondary-muscles.select-property.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type SecondaryMuscles = List<(typeof secondaryMuscles.values)[number]>
