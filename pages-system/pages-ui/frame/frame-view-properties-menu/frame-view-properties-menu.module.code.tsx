"use client"

import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { PageActionsMenu } from "@akasha/pages-ui-components/page-actions-menu"
import { buildViewPropertiesHref } from "@akasha/pages-url/page-display-mode"

export function FrameViewPropertiesMenu() {
  const { pathname } = usePagesUIRouter()
  return <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
}
