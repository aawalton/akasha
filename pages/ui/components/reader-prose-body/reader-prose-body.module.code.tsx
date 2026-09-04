"use client"

import { cn } from "@akasha/design-primitives/cn"
import { clampFraction, fractionToScrollTop } from "@akasha/pages-ui-components/position-fraction"
import {
  blockPositionForFraction,
  buildProseCharTable,
  fractionForBlockPosition,
} from "@akasha/pages-ui-components/reader-char-table"
import {
  estimateProseBlockHeight,
  type ProseBlock,
  parseProseBlocks,
  proseBlockSource,
} from "@akasha/pages-ui-components/reader-prose"
import { ProseBlockView } from "@akasha/pages-ui-components/reader-prose-block"
import type { BlockSentenceLayout } from "@akasha/pages-ui-components/reader-sentence-layout"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { memo, type RefObject, useImperativeHandle, useMemo, useRef } from "react"

export interface ReaderPositionAnchor {
  readonly fractionAt: (scrollTop: number) => number
  readonly scrollTopFor: (fraction: number) => number
  readonly scrollToBlock: (blockIndex: number) => void
}

const SENTENCE_SCROLL_VIEWPORT_BIAS = 0.35

const DEFAULT_PARAGRAPH_GAP_PX = 20

const MemoProseBlock = memo(function MemoProseBlock({
  block,
  sentenceLayout,
}: {
  block: ProseBlock
  sentenceLayout?: BlockSentenceLayout
}) {
  return <ProseBlockView block={block} sentenceLayout={sentenceLayout} />
})

export function ReaderProseBody({
  content,
  className,
  paragraphGapPx = DEFAULT_PARAGRAPH_GAP_PX,
  anchorRef,
  sentenceBlocks,
}: {
  content: string
  className?: string
  paragraphGapPx?: number
  anchorRef?: RefObject<ReaderPositionAnchor | null>
  sentenceBlocks?: readonly BlockSentenceLayout[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blocks = useMemo(() => parseProseBlocks(content), [content])
  const charTable = useMemo(() => buildProseCharTable(blocks.map(proseBlockSource)), [blocks])

  const virtualizer = useWindowVirtualizer({
    count: blocks.length,
    estimateSize: (index) =>
      estimateProseBlockHeight(blocks[index] ?? { kind: "paragraph", text: "" }),
    gap: paragraphGapPx,
    overscan: 6,
    scrollMargin: containerRef.current?.offsetTop ?? 0,
  })

  const scrollMargin = containerRef.current?.offsetTop ?? 0

  useImperativeHandle(
    anchorRef,
    (): ReaderPositionAnchor => ({
      fractionAt: (scrollTop) => {
        const doc = document.documentElement
        const scrollable = doc.scrollHeight - doc.clientHeight
        if (scrollable > 0 && scrollTop >= scrollable - 2) return 1
        const items = virtualizer.getVirtualItems()
        if (items.length === 0) return 0
        let chosen = items[0]
        for (const item of items) {
          if (item.start <= scrollTop) chosen = item
          else break
        }
        if (chosen === undefined) return 0
        const size = chosen.size > 0 ? chosen.size : 1
        const intra = (scrollTop - chosen.start) / size
        return fractionForBlockPosition(charTable, chosen.index, intra)
      },
      scrollTopFor: (fraction) => {
        const { blockIndex, intraFraction } = blockPositionForFraction(charTable, fraction)
        const offsetInfo = virtualizer.getOffsetForIndex(blockIndex, "start")
        const measurement = virtualizer.measurementsCache[blockIndex]
        const itemStart = offsetInfo?.[0] ?? measurement?.start ?? 0
        const itemSize =
          measurement?.size ??
          estimateProseBlockHeight(blocks[blockIndex] ?? { kind: "paragraph", text: "" })
        const doc = document.documentElement
        const scrollable = Math.max(0, doc.scrollHeight - doc.clientHeight)
        const target = itemStart + intraFraction * itemSize
        return Math.min(Math.max(0, target), scrollable)
      },
      scrollToBlock: (blockIndex) => {
        const offset = virtualizer.getOffsetForIndex(blockIndex, "start")?.[0] ?? 0
        const bias = window.innerHeight * SENTENCE_SCROLL_VIEWPORT_BIAS
        window.scrollTo({ top: Math.max(0, offset - bias), behavior: "smooth" })
      },
    }),
    [virtualizer, charTable, blocks]
  )

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: virtualizer.getTotalSize() }}
    >
      {virtualizer.getVirtualItems().map((vItem) => {
        const block = blocks[vItem.index]
        if (block === undefined) return null
        return (
          <div
            key={vItem.key}
            ref={virtualizer.measureElement}
            data-index={vItem.index}
            className="absolute top-0 left-0 w-full"
            style={{ transform: `translateY(${vItem.start - scrollMargin}px)` }}
          >
            <MemoProseBlock block={block} sentenceLayout={sentenceBlocks?.[vItem.index]} />
          </div>
        )
      })}
    </div>
  )
}

export function ReaderProseStatic({
  content,
  className,
  paragraphGapPx = DEFAULT_PARAGRAPH_GAP_PX,
  anchorRef,
  sentenceBlocks,
}: {
  content: string
  className?: string
  paragraphGapPx?: number
  anchorRef?: RefObject<ReaderPositionAnchor | null>
  sentenceBlocks?: readonly BlockSentenceLayout[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blocks = useMemo(() => parseProseBlocks(content), [content])

  useImperativeHandle(
    anchorRef,
    (): ReaderPositionAnchor => ({
      fractionAt: (scrollTop) => {
        const doc = document.documentElement
        const scrollable = doc.scrollHeight - doc.clientHeight
        return clampFraction(scrollable > 0 ? scrollTop / scrollable : 0)
      },
      scrollTopFor: (fraction) => {
        const doc = document.documentElement
        return fractionToScrollTop(fraction, doc.scrollHeight - doc.clientHeight)
      },
      scrollToBlock: (blockIndex) => {
        containerRef.current
          ?.querySelector(`[data-block-index="${blockIndex}"]`)
          ?.scrollIntoView({ block: "center", behavior: "smooth" })
      },
    }),
    []
  )

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col", className)}
      style={{ gap: paragraphGapPx }}
    >
      {blocks.map((block, index) => (
        <div key={`block-${index}`} data-block-index={index}>
          <ProseBlockView block={block} sentenceLayout={sentenceBlocks?.[index]} />
        </div>
      ))}
    </div>
  )
}
