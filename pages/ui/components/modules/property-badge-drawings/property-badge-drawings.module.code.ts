import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"
import type { ComponentType } from "react"

type Drawn = { readonly Drawing: ComponentType<PropertyBadgeProps> }

const ENDING = ".property-badge-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.property-badge-component.code.tsx", {
  eager: true,
})

function drawnFor(at: string): string | null {
  const name = at.slice(at.lastIndexOf("/") + 1)
  if (!name.endsWith(ENDING)) return null
  const stem = name.slice(0, -ENDING.length)
  const dot = stem.indexOf(".")
  return dot < 1 ? null : stem.slice(0, dot)
}

export const PROPERTY_BADGE_DRAWINGS: ReadonlyMap<
  string,
  ComponentType<PropertyBadgeProps>
> = new Map(
  Object.entries(FOUND).flatMap(([at, held]) => {
    const slug = drawnFor(at)
    return slug === null ? [] : [[slug, held.Drawing] as const]
  })
)
