"use client"

import { buildViewPropertiesHref } from "@akasha/pages-url/page-display-mode"
import { PageActionsMenu } from "../components/page-actions-menu"
import { usePagesUIRouter } from "../router-context"

export function FrameViewPropertiesMenu() {
  const { pathname } = usePagesUIRouter()
  return <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
}
