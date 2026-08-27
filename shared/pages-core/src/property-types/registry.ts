import type { PropertyType } from "../types"
import { actionButtonOps } from "./action-button"
import { aggregateOps } from "./aggregate"
import { booleanOps } from "./boolean"
import { calendarTimeOps } from "./calendar-time"
import { dateOps } from "./date"
import { formulaOps } from "./formula"
import { instantOps } from "./instant"
import { jsonOps } from "./json"
import { markdownOps } from "./markdown"
import { multiRelationOps } from "./multi-relation"
import { multiSelectOps } from "./multi-select"
import { numberOps } from "./number"
import { pathSelectOps } from "./path-select"
import { progressOps } from "./progress"
import { relationOps } from "./relation"
import { richDocumentOps } from "./rich-document"
import { rollupOps } from "./rollup"
import { rruleOps } from "./rrule"
import { selectOps } from "./select"
import { textOps } from "./text"
import type { PropertyTypeOps } from "./types"
import { urlOps } from "./url"

export const propertyTypeOpsRegistry = {
  text: textOps,
  "calendar-date": dateOps,
  "calendar-time": calendarTimeOps,
  instant: instantOps,
  markdown: markdownOps,
  number: numberOps,
  boolean: booleanOps,
  url: urlOps,
  json: jsonOps,
  select: selectOps,
  "multi-select": multiSelectOps,
  "path-select": pathSelectOps,
  relation: relationOps,
  "multi-relation": multiRelationOps,
  rollup: rollupOps,
  aggregate: aggregateOps,
  formula: formulaOps,
  rrule: rruleOps,
  progress: progressOps,
  "rich-document": richDocumentOps,
  "action-button": actionButtonOps,
} satisfies Partial<Record<PropertyType, PropertyTypeOps>>

export const propertyTypeOpsRegistryKeys: ReadonlyArray<keyof typeof propertyTypeOpsRegistry> = [
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
  return propertyTypeOpsRegistry[type]?.rendersWhenEmpty === true
}
