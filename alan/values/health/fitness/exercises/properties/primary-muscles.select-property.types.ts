import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { primaryMuscles } from "./primary-muscles.select-property.ts"

export type PrimaryMuscles = List<(typeof primaryMuscles.values)[number]>
