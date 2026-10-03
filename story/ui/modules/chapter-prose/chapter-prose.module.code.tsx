import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { splitInlineEmphasis } from "akasha/page/ui/component/modules/reader-prose/reader-prose.module.code.ts"
import { READER_PROSE_TYPOGRAPHY } from "akasha/page/ui/component/modules/reader-typography/reader-typography.module.code.ts"
import type { ClientProseSegment } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import {
  type InlineCover,
  InlineCoverFigure,
  type Placed,
  placedAfter,
} from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
import type { RerollAsker } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import {
  SystemCard,
  UnavailableSystemCard,
} from "akasha/story/ui/modules/system-card/system-card.module.code.tsx"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { SystemWindowCard } from "akasha/story/ui/modules/system-window-card/system-window-card.module.code.tsx"
import { Fragment, type ReactNode } from "react"

const HEADING_RE = /^#{1,6}\s+/

const PARAGRAPH_BREAK = /\n\n+/

const NO_COVERS: readonly InlineCover[] = []

function blocksOf(text: string): readonly string[] {
  return text
    .split(PARAGRAPH_BREAK)
    .map((b) => b.trim())
    .filter((b) => b !== "")
}

type Drawing = {
  readonly placed: Placed<InlineCover>
  readonly asker?: RerollAsker | undefined
}

function CoversAfter({ covers, drawing }: { covers: readonly InlineCover[]; drawing: Drawing }) {
  return (
    <>
      {covers.map((one) => (
        <InlineCoverFigure key={one.id} shown={one} asker={drawing.asker} />
      ))}
    </>
  )
}

function ProseBlocks({
  blocks,
  start,
  muted,
  drawing,
}: {
  blocks: readonly string[]
  start: number
  muted: boolean
  drawing: Drawing
}) {
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {HEADING_RE.test(block) ? (
            <h3
              className={`font-mono font-semibold text-[13px] ${
                muted ? "text-tertiary" : "text-accent"
              } uppercase tracking-[0.18em]`}
            >
              {block.replace(HEADING_RE, "")}
            </h3>
          ) : (
            <p className={`whitespace-pre-line ${muted ? "text-tertiary" : "text-primary"}`}>
              {splitInlineEmphasis(block).map((run, at) =>
                run.kind === "em" ? (
                  <em key={at}>{run.text}</em>
                ) : (
                  <Fragment key={at}>{run.text}</Fragment>
                )
              )}
            </p>
          )}
          <CoversAfter
            covers={drawing.placed.after.get(start + i) ?? NO_COVERS}
            drawing={drawing}
          />
        </Fragment>
      ))}
    </>
  )
}

function SegmentView({
  segment,
  blocks,
  start,
  drawing,
  muted,
  gameExternalId,
  submitPlayerAction,
  signedOutNotice,
}: {
  segment: ClientProseSegment
  blocks: readonly string[]
  start: number
  drawing: Drawing
  muted: boolean
  gameExternalId?: string
  submitPlayerAction: SubmitPlayerAction
  signedOutNotice: ReactNode
}) {
  switch (segment.kind) {
    case "prose":
      return <ProseBlocks blocks={blocks} start={start} muted={muted} drawing={drawing} />
    case "system":
      return segment.window !== undefined ? (
        <SystemWindowCard
          window={segment.window}
          gameExternalId={gameExternalId}
          windowId={segment.windowId}
          submitPlayerAction={submitPlayerAction}
          signedOutNotice={signedOutNotice}
        />
      ) : (
        <SystemCard title={segment.title} lines={segment.lines} dim={muted} />
      )
    case "unavailable":
      return <UnavailableSystemCard />
    default:
      return assertNever(segment)
  }
}

function startsOf(blocks: readonly (readonly string[])[]): readonly number[] {
  const starts: number[] = []
  let at = 0
  for (const one of blocks) {
    starts.push(at)
    at += one.length
  }
  return starts
}

export function ChapterProse({
  text,
  segments,
  covers,
  asker,
  muted,
  gameExternalId,
  submitPlayerAction,
  signedOutNotice,
}: {
  text: string
  segments?: readonly ClientProseSegment[]
  covers?: readonly InlineCover[]
  asker?: RerollAsker | undefined
  muted: boolean
  gameExternalId?: string
  submitPlayerAction: SubmitPlayerAction
  signedOutNotice: ReactNode
}) {
  const blocks =
    segments === undefined
      ? [blocksOf(text)]
      : segments.map((one) => (one.kind === "prose" ? blocksOf(one.text) : []))
  const starts = startsOf(blocks)
  const drawing: Drawing = {
    placed: placedAfter(blocks.flat(), covers ?? NO_COVERS),
    asker,
  }
  return (
    <section className="flex flex-col gap-3">
      <div className={`flex flex-col gap-[0.8em] ${READER_PROSE_TYPOGRAPHY}`}>
        {segments !== undefined ? (
          segments.map((segment, i) => (
            <SegmentView
              key={i}
              segment={segment}
              blocks={blocks[i] ?? []}
              start={starts[i] ?? 0}
              drawing={drawing}
              muted={muted}
              gameExternalId={gameExternalId}
              submitPlayerAction={submitPlayerAction}
              signedOutNotice={signedOutNotice}
            />
          ))
        ) : (
          <ProseBlocks blocks={blocks[0] ?? []} start={0} muted={muted} drawing={drawing} />
        )}
        <CoversAfter covers={drawing.placed.rest} drawing={drawing} />
      </div>
    </section>
  )
}
