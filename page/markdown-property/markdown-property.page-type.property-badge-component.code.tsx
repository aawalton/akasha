"use client"

import { MarkdownPropertyBadge } from "akasha/page/ui/component/modules/markdown-property-badge/markdown-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <MarkdownPropertyBadge {...props} />
}
