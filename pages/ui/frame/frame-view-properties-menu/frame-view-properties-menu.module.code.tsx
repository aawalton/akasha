"use client"

import { buildViewPropertiesHref } from "@akasha/pages/url/page-display-mode"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { PageActionsMenu } from "@akasha/pages-ui-components/page-actions-menu"

export function FrameViewPropertiesMenu() {
  const { pathname } = usePagesUIRouter()
  return <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
}
