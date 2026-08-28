import { READER_PROSE_TYPOGRAPHY } from "@shared/pages-ui/components/reader-typography"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { ClientProseSegment } from "../lib/client-story-session"
import { SystemCard, UnavailableSystemCard } from "./system-card"
import { SystemWindowCard } from "./system-window-card"

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
}: {
  segment: ClientProseSegment
  muted: boolean
  gameExternalId?: string
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
}: {
  title: string
  text: string
  segments?: readonly ClientProseSegment[]
  showTitle: boolean
  muted: boolean
  gameExternalId?: string
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
            <SegmentView key={i} segment={segment} muted={muted} gameExternalId={gameExternalId} />
          ))
        ) : (
          <ProseBlocks text={text} muted={muted} />
        )}
      </div>
    </section>
  )
}
