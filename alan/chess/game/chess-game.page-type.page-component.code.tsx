"use client"

import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { lazy, Suspense } from "react"

const ChessBoard = lazy(() => import("akasha/alan/chess/modules/board/chess-board.module.code.tsx"))

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  const { page } = usePage({ pageTypeSlug, id })
  const pgn = typeof page?.properties?.pgn === "string" ? page.properties.pgn : undefined
  return (
    <Suspense fallback={null}>
      <ChessBoard initialPgn={pgn} />
    </Suspense>
  )
}
