"use client"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@shared/design-primitives/components/context-menu"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { cn } from "@shared/design-primitives/utils/cn"
import { Fragment } from "react"
import { useSentenceNarration } from "../media/sentence-narration-context"
import { type ProseBlock, splitInlineEmphasis } from "./reader-prose"
import type { BlockSentenceLayout, SentenceRun } from "./reader-sentence-layout"

const SENTENCE_SPAN_CLASS =
  "rounded-sm transition-colors duration-200 data-[sentence-active]:bg-primary/10"

interface SentenceGroup {
  readonly sentenceIndex: number
  readonly runs: readonly SentenceRun[]
}

function groupRunsBySentence(runs: readonly SentenceRun[]): readonly SentenceGroup[] {
  const groups: { sentenceIndex: number; runs: SentenceRun[] }[] = []
  for (const run of runs) {
    const last = groups[groups.length - 1]
    if (last !== undefined && last.sentenceIndex === run.sentenceIndex) {
      last.runs.push(run)
    } else {
      groups.push({ sentenceIndex: run.sentenceIndex, runs: [run] })
    }
  }
  return groups
}

function SentenceRuns({ runs }: { runs: readonly SentenceRun[] }) {
  return (
    <>
      {runs.map((run, index) =>
        run.kind === "em" ? (
          <em key={`em-${index}`}>{run.text}</em>
        ) : (
          <Fragment key={`text-${index}`}>{run.text}</Fragment>
        )
      )}
    </>
  )
}

export function ProseBlockView({
  block,
  sentenceLayout,
}: {
  block: ProseBlock
  sentenceLayout?: BlockSentenceLayout
}) {
  const surface = useSurface()
  const { playFromSentence } = useSentenceNarration()
  if (block.kind === "scene-break") {
    return <hr aria-hidden className="mx-auto w-16 border-primary/15 border-t" />
  }
  if (block.kind === "fence") {
    return (
      <pre
        className={cn(
          surfaceClass(surface + 1),
          "overflow-x-auto whitespace-pre rounded p-3 font-mono text-secondary text-sm"
        )}
      >
        {block.text}
      </pre>
    )
  }
  if (sentenceLayout === undefined) {
    return (
      <p className="m-0">
        {splitInlineEmphasis(block.text).map((segment, index) =>
          segment.kind === "em" ? (
            <em key={`em-${index}`}>{segment.text}</em>
          ) : (
            <Fragment key={`text-${index}`}>{segment.text}</Fragment>
          )
        )}
      </p>
    )
  }
  return (
    <p className="m-0">
      {groupRunsBySentence(sentenceLayout.runs).map((group) => (
        <ContextMenu key={`sentence-${group.sentenceIndex}`}>
          <ContextMenuTrigger asChild>
            <span data-sentence-index={group.sentenceIndex} className={SENTENCE_SPAN_CLASS}>
              <SentenceRuns runs={group.runs} />
            </span>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => playFromSentence(group.sentenceIndex)}>
              Play Audio from this sentence
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </p>
  )
}
