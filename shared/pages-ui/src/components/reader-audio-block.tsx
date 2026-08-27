import type { ReactNode } from "react"
import { type MediaVariant, PageMediaPlayer } from "../media/page-media-player"

export function ReaderAudioBlock({
  pageId,
  pageTypeSlug,
  title,
  variants,
  nextHref,
  defaultVariant,
  resumeFraction,
  length,
  currentProgress,
  progressPropertyId,
  text,
  audioActions,
}: {
  pageId: string
  pageTypeSlug: string
  title: string
  variants: readonly MediaVariant[]
  nextHref: string | null
  defaultVariant: string | null
  resumeFraction?: number
  length?: number
  currentProgress?: number
  progressPropertyId?: string
  text?: string
  audioActions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <PageMediaPlayer
        pageId={pageId}
        pageTypeSlug={pageTypeSlug}
        title={title}
        medium="audio"
        variants={variants}
        nextHref={nextHref}
        defaultVariant={defaultVariant}
        resumeFraction={resumeFraction}
        length={length}
        currentProgress={currentProgress}
        progressPropertyId={progressPropertyId}
        text={text}
      />
      {audioActions}
    </div>
  )
}
