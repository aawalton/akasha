"use client"

import { PageActionsMenu } from "akasha/pages/ui/components/page-actions-menu/page-actions-menu.module.code.tsx"
import { usePagesUIRouter } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import { buildViewPropertiesHref } from "akasha/pages/url/page-display-mode/page-display-mode.module.code.ts"

export function FrameViewPropertiesMenu() {
  const { pathname } = usePagesUIRouter()
  return <PageActionsMenu viewPropertiesHref={buildViewPropertiesHref(pathname)} />
}
