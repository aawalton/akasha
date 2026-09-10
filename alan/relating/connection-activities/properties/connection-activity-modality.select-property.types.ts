import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { connectionActivityModality } from "./connection-activity-modality.select-property.ts"

export type ConnectionActivityModality = List<(typeof connectionActivityModality.values)[number]>
