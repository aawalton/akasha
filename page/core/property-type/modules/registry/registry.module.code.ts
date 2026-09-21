import type { PropertyType } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { ACTION_BUTTON_OPS } from "akasha/page/core/property-type/modules/action-button/action-button.module.code.ts"
import { AGGREGATE_OPS } from "akasha/page/core/property-type/modules/aggregate/aggregate.module.code.ts"
import { BOOLEAN_OPS } from "akasha/page/core/property-type/modules/boolean/boolean.module.code.ts"
import { CALENDAR_TIME_OPS } from "akasha/page/core/property-type/modules/calendar-time/calendar-time.module.code.ts"
import { DATE_OPS } from "akasha/page/core/property-type/modules/date/date.module.code.ts"
import { FORMULA_OPS } from "akasha/page/core/property-type/modules/formula/formula.module.code.ts"
import { INSTANT_OPS } from "akasha/page/core/property-type/modules/instant/instant.module.code.ts"
import { JSON_OPS } from "akasha/page/core/property-type/modules/json/json.module.code.ts"
import { MARKDOWN_OPS } from "akasha/page/core/property-type/modules/markdown/markdown.module.code.ts"
import { MULTI_RELATION_OPS } from "akasha/page/core/property-type/modules/multi-relation/multi-relation.module.code.ts"
import { MULTI_SELECT_OPS } from "akasha/page/core/property-type/modules/multi-select-property/multi-select-property.module.code.ts"
import { NUMBER_OPS } from "akasha/page/core/property-type/modules/number/number.module.code.ts"
import { PROGRESS_OPS } from "akasha/page/core/property-type/modules/progress/progress.module.code.ts"
import type { PropertyTypeOps } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { RELATION_OPS } from "akasha/page/core/property-type/modules/relation/relation.module.code.ts"
import { RICH_DOCUMENT_OPS } from "akasha/page/core/property-type/modules/rich-document/rich-document.module.code.ts"
import { ROLLUP_OPS } from "akasha/page/core/property-type/modules/rollup/rollup.module.code.ts"
import { RRULE_OPS } from "akasha/page/core/property-type/modules/rrule/rrule.module.code.ts"
import { SELECT_OPS } from "akasha/page/core/property-type/modules/select/select.module.code.ts"
import { TEXT_OPS } from "akasha/page/core/property-type/modules/text/text.module.code.ts"
import { URL_OPS } from "akasha/page/core/property-type/modules/url/url.module.code.ts"

export const PROPERTY_TYPE_OPS_REGISTRY = {
  text: TEXT_OPS,
  "calendar-date": DATE_OPS,
  "calendar-time": CALENDAR_TIME_OPS,
  instant: INSTANT_OPS,
  markdown: MARKDOWN_OPS,
  number: NUMBER_OPS,
  boolean: BOOLEAN_OPS,
  url: URL_OPS,
  json: JSON_OPS,
  select: SELECT_OPS,
  "multi-select": MULTI_SELECT_OPS,
  relation: RELATION_OPS,
  "multi-relation": MULTI_RELATION_OPS,
  rollup: ROLLUP_OPS,
  aggregate: AGGREGATE_OPS,
  formula: FORMULA_OPS,
  rrule: RRULE_OPS,
  progress: PROGRESS_OPS,
  "rich-document": RICH_DOCUMENT_OPS,
  "action-button": ACTION_BUTTON_OPS,
} satisfies Partial<Record<PropertyType, PropertyTypeOps>>

export function propertyTypeRendersWhenEmpty(type: PropertyType): boolean {
  return PROPERTY_TYPE_OPS_REGISTRY[type]?.rendersWhenEmpty === true
}
