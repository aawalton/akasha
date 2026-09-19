"use client"

import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type {
  ChapterProsePastTurns,
  ChapterProseTitles,
} from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import type { ClientBeat } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { NarrativeLog } from "akasha/story/ui/modules/narrative-log/narrative-log.module.code.tsx"
import { NewestDivider } from "akasha/story/ui/modules/newest-divider/newest-divider.module.code.tsx"
import {
  type ProseRenderOptions,
  projectProseRows,
} from "akasha/story/ui/modules/story-prose-dividers/story-prose-dividers.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { Fragment, useMemo } from "react"

const PLAY_IS_OVER = "This play is over, so nothing sent here reaches the game."

const ASIDE_LINE = "font-mono text-tertiary text-xs"

const TURN_LINK =
  "font-mono text-tertiary text-xs underline-offset-2 hover:text-accent hover:underline"

const refusePlayerAction: SubmitPlayerAction = () =>
  Promise.resolve({ ok: false, error: PLAY_IS_OVER })

export function PlayedChannel({
  turns,
  beats,
  hrefById,
  earlier,
  titles,
  pastTurns,
  gameExternalId,
}: {
  turns: readonly ClientStoryTurn[]
  beats: readonly ClientBeat[] | null | undefined
  hrefById: ReadonlyMap<string, string>
  earlier: number
  titles: ChapterProseTitles | undefined
  pastTurns: ChapterProsePastTurns | undefined
  gameExternalId: string | undefined
}) {
  const rows = useMemo(() => {
    const options: ProseRenderOptions = {
      ...(titles === undefined ? {} : { titles }),
      ...(pastTurns === undefined ? {} : { pastTurns }),
    }
    return projectProseRows(turns, options)
  }, [turns, titles, pastTurns])

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {earlier === 0 ? null : (
        <p className={ASIDE_LINE}>{earlier} earlier turns are not drawn here</p>
      )}
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
              submitPlayerAction={refusePlayerAction}
              signedOutNotice={null}
            />
            {href === undefined ? null : (
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
          gameExternalId={gameExternalId}
          submitPlayerAction={refusePlayerAction}
          signedOutNotice={null}
        />
      )}
    </div>
  )
}
