import type { connectionActivityModality } from "akasha/alan/relating/connection-activities/properties/connection-activity-modality.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type ConnectionActivityModality = List<(typeof connectionActivityModality.values)[number]>
