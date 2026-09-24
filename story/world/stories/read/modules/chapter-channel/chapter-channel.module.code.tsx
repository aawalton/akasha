"use client"

import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { NewestDivider } from "akasha/story/ui/modules/newest-divider/newest-divider.module.code.tsx"
import {
  type ProseRow,
  projectProseRows,
} from "akasha/story/ui/modules/story-prose-dividers/story-prose-dividers.module.code.ts"
import {
  channelSpan,
  frontierRowIndex,
  readChapterCount,
} from "akasha/story/world/stories/read/modules/chapter-turns/chapter-turns.module.code.ts"
import { Fragment, useCallback, useMemo } from "react"

const DOM_ID_PREFIX = "story-read-chapter-"

const COUNT_LINE = "flex items-center justify-between font-mono text-tertiary text-xs"

const ASIDE_LINE = "font-mono text-tertiary text-xs"

const RESUME_BUTTON = "text-accent hover:underline"

const ROW_LINE = "flex items-center gap-3 scroll-mt-[calc(var(--safe-area-top)+3.5rem)]"

const READ_TITLE =
  "font-read text-[15px] text-tertiary underline-offset-2 hover:text-accent hover:underline"

const UNREAD_TITLE =
  "font-read text-[15px] text-secondary underline-offset-2 hover:text-accent hover:underline"

function domIdOf(turnId: string): string {
  return `${DOM_ID_PREFIX}${turnId}`
}

function ChapterRow({ row, href }: { row: ProseRow; href: string | undefined }) {
  const titleClass = row.muted ? READ_TITLE : UNREAD_TITLE
  return (
    <div id={domIdOf(row.turn.id)} className={ROW_LINE}>
      {row.turn.turnNumber === undefined ? null : (
        <span className={ASIDE_LINE}>{row.turn.turnNumber}</span>
      )}
      {href === undefined ? (
        <span className={titleClass}>{row.turn.title}</span>
      ) : (
        <PagesUILink href={href} className={titleClass}>
          {row.turn.title}
        </PagesUILink>
      )}
    </div>
  )
}

export function ChapterChannel({
  turns,
  hrefById,
  newestAtMs,
}: {
  turns: readonly ClientStoryTurn[]
  hrefById: ReadonlyMap<string, string>
  newestAtMs: number | null
}) {
  const rows = useMemo(() => projectProseRows(turns, { pastTurns: "muted" }), [turns])
  const span = useMemo(() => channelSpan(rows), [rows])
  const frontier = rows[frontierRowIndex(rows)]
  const onResume = useCallback(() => {
    if (frontier === undefined) return
    const element = document.getElementById(domIdOf(frontier.turn.id))
    if (element === null) return
    element.scrollIntoView({ block: "center", behavior: "smooth" })
  }, [frontier])

  if (rows.length === 0) return null

  const read = readChapterCount(rows)
  const earlier = span.from
  const later = rows.length - span.to

  return (
    <section className="flex flex-col gap-3">
      <div className={COUNT_LINE}>
        <span>
          {read} of {rows.length} read
        </span>
        {newestAtMs === null ? null : (
          <span>newest {new Date(newestAtMs).toISOString().slice(0, 10)}</span>
        )}
        {read === rows.length ? null : (
          <button type="button" onClick={onResume} className={RESUME_BUTTON}>
            Jump to unread
          </button>
        )}
      </div>
      {earlier === 0 ? null : <p className={ASIDE_LINE}>{earlier} earlier chapters</p>}
      {rows.slice(span.from, span.to).map((row) => (
        <Fragment key={row.turn.id}>
          {row.newest ? <NewestDivider /> : null}
          <ChapterRow row={row} href={hrefById.get(row.turn.id)} />
        </Fragment>
      ))}
      {later === 0 ? null : <p className={ASIDE_LINE}>{later} later chapters</p>}
    </section>
  )
}
