import type { focusTags } from "akasha/alan/value/health/fitness/coaching/note/properties/focus-tags.select-property.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type FocusTags = List<(typeof focusTags.values)[number]>
