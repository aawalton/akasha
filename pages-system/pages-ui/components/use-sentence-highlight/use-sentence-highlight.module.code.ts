"use client"

import { useOptionalPlayingSession } from "@akasha/pages-ui/media/playing-session-context"
import { resolveActiveSentence } from "@akasha/pages-ui/media/resolve-active-sentence"
import type { SentenceLayout } from "@akasha/pages-ui-components/reader-sentence-layout"
import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"
import { type RefObject, useEffect } from "react"

export function useSentenceHighlight(args: {
  containerRef: RefObject<HTMLElement | null>
  layout: SentenceLayout | null
  marks: readonly SentenceMark[]
  scrollToBlock: (blockIndex: number) => void
}): undefined {
  const { containerRef, layout, marks, scrollToBlock } = args
  const session = useOptionalPlayingSession()
  const subscribeTime = session?.subscribeTime

  useEffect(() => {
    if (layout === null || marks.length === 0 || subscribeTime === undefined) return
    let lastActive: number | null = null
    return subscribeTime((currentTime) => {
      const active = resolveActiveSentence(marks, currentTime)
      if (active === lastActive) return
      lastActive = active
      const root: ParentNode = containerRef.current ?? document
      root
        .querySelectorAll("[data-sentence-active]")
        .forEach((el) => el.removeAttribute("data-sentence-active"))
      if (active === null) return
      root
        .querySelectorAll(`[data-sentence-index="${active}"]`)
        .forEach((el) => el.setAttribute("data-sentence-active", ""))
      const block = layout.firstBlockForSentence[active]
      if (block !== undefined && block >= 0) scrollToBlock(block)
    })
  }, [containerRef, layout, marks, subscribeTime, scrollToBlock])
}
