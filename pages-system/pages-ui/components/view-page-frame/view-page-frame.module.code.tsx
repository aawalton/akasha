"use client"

import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { PageActionsMenu } from "@akasha/pages-ui-components/page-actions-menu"
import { buildViewPropertiesHref } from "@akasha/pages-url/page-display-mode"
import type { ReactNode } from "react"

export function ViewPageFrame({
  children,
  menuWrapperClassName,
}: {
  children: ReactNode
  menuWrapperClassName?: string
}) {
  const { pathname } = usePagesUIRouter()
  return (
    <div className="relative">
      {children}
      <div
        className={`absolute top-3 right-3 z-20${menuWrapperClassName != null ? ` ${menuWrapperClassName}` : ""}`}
      >
        <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
      </div>
    </div>
  )
}
