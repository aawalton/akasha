import type { connectionActivityModality } from "akasha/alan/relating/connection-activity/properties/connection-activity-modality.select-property.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ConnectionActivityModality = List<(typeof connectionActivityModality.values)[number]>
