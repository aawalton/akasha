"use client"

import {
  stackedBadgesClass,
  useBadgeLayoutContext,
} from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { keyOf } from "akasha/page/ui/component/modules/badge-keying/badge-keying.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import {
  drawingAlong,
  PROPERTY_BADGE_DRAWINGS,
} from "akasha/page/ui/component/modules/property-badge-drawings/property-badge-drawings.module.code.ts"

const FALLS_BACK_TO = "page-property"

const HOLDS_A_LIST: ReadonlySet<string> = new Set([
  "multi-relation-property",
  "multi-select-property",
])

function holdsAList(chain: readonly string[]): boolean {
  return chain.some((one) => HOLDS_A_LIST.has(one))
}

export function Drawing(props: PropertyBadgeProps) {
  const layout = useBadgeLayoutContext()
  for (const chain of props.property.memberDrawnBy ?? []) {
    const Member = drawingAlong(chain)
    if (Member === undefined) continue
    const held = props.value
    if (!Array.isArray(held) || holdsAList(chain)) return <Member {...props} />
    return (
      <span className={stackedBadgesClass(layout.popoverAlign ?? "end")}>
        {held.map((one, at) => (
          <Member {...props} key={keyOf(one, at)} value={one} />
        ))}
      </span>
    )
  }
  const Held = PROPERTY_BADGE_DRAWINGS.get(FALLS_BACK_TO)
  return Held === undefined ? null : <Held {...props} />
}
