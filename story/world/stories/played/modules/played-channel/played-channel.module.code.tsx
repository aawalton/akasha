"use client"

import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type { PanelRun } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import { NarrativeLog } from "akasha/story/ui/modules/narrative-log/narrative-log.module.code.tsx"
import { NewestDivider } from "akasha/story/ui/modules/newest-divider/newest-divider.module.code.tsx"
import {
  type ProseRenderOptions,
  projectProseRows,
} from "akasha/story/ui/modules/story-prose-dividers/story-prose-dividers.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { Fragment, useMemo } from "react"

const NO_GAME_MASTER = "No game master is listening to this game, so nothing sent here reaches it."

const TURN_LINK =
  "font-mono text-tertiary text-xs underline-offset-2 hover:text-accent hover:underline"

const refusePlayerAction: SubmitPlayerAction = () =>
  Promise.resolve({ ok: false, error: NO_GAME_MASTER })

export function PlayedChannel({
  turns,
  beats,
  hrefById,
  titles,
  pastTurns,
  gameExternalId,
  submitPlayerAction,
}: PanelRun) {
  const submit = submitPlayerAction ?? refusePlayerAction
  const rows = useMemo(() => {
    const options: ProseRenderOptions = {
      ...(titles === undefined ? {} : { titles }),
      ...(pastTurns === undefined ? {} : { pastTurns }),
    }
    return projectProseRows(turns, options)
  }, [turns, titles, pastTurns])

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {rows.map((row) => {
        const href = hrefById.get(row.turn.id)
        return (
          <Fragment key={row.turn.id}>
            {row.newest ? <NewestDivider /> : null}
            <ChapterProse
              title={row.turn.title}
              text={row.turn.text}
              segments={row.turn.segments}
              showTitle={row.showTitle}
              muted={row.muted}
              gameExternalId={gameExternalId}
              submitPlayerAction={submit}
              signedOutNotice={null}
            />
            {href === undefined || !row.showTitle ? null : (
              <PagesUILink href={href} className={TURN_LINK}>
                {row.turn.title}
              </PagesUILink>
            )}
          </Fragment>
        )
      })}
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
