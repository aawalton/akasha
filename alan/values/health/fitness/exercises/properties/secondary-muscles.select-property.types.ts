import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { secondaryMuscles } from "./secondary-muscles.select-property.ts"

export type SecondaryMuscles = List<(typeof secondaryMuscles.values)[number]>
