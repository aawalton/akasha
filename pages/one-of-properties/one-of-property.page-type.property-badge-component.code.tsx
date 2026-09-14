"use client"

import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"
import { drawingAlong } from "akasha/pages/ui/components/modules/property-badge-drawings/property-badge-drawings.module.code.ts"

export function Drawing(props: PropertyBadgeProps) {
  for (const chain of props.property.memberDrawnBy ?? []) {
    const Member = drawingAlong(chain)
    if (Member !== undefined) return <Member {...props} />
  }
  const Held = props.lookup?.(props.property.type)
  return Held === undefined ? null : <Held {...props} />
}
