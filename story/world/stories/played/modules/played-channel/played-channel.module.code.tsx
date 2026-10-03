"use client"

import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import { coversOf } from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
import { NarrativeLog } from "akasha/story/ui/modules/narrative-log/narrative-log.module.code.tsx"
import { NewestDivider } from "akasha/story/ui/modules/newest-divider/newest-divider.module.code.tsx"
import { playedAsker } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import {
  type ProseRenderOptions,
  projectProseRows,
} from "akasha/story/ui/modules/story-prose-dividers/story-prose-dividers.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import type { PanelRun } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { Fragment, useEffect, useMemo, useRef } from "react"

const NO_GAME_MASTER = "No game master is listening to this game, so nothing sent here reaches it."

const refusePlayerAction: SubmitPlayerAction = () =>
  Promise.resolve({ ok: false, error: NO_GAME_MASTER })

export function PlayedChannel({
  turns,
  turnCovers,
  beats,
  pastTurns,
  gameExternalId,
  submitPlayerAction,
}: PanelRun) {
  const submit = submitPlayerAction ?? refusePlayerAction
  const asker = playedAsker(gameExternalId)
  const rows = useMemo(() => {
    const options: ProseRenderOptions = pastTurns === undefined ? {} : { pastTurns }
    return projectProseRows(turns, options)
  }, [turns, pastTurns])
  const newestId = rows.at(-1)?.turn.id
  const newestAt = useRef<HTMLDivElement | null>(null)
  const newestSeen = useRef<string | null>(null)

  useEffect(() => {
    if (newestId === undefined) return
    const seen = newestSeen.current
    newestSeen.current = newestId
    if (seen === null || seen === newestId) return
    newestAt.current?.scrollIntoView({ block: "start", behavior: "smooth" })
  }, [newestId])

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {rows.map((row) => (
        <Fragment key={row.turn.id}>
          {row.newest ? (
            <div ref={newestAt} className="scroll-mt-6">
              <NewestDivider />
            </div>
          ) : null}
          <ChapterProse
            text={row.turn.text}
            segments={row.turn.segments}
            covers={coversOf(turnCovers, row.turn.id)}
            asker={asker}
            muted={row.muted}
            gameExternalId={gameExternalId}
            submitPlayerAction={submit}
            signedOutNotice={null}
          />
        </Fragment>
      ))}
      {beats === undefined ? null : (
        <NarrativeLog
          beats={beats}
          marksNewest={false}
          gameExternalId={gameExternalId}
          submitPlayerAction={submit}
          signedOutNotice={null}
        />
      )}
    </div>
  )
}
