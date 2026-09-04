import { READER_PROSE_TYPOGRAPHY } from "@akasha/pages-ui-components/reader-typography"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { ReactNode } from "react"
import type { ClientProseSegment } from "../client-story-session/client-story-session.module.code.ts"
import { SystemCard, UnavailableSystemCard } from "../system-card/system-card.module.code.tsx"
import type { SubmitPlayerAction } from "../system-choice-card/system-choice-card.module.code.tsx"
import { SystemWindowCard } from "../system-window-card/system-window-card.module.code.tsx"

const HEADING_RE = /^#{1,6}\s+/

function ProseBlocks({ text, muted }: { text: string; muted: boolean }) {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter((b) => b !== "")
  return (
    <>
      {blocks.map((block, i) =>
        HEADING_RE.test(block) ? (
          <h3
            key={i}
            className={`font-mono font-semibold text-[13px] ${
              muted ? "text-tertiary" : "text-accent"
            } uppercase tracking-[0.18em]`}
          >
            {block.replace(HEADING_RE, "")}
          </h3>
        ) : (
          <p key={i} className={`whitespace-pre-line ${muted ? "text-tertiary" : "text-primary"}`}>
            {block}
          </p>
        )
      )}
    </>
  )
}

function SegmentView({
  segment,
  muted,
  gameExternalId,
  submitPlayerAction,
  signedOutNotice,
}: {
  segment: ClientProseSegment
  muted: boolean
  gameExternalId?: string
  submitPlayerAction: SubmitPlayerAction
  signedOutNotice: ReactNode
}) {
  switch (segment.kind) {
    case "prose":
      return <ProseBlocks text={segment.text} muted={muted} />
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

export function ChapterProse({
  title,
  text,
  segments,
  showTitle,
  muted,
  gameExternalId,
  submitPlayerAction,
  signedOutNotice,
}: {
  title: string
  text: string
  segments?: readonly ClientProseSegment[]
  showTitle: boolean
  muted: boolean
  gameExternalId?: string
  submitPlayerAction: SubmitPlayerAction
  signedOutNotice: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      {showTitle ? (
        <h2
          className={`font-mono text-[11px] ${
            muted ? "text-tertiary" : "text-blue"
          } uppercase tracking-[0.28em]`}
        >
          {title}
        </h2>
      ) : null}
      <div className={`flex flex-col gap-[0.8em] ${READER_PROSE_TYPOGRAPHY}`}>
        {segments !== undefined ? (
          segments.map((segment, i) => (
            <SegmentView
              key={i}
              segment={segment}
              muted={muted}
              gameExternalId={gameExternalId}
              submitPlayerAction={submitPlayerAction}
              signedOutNotice={signedOutNotice}
            />
          ))
        ) : (
          <ProseBlocks text={text} muted={muted} />
        )}
      </div>
    </section>
  )
}
