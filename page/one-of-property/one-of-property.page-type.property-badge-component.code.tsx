"use client"

import type { PropertyBadgeProps } from "akasha/page/ui/components/modules/property-badge/property-badge.module.code.tsx"
import {
  drawingAlong,
  PROPERTY_BADGE_DRAWINGS,
} from "akasha/page/ui/components/modules/property-badge-drawings/property-badge-drawings.module.code.ts"

const FALLS_BACK_TO = "page-property"

export function Drawing(props: PropertyBadgeProps) {
  for (const chain of props.property.memberDrawnBy ?? []) {
    const Member = drawingAlong(chain)
    if (Member !== undefined) return <Member {...props} />
  }
  const Held = PROPERTY_BADGE_DRAWINGS.get(FALLS_BACK_TO)
  return Held === undefined ? null : <Held {...props} />
}
