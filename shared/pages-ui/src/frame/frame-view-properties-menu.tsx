"use client"

import { buildViewPropertiesHref } from "@akasha/pages-url/page-display-mode"
import { PageActionsMenu } from "@akasha/pages-ui-components/page-actions-menu"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"

export function FrameViewPropertiesMenu() {
  const { pathname } = usePagesUIRouter()
  return <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
}
