"use client"

import { buildViewPropertiesHref } from "@shared/pages-url"
import { PageActionsMenu } from "../components/page-actions-menu"
import { usePagesUIRouter } from "../router-context"

export function FrameViewPropertiesMenu() {
  const { pathname } = usePagesUIRouter()
  return <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
}
