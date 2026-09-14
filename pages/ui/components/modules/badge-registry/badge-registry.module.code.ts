import type { PropertyType } from "akasha/pages/core/modules/page-data/page-data.module.code.ts"
import { ActionButtonPropertyBadge } from "akasha/pages/ui/components/modules/action-button-property-badge/action-button-property-badge.module.code.tsx"

import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"

import type { ComponentType } from "react"

export const PROPERTY_BADGE_REGISTRY: Partial<
  Record<PropertyType, ComponentType<PropertyBadgeProps>>
> = {
  "action-button": ActionButtonPropertyBadge,
}
