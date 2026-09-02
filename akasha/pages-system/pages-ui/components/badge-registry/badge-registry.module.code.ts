import type { PropertyType } from "@akasha/pages-core/types"
import { ActionButtonPropertyBadge } from "@akasha/pages-ui-components/action-button-property-badge"
import { AggregatePropertyBadge } from "@akasha/pages-ui-components/aggregate-property-badge"
import { BooleanPropertyBadge } from "@akasha/pages-ui-components/boolean-property-badge"
import { CalendarTimePropertyBadge } from "@akasha/pages-ui-components/calendar-time-property-badge"
import { DatePropertyBadge } from "@akasha/pages-ui-components/date-property-badge"
import { FormulaPropertyBadge } from "@akasha/pages-ui-components/formula-property-badge"
import { InstantPropertyBadge } from "@akasha/pages-ui-components/instant-property-badge"
import { JsonPropertyBadge } from "@akasha/pages-ui-components/json-property-badge"
import { MarkdownPropertyBadge } from "@akasha/pages-ui-components/markdown-property-badge"
import { MultiRelationPropertyBadge } from "@akasha/pages-ui-components/multi-relation-property-badge"
import { MultiSelectPropertyBadge } from "@akasha/pages-ui-components/multi-select-property-badge"
import { NumberPropertyBadge } from "@akasha/pages-ui-components/number-property-badge"
import { PathSelectPropertyBadge } from "@akasha/pages-ui-components/path-select-property-badge"
import { ProgressPropertyBadge } from "@akasha/pages-ui-components/progress-property-badge"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { RelationPropertyBadge } from "@akasha/pages-ui-components/relation-property-badge"
import { RichDocumentPropertyBadge } from "@akasha/pages-ui-components/rich-document-property-badge"
import { RollupPropertyBadge } from "@akasha/pages-ui-components/rollup-property-badge"
import { RrulePropertyBadge } from "@akasha/pages-ui-components/rrule-property-badge"
import { SelectPropertyBadge } from "@akasha/pages-ui-components/select-property-badge"
import { TextPropertyBadge } from "@akasha/pages-ui-components/text-property-badge"
import { UrlPropertyBadge } from "@akasha/pages-ui-components/url-property-badge"
import type { ComponentType } from "react"

export const PROPERTY_BADGE_REGISTRY: Record<PropertyType, ComponentType<PropertyBadgeProps>> = {
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
