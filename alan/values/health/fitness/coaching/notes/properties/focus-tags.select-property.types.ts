import type { focusTags } from "akasha/alan/values/health/fitness/coaching/notes/properties/focus-tags.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type FocusTags = List<(typeof focusTags.values)[number]>
