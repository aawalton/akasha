import type { PropertyType } from "akasha/pages/core/modules/page-data/page-data.module.code.ts"
import { ActionButtonPropertyBadge } from "akasha/pages/ui/components/modules/action-button-property-badge/action-button-property-badge.module.code.tsx"
import { AggregatePropertyBadge } from "akasha/pages/ui/components/modules/aggregate-property-badge/aggregate-property-badge.module.code.tsx"

import { FormulaPropertyBadge } from "akasha/pages/ui/components/modules/formula-property-badge/formula-property-badge.module.code.tsx"

import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"

import { RichDocumentPropertyBadge } from "akasha/pages/ui/components/modules/rich-document-property-badge/rich-document-property-badge.module.code.tsx"
import { RollupPropertyBadge } from "akasha/pages/ui/components/modules/rollup-property-badge/rollup-property-badge.module.code.tsx"
import { RrulePropertyBadge } from "akasha/pages/ui/components/modules/rrule-property-badge/rrule-property-badge.module.code.tsx"

import type { ComponentType } from "react"

export const PROPERTY_BADGE_REGISTRY: Partial<
  Record<PropertyType, ComponentType<PropertyBadgeProps>>
> = {
  rollup: RollupPropertyBadge,
  aggregate: AggregatePropertyBadge,
  formula: FormulaPropertyBadge,
  rrule: RrulePropertyBadge,

  "rich-document": RichDocumentPropertyBadge,
  "action-button": ActionButtonPropertyBadge,
}
