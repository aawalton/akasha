"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { usePageSpoken } from "akasha/page/ui/component/modules/page-audio/page-audio.module.code.tsx"
import { PROSE_SPOKEN } from "akasha/page/ui/component/modules/position-fraction/position-fraction.module.code.ts"
import {
  foundIn,
  keyOf,
  proseWords,
  spokenKeys,
} from "akasha/page/ui/component/modules/spoken-matching/spoken-matching.module.code.ts"
import { type RefObject, useEffect, useState } from "react"

const HIGHLIGHT = "narration-spoken"

const BAND_TOP = 0.2

const BAND_BOTTOM = 0.7

const AIM = 0.33

const BY_HAND = ["wheel", "touchmove", "keydown"] as const

const SCROLL_KEYS: ReadonlySet<string> = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
])

const WORD = /\S+/g

type DrawnWord = { readonly node: Text; readonly start: number; readonly end: number }

function drawnWords(root: HTMLElement): { keys: string[]; words: DrawnWord[] } {
  const keys: string[] = []
  const words: DrawnWord[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
    const text = node as Text
    for (const match of text.data.matchAll(WORD)) {
      const key = keyOf(match[0])
      if (key === "") continue
      keys.push(key)
      words.push({ node: text, start: match.index, end: match.index + match[0].length })
    }
  }
  return { keys, words }
}

function highlights(): HighlightRegistry | null {
  return typeof CSS !== "undefined" && "highlights" in CSS ? CSS.highlights : null
}

function keptInView(range: Range): undefined {
  const box = range.getBoundingClientRect()
  const view = window.innerHeight
  if (box.top >= view * BAND_TOP && box.bottom <= view * BAND_BOTTOM) return
  window.scrollTo({ top: window.scrollY + box.top - view * AIM, behavior: "smooth" })
}

export function PageAudioFollow({
  pageId,
  prose,
  length,
  column,
  scrollToFraction,
}: {
  readonly pageId: string
  readonly prose: string
  readonly length: number | undefined
  readonly column: RefObject<HTMLElement | null>
  readonly scrollToFraction: (fraction: number) => undefined
}) {
  const said = usePageSpoken()
  const spoken = said !== null && said.pageId === pageId ? said : null
  const speaking = spoken !== null
  const [following, setFollowing] = useState(true)

  useEffect(() => {
    if (!speaking) return
    setFollowing(true)
    const root = document.documentElement
    root.dataset[PROSE_SPOKEN] = ""
    const byHand = (event: Event): undefined => {
      if (event instanceof KeyboardEvent && !SCROLL_KEYS.has(event.key)) return
      setFollowing(false)
    }
    for (const name of BY_HAND) window.addEventListener(name, byHand, { passive: true })
    return () => {
      delete root.dataset[PROSE_SPOKEN]
      for (const name of BY_HAND) window.removeEventListener(name, byHand)
      highlights()?.delete(HIGHLIGHT)
    }
  }, [speaking])

  useEffect(() => {
    const root = column.current
    if (spoken === null || root === null) return
    const total = proseWords(prose).length
    const scale = length !== undefined && length > 0 && total > 0 ? total / length : 1
    const from = Math.round(spoken.from * scale)
    const to = spoken.to === null ? null : Math.round(spoken.to * scale)
    const { keys, words } = drawnWords(root)
    const near = total > 0 ? (from / total) * keys.length : 0
    const found = foundIn(keys, spokenKeys(prose, from, to), near)
    const first = found === null ? undefined : words[found.first]
    const last = found === null ? undefined : words[found.last]
    if (first === undefined || last === undefined) {
      highlights()?.delete(HIGHLIGHT)
      if (following && total > 0) scrollToFraction(from / total)
      return
    }
    const range = document.createRange()
    range.setStart(first.node, first.start)
    range.setEnd(last.node, last.end)
    highlights()?.set(HIGHLIGHT, new Highlight(range))
    if (following) keptInView(range)
  }, [spoken, prose, length, column, scrollToFraction, following])

  if (!speaking || following) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--safe-area-bottom)+var(--bottom-nav-height)+1rem)] z-40 flex justify-center min-[584px]:bottom-6">
      <Button
        type="button"
        variant="accent"
        size="sm"
        className="pointer-events-auto shadow-md"
        onClick={() => setFollowing(true)}
      >
        Follow narration
      </Button>
    </div>
  )
}
