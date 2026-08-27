import type { PropertyType } from "@shared/pages-core/types"
import type { ComponentType } from "react"

import { ActionButtonPropertyBadge } from "./action-button"
import { AggregatePropertyBadge } from "./aggregate"
import { BooleanPropertyBadge } from "./boolean"
import { CalendarTimePropertyBadge } from "./calendar-time"
import { DatePropertyBadge } from "./date"
import { FormulaPropertyBadge } from "./formula"
import { InstantPropertyBadge } from "./instant"
import { JsonPropertyBadge } from "./json"
import { MarkdownPropertyBadge } from "./markdown"
import { MultiRelationPropertyBadge } from "./multi-relation"
import { MultiSelectPropertyBadge } from "./multi-select"
import { NumberPropertyBadge } from "./number"
import { PathSelectPropertyBadge } from "./path-select"
import { ProgressPropertyBadge } from "./progress"
import type { PropertyBadgeProps } from "./property-badge"
import { RelationPropertyBadge } from "./relation"
import { RichDocumentPropertyBadge } from "./rich-document"
import { RollupPropertyBadge } from "./rollup"
import { RrulePropertyBadge } from "./rrule"
import { SelectPropertyBadge } from "./select"
import { TextPropertyBadge } from "./text"
import { UrlPropertyBadge } from "./url"

export const propertyBadgeRegistry: Record<PropertyType, ComponentType<PropertyBadgeProps>> = {
  text: TextPropertyBadge,
  markdown: MarkdownPropertyBadge,
  number: NumberPropertyBadge,
  boolean: BooleanPropertyBadge,
  url: UrlPropertyBadge,
  json: JsonPropertyBadge,
  "calendar-date": DatePropertyBadge,
  "calendar-time": CalendarTimePropertyBadge,
  instant: InstantPropertyBadge,
  select: SelectPropertyBadge,
  "multi-select": MultiSelectPropertyBadge,
  "path-select": PathSelectPropertyBadge,
  relation: RelationPropertyBadge,
  "multi-relation": MultiRelationPropertyBadge,
  rollup: RollupPropertyBadge,
  aggregate: AggregatePropertyBadge,
  formula: FormulaPropertyBadge,
  rrule: RrulePropertyBadge,
  progress: ProgressPropertyBadge,
  "rich-document": RichDocumentPropertyBadge,
  "action-button": ActionButtonPropertyBadge,
}
