"use client"

import type { PageDrawingProps } from "akasha/page/ui/components/modules/page-detail-content/page-detail-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { lazy, Suspense } from "react"

const IdleGame = lazy(() => import("akasha/alan/web/modules/idle-game/idle-game.module.code.tsx"))

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  const { page } = usePage({ pageTypeSlug, id })
  const title = typeof page?.properties?.title === "string" ? page.properties.title : null
  return (
    <Suspense fallback={null}>
      <IdleGame title={title} />
    </Suspense>
  )
}
