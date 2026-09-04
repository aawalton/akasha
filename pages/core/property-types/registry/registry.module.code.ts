import type { PropertyType } from "../../page-data/page-data.module.code.ts"
import { ACTION_BUTTON_OPS } from "../action-button/action-button.module.code.ts"
import { AGGREGATE_OPS } from "../aggregate/aggregate.module.code.ts"
import { BOOLEAN_OPS } from "../boolean/boolean.module.code.ts"
import { CALENDAR_TIME_OPS } from "../calendar-time/calendar-time.module.code.ts"
import { DATE_OPS } from "../date/date.module.code.ts"
import { FORMULA_OPS } from "../formula/formula.module.code.ts"
import { INSTANT_OPS } from "../instant/instant.module.code.ts"
import { JSON_OPS } from "../json/json.module.code.ts"
import { MARKDOWN_OPS } from "../markdown/markdown.module.code.ts"
import { MULTI_RELATION_OPS } from "../multi-relation/multi-relation.module.code.ts"
import { MULTI_SELECT_OPS } from "../multi-select-property/multi-select-property.module.code.ts"
import { NUMBER_OPS } from "../number/number.module.code.ts"
import { PATH_SELECT_OPS } from "../path-select/path-select.module.code.ts"
import { PROGRESS_OPS } from "../progress/progress.module.code.ts"
import type { PropertyTypeOps } from "../property-type-ops/property-type-ops.module.code.ts"
import { RELATION_OPS } from "../relation/relation.module.code.ts"
import { RICH_DOCUMENT_OPS } from "../rich-document/rich-document.module.code.ts"
import { ROLLUP_OPS } from "../rollup/rollup.module.code.ts"
import { RRULE_OPS } from "../rrule/rrule.module.code.ts"
import { SELECT_OPS } from "../select/select.module.code.ts"
import { TEXT_OPS } from "../text/text.module.code.ts"
import { URL_OPS } from "../url/url.module.code.ts"

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
