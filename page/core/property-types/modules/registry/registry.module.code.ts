import type { PropertyType } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { ACTION_BUTTON_OPS } from "akasha/page/core/property-types/modules/action-button/action-button.module.code.ts"
import { AGGREGATE_OPS } from "akasha/page/core/property-types/modules/aggregate/aggregate.module.code.ts"
import { BOOLEAN_OPS } from "akasha/page/core/property-types/modules/boolean/boolean.module.code.ts"
import { CALENDAR_TIME_OPS } from "akasha/page/core/property-types/modules/calendar-time/calendar-time.module.code.ts"
import { DATE_OPS } from "akasha/page/core/property-types/modules/date/date.module.code.ts"
import { FORMULA_OPS } from "akasha/page/core/property-types/modules/formula/formula.module.code.ts"
import { INSTANT_OPS } from "akasha/page/core/property-types/modules/instant/instant.module.code.ts"
import { JSON_OPS } from "akasha/page/core/property-types/modules/json/json.module.code.ts"
import { MARKDOWN_OPS } from "akasha/page/core/property-types/modules/markdown/markdown.module.code.ts"
import { MULTI_RELATION_OPS } from "akasha/page/core/property-types/modules/multi-relation/multi-relation.module.code.ts"
import { MULTI_SELECT_OPS } from "akasha/page/core/property-types/modules/multi-select-property/multi-select-property.module.code.ts"
import { NUMBER_OPS } from "akasha/page/core/property-types/modules/number/number.module.code.ts"
import { PATH_SELECT_OPS } from "akasha/page/core/property-types/modules/path-select/path-select.module.code.ts"
import { PROGRESS_OPS } from "akasha/page/core/property-types/modules/progress/progress.module.code.ts"
import type { PropertyTypeOps } from "akasha/page/core/property-types/modules/property-type-ops/property-type-ops.module.code.ts"
import { RELATION_OPS } from "akasha/page/core/property-types/modules/relation/relation.module.code.ts"
import { RICH_DOCUMENT_OPS } from "akasha/page/core/property-types/modules/rich-document/rich-document.module.code.ts"
import { ROLLUP_OPS } from "akasha/page/core/property-types/modules/rollup/rollup.module.code.ts"
import { RRULE_OPS } from "akasha/page/core/property-types/modules/rrule/rrule.module.code.ts"
import { SELECT_OPS } from "akasha/page/core/property-types/modules/select/select.module.code.ts"
import { TEXT_OPS } from "akasha/page/core/property-types/modules/text/text.module.code.ts"
import { URL_OPS } from "akasha/page/core/property-types/modules/url/url.module.code.ts"

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
  "path-select": PATH_SELECT_OPS,
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
