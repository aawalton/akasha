import type { PropertyType } from "akasha/pages/core/modules/page-data/page-data.module.code.ts"
import { ActionButtonPropertyBadge } from "akasha/pages/ui/components/modules/action-button-property-badge/action-button-property-badge.module.code.tsx"
import { AggregatePropertyBadge } from "akasha/pages/ui/components/modules/aggregate-property-badge/aggregate-property-badge.module.code.tsx"

import { FormulaPropertyBadge } from "akasha/pages/ui/components/modules/formula-property-badge/formula-property-badge.module.code.tsx"
import { InstantPropertyBadge } from "akasha/pages/ui/components/modules/instant-property-badge/instant-property-badge.module.code.tsx"
import { JsonPropertyBadge } from "akasha/pages/ui/components/modules/json-property-badge/json-property-badge.module.code.tsx"

import { MarkdownPropertyBadge } from "akasha/pages/ui/components/modules/markdown-property-badge/markdown-property-badge.module.code.tsx"
import { MultiRelationPropertyBadge } from "akasha/pages/ui/components/modules/multi-relation-property-badge/multi-relation-property-badge.module.code.tsx"
import { MultiSelectPropertyBadge } from "akasha/pages/ui/components/modules/multi-select-property-badge/multi-select-property-badge.module.code.tsx"

import { PathSelectPropertyBadge } from "akasha/pages/ui/components/modules/path-select-property-badge/path-select-property-badge.module.code.tsx"

import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"

import { RichDocumentPropertyBadge } from "akasha/pages/ui/components/modules/rich-document-property-badge/rich-document-property-badge.module.code.tsx"
import { RollupPropertyBadge } from "akasha/pages/ui/components/modules/rollup-property-badge/rollup-property-badge.module.code.tsx"
import { RrulePropertyBadge } from "akasha/pages/ui/components/modules/rrule-property-badge/rrule-property-badge.module.code.tsx"
import { SelectPropertyBadge } from "akasha/pages/ui/components/modules/select-property-badge/select-property-badge.module.code.tsx"
import { TextPropertyBadge } from "akasha/pages/ui/components/modules/text-property-badge/text-property-badge.module.code.tsx"
import { UrlPropertyBadge } from "akasha/pages/ui/components/modules/url-property-badge/url-property-badge.module.code.tsx"
import type { ComponentType } from "react"

export const PROPERTY_BADGE_REGISTRY: Partial<
  Record<PropertyType, ComponentType<PropertyBadgeProps>>
> = {
  text: TextPropertyBadge,
  markdown: MarkdownPropertyBadge,

  url: UrlPropertyBadge,
  json: JsonPropertyBadge,

  instant: InstantPropertyBadge,
  select: SelectPropertyBadge,
  "multi-select": MultiSelectPropertyBadge,
  "path-select": PathSelectPropertyBadge,

  "multi-relation": MultiRelationPropertyBadge,
  rollup: RollupPropertyBadge,
  aggregate: AggregatePropertyBadge,
  formula: FormulaPropertyBadge,
  rrule: RrulePropertyBadge,

  "rich-document": RichDocumentPropertyBadge,
  "action-button": ActionButtonPropertyBadge,
}
