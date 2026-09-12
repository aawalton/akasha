import type { PropertyType } from "akasha/pages/core/page-data/page-data.module.code.ts"
import { AGGREGATE_OPS } from "akasha/pages/core/property-types/aggregate/aggregate.module.code.ts"
import { BOOLEAN_OPS } from "akasha/pages/core/property-types/boolean/boolean.module.code.ts"
import { CALENDAR_TIME_OPS } from "akasha/pages/core/property-types/calendar-time/calendar-time.module.code.ts"
import { DATE_OPS } from "akasha/pages/core/property-types/date/date.module.code.ts"
import { FORMULA_OPS } from "akasha/pages/core/property-types/formula/formula.module.code.ts"
import { INSTANT_OPS } from "akasha/pages/core/property-types/instant/instant.module.code.ts"
import { JSON_OPS } from "akasha/pages/core/property-types/json/json.module.code.ts"
import { MARKDOWN_OPS } from "akasha/pages/core/property-types/markdown/markdown.module.code.ts"
import { ACTION_BUTTON_OPS } from "akasha/pages/core/property-types/modules/action-button/action-button.module.code.ts"
import { MULTI_RELATION_OPS } from "akasha/pages/core/property-types/multi-relation/multi-relation.module.code.ts"
import { MULTI_SELECT_OPS } from "akasha/pages/core/property-types/multi-select-property/multi-select-property.module.code.ts"
import { NUMBER_OPS } from "akasha/pages/core/property-types/number/number.module.code.ts"
import { PATH_SELECT_OPS } from "akasha/pages/core/property-types/path-select/path-select.module.code.ts"
import { PROGRESS_OPS } from "akasha/pages/core/property-types/progress/progress.module.code.ts"
import type { PropertyTypeOps } from "akasha/pages/core/property-types/property-type-ops/property-type-ops.module.code.ts"
import { RELATION_OPS } from "akasha/pages/core/property-types/relation/relation.module.code.ts"
import { RICH_DOCUMENT_OPS } from "akasha/pages/core/property-types/rich-document/rich-document.module.code.ts"
import { ROLLUP_OPS } from "akasha/pages/core/property-types/rollup/rollup.module.code.ts"
import { RRULE_OPS } from "akasha/pages/core/property-types/rrule/rrule.module.code.ts"
import { SELECT_OPS } from "akasha/pages/core/property-types/select/select.module.code.ts"
import { TEXT_OPS } from "akasha/pages/core/property-types/text/text.module.code.ts"
import { URL_OPS } from "akasha/pages/core/property-types/url/url.module.code.ts"

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

export const PROPERTY_TYPE_OPS_REGISTRY_KEYS: ReadonlyArray<
  keyof typeof PROPERTY_TYPE_OPS_REGISTRY
> = [
  "text",
  "calendar-date",
  "calendar-time",
  "instant",
  "markdown",
  "number",
  "boolean",
  "url",
  "json",
  "select",
  "multi-select",
  "path-select",
  "relation",
  "multi-relation",
  "rollup",
  "aggregate",
  "formula",
  "rrule",
  "progress",
  "rich-document",
  "action-button",
]

export function propertyTypeRendersWhenEmpty(type: PropertyType): boolean {
  return PROPERTY_TYPE_OPS_REGISTRY[type]?.rendersWhenEmpty === true
}
