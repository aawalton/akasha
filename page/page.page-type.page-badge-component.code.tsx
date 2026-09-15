"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { LinkBadge } from "akasha/design/interface/badge/modules/link-badge/link-badge.module.code.tsx"
import type { PageBadgeProps } from "akasha/page/ui/component/modules/page-badge/page-badge.module.code.tsx"

export function Drawing({ label, variant, href, onClick }: PageBadgeProps) {
  if (href !== undefined) {
    return (
      <LinkBadge variant={variant} href={href} onClick={onClick}>
        {label}
      </LinkBadge>
    )
  }
  if (onClick !== undefined) {
    return (
      <ButtonBadge variant={variant} onClick={onClick}>
        {label}
      </ButtonBadge>
    )
  }
  return <Badge variant={variant}>{label}</Badge>
}
