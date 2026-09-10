import type { PropertyType } from "akasha/pages/core/page-data/page-data.module.code.ts"
import { ActionButtonPropertyBadge } from "akasha/pages/ui/components/action-button-property-badge/action-button-property-badge.module.code.tsx"
import { AggregatePropertyBadge } from "akasha/pages/ui/components/aggregate-property-badge/aggregate-property-badge.module.code.tsx"
import { BooleanPropertyBadge } from "akasha/pages/ui/components/boolean-property-badge/boolean-property-badge.module.code.tsx"
import { CalendarTimePropertyBadge } from "akasha/pages/ui/components/calendar-time-property-badge/calendar-time-property-badge.module.code.tsx"
import { DatePropertyBadge } from "akasha/pages/ui/components/date-property-badge/date-property-badge.module.code.tsx"
import { FormulaPropertyBadge } from "akasha/pages/ui/components/formula-property-badge/formula-property-badge.module.code.tsx"
import { InstantPropertyBadge } from "akasha/pages/ui/components/instant-property-badge/instant-property-badge.module.code.tsx"
import { JsonPropertyBadge } from "akasha/pages/ui/components/json-property-badge/json-property-badge.module.code.tsx"
import { MarkdownPropertyBadge } from "akasha/pages/ui/components/markdown-property-badge/markdown-property-badge.module.code.tsx"
import { MultiRelationPropertyBadge } from "akasha/pages/ui/components/multi-relation-property-badge/multi-relation-property-badge.module.code.tsx"
import { MultiSelectPropertyBadge } from "akasha/pages/ui/components/multi-select-property-badge/multi-select-property-badge.module.code.tsx"
import { NumberPropertyBadge } from "akasha/pages/ui/components/number-property-badge/number-property-badge.module.code.tsx"
import { PathSelectPropertyBadge } from "akasha/pages/ui/components/path-select-property-badge/path-select-property-badge.module.code.tsx"
import { ProgressPropertyBadge } from "akasha/pages/ui/components/progress-property-badge/progress-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/property-badge/property-badge.module.code.tsx"
import { RelationPropertyBadge } from "akasha/pages/ui/components/relation-property-badge/relation-property-badge.module.code.tsx"
import { RichDocumentPropertyBadge } from "akasha/pages/ui/components/rich-document-property-badge/rich-document-property-badge.module.code.tsx"
import { RollupPropertyBadge } from "akasha/pages/ui/components/rollup-property-badge/rollup-property-badge.module.code.tsx"
import { RrulePropertyBadge } from "akasha/pages/ui/components/rrule-property-badge/rrule-property-badge.module.code.tsx"
import { SelectPropertyBadge } from "akasha/pages/ui/components/select-property-badge/select-property-badge.module.code.tsx"
import { TextPropertyBadge } from "akasha/pages/ui/components/text-property-badge/text-property-badge.module.code.tsx"
import { UrlPropertyBadge } from "akasha/pages/ui/components/url-property-badge/url-property-badge.module.code.tsx"
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
