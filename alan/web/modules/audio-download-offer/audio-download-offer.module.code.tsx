import { OfflineDownloadButton } from "akasha/alan/web/modules/offline-download-button/offline-download-button.module.code.tsx"
import type { ReactElement } from "react"

export function audioActionsFor(page: {
  id: string
  audioVariants?: readonly { id: string; label: string }[] | null
  chapterTitle: string | null
  chapterNumber: number | null
  storyTitle: string | null
}): ReactElement | undefined {
  const variants = page.audioVariants ?? []
  if (variants.length === 0) return undefined
  return (
    <OfflineDownloadButton
      pageId={page.id}
      chapterTitle={page.chapterTitle ?? ""}
      chapterNumber={page.chapterNumber}
      storyTitle={page.storyTitle}
      variants={variants}
    />
  )
}
