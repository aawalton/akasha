import type { ChapterProsePastTurns, ChapterProseTitles } from "@alanwalton/awen-core/game-schema"
import { useUserId } from "@shared/pages-ui/use-user-id"
import { useReadEndObserver } from "@shared/pages-ui/components/use-read-end-observer"
import { Fragment, type RefObject, useCallback, useEffect, useRef } from "react"
import type { ClientStoryTurn } from "../lib/client-story-session"
import { projectProseRows } from "../lib/story-prose-dividers"
import { submitReadMark } from "../lib/submit-read-mark"
import { ChapterProse } from "./chapter-prose"
import { NewestDivider } from "./newest-divider"
import { SessionDivider } from "./session-divider"

export function ChapterProseChannel({
  turns,
  externalId,
  titles,
  pastTurns,
  newestRef,
}: {
  turns: readonly ClientStoryTurn[]
  externalId: string
  titles?: ChapterProseTitles
  pastTurns?: ChapterProsePastTurns
  newestRef?: RefObject<HTMLDivElement | null>
}) {
  const userId = useUserId()

  useInitialUnreadScroll(turns)

  if (turns.length === 0) {
    return <p className="font-read text-lg text-secondary">The tale has not yet begun.</p>
  }
  return (
    <div className="flex flex-col gap-3">
      <ReadingProgress turns={turns} />
      {projectProseRows(turns, { titles, pastTurns }).map(
        ({ turn, sessionDivider, newest, showTitle, muted }) => (
          <Fragment key={turn.id}>
            {sessionDivider !== null && <SessionDivider session={sessionDivider} />}
            {newest && <NewestDivider />}
            <div
              id={turnDomId(turn.id)}
              ref={newest ? newestRef : undefined}
              className="scroll-mt-[calc(var(--safe-area-top)+3.5rem)]"
            >
              <ChapterProse
                title={turn.title}
                text={turn.text}
                segments={turn.segments}
                showTitle={showTitle}
                muted={muted}
                gameExternalId={externalId}
              />
              <TurnReadSentinel
                turnId={turn.id}
                externalId={externalId}
                enabled={userId !== null}
              />
            </div>
          </Fragment>
        )
      )}
    </div>
  )
}

function turnDomId(turnId: string): string {
  return `awen-turn-${turnId}`
}

function scrollToTurn(turnId: string, behavior: ScrollBehavior): undefined {
  const el = document.getElementById(turnDomId(turnId))
  if (el === null) return
  el.scrollIntoView({ block: "start", behavior })
}

function useInitialUnreadScroll(turns: readonly ClientStoryTurn[]): undefined {
  const scrolled = useRef(false)
  useEffect(() => {
    if (scrolled.current || turns.length === 0) return
    scrolled.current = true
    const readCount = turns.reduce((n, t) => (t.fullyRead === true ? n + 1 : n), 0)
    if (readCount === 0) return
    const target =
      readCount === turns.length ? turns[turns.length - 1] : turns.find((t) => t.fullyRead !== true)
    if (target === undefined) return
    scrollToTurn(target.id, "auto")
  }, [turns])
}

function TurnReadSentinel({
  turnId,
  externalId,
  enabled,
}: {
  turnId: string
  externalId: string
  enabled: boolean
}) {
  const onReadToEnd = useCallback(() => {
    void submitReadMark({ externalId, turnId })
  }, [externalId, turnId])
  const ref = useReadEndObserver({ enabled, onReadToEnd, resetKey: turnId })
  return <div ref={ref} aria-hidden className="h-px" />
}

function ReadingProgress({ turns }: { turns: readonly ClientStoryTurn[] }) {
  const total = turns.length
  const read = turns.reduce((n, t) => (t.fullyRead === true ? n + 1 : n), 0)
  const firstUnread = turns.find((t) => t.fullyRead !== true)
  const onResume = useCallback(() => {
    if (firstUnread === undefined) return
    scrollToTurn(firstUnread.id, "smooth")
  }, [firstUnread])

  return (
    <div className="flex items-center justify-between font-mono text-tertiary text-xs">
      <span>
        {read} of {total} read
      </span>
      {firstUnread !== undefined ? (
        <button type="button" onClick={onResume} className="text-accent hover:underline">
          Jump to unread →
        </button>
      ) : null}
    </div>
  )
}
