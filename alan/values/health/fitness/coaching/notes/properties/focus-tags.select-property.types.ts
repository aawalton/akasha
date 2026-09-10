import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { focusTags } from "./focus-tags.select-property.ts"

export type FocusTags = List<(typeof focusTags.values)[number]>
