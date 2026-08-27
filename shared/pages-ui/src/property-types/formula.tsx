"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { isFormulaError } from "@shared/pages-core/formula/resolve"
import { ComputedPropertyBadge } from "./computed-property-badge"
import type { PropertyBadgeProps } from "./property-badge"

export function FormulaPropertyBadge(props: PropertyBadgeProps) {
  const value = props.value
  if (isFormulaError(value)) {
    return (
      <Badge variant="destructive" title={value.__formulaError}>
        Error
      </Badge>
    )
  }
  return <ComputedPropertyBadge {...props} />
}
