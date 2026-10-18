import type { restDays } from "akasha/alan/harness/readout/properties/rest-days.select-property.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type RestDays = List<(typeof restDays.values)[number]>
