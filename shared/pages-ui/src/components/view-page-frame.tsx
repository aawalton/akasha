"use client"

import { buildViewPropertiesHref } from "@shared/pages-url"
import type { ReactNode } from "react"
import { usePagesUIRouter } from "../router-context"
import { PageActionsMenu } from "./page-actions-menu"

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
