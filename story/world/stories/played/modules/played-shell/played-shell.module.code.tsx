"use client"

import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { gameEntity } from "akasha/story/game/entity/game-entity.page-type.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import type { PanelRun } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import {
  shownIn,
  usePanelsDrawn,
} from "akasha/story/game/panel/modules/panel-loading/panel-loading.module.code.ts"
import { above } from "akasha/story/game/panel/panel-place/pages/above.panel-place.ts"
import { aside } from "akasha/story/game/panel/panel-place/pages/aside.panel-place.ts"
import { run } from "akasha/story/game/panel/panel-place/pages/run.panel-place.ts"
import { panelPlace } from "akasha/story/game/panel/panel-place/panel-place.page-type.ts"
import { gameQuest } from "akasha/story/game/quest/game-quest.page-type.ts"
import { gameTurn } from "akasha/story/game/turn/game-turn.page-type.ts"
import { stateOf } from "akasha/story/game/turn/modules/turn-state/turn-state.module.code.ts"
import { AwenStatusDrawer } from "akasha/story/ui/modules/status-drawer/status-drawer.module.code.tsx"
import { useGameBeside } from "akasha/story/world/stories/played/modules/game-beside/game-beside.module.code.ts"
import { PlayedChannel } from "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"
import { PlayedPanels } from "akasha/story/world/stories/played/modules/played-panels/played-panels.module.code.tsx"
import {
  PLAYED_CHAPTER_PAGE_TYPE_SLUG,
  PLAYED_CHAPTER_STORY_KEY,
  PLAYED_POSITION_KEY,
  PLAYED_TURN_COLLECTIONS_KEY,
  PLAYED_TURN_PAGE_TYPE_SLUG,
  panelsDrawnHere,
  playedChaptersOf,
  playedEnvelope,
  playedHrefsOf,
  playedTail,
  playedTurnsOf,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import { usePlayedProse } from "akasha/story/world/stories/played/modules/prose-beside/prose-beside.module.code.ts"
import { useMemo } from "react"

const WIDE_PAGE = "mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-6 py-6"

const NARROW_PAGE = "mx-auto flex w-full max-w-[820px] flex-col gap-6 px-6 py-6"

const RUN_WITH_PANELS = "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]"

const RUN_ALONE = "flex flex-col gap-6"

const RUN_COLUMN = "flex min-w-0 flex-col gap-6"

const PANELS_ASIDE = "hidden flex-col gap-4 lg:sticky lg:top-6 lg:self-start min-[584px]:flex"

const NOTE_LINE = "font-mono text-tertiary text-xs"

const GAME_UNREAD = "The game beside this story went unread, so only its own prose is drawn."

const ABOVE = namedAs(panelPlace.slug, above.slug, null)

const ASIDE = namedAs(panelPlace.slug, aside.slug, null)

const RUN = namedAs(panelPlace.slug, run.slug, null)

const GAME_KEY = "game"

const NUMBER_KEY = "number"

const SLUG_KEY = "slug"

const ONE = 1

function textIn(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function slugOf(address: string | undefined): string {
  if (address === undefined) return ""
  const named = addressIn(address)
  return named.kind === "qualified" ? named.slug : address
}

export function PlayedShell({ pageTypeSlug, id }: { pageTypeSlug: PageTypeSlug; id: string }) {
  const { page } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const title = textIn(data.title)
  const slug = textIn(data.slug)
  const storyAddress = namedAs(pageTypeSlug, slug, null)
  const gameAddress = namedAs(game.slug, slug, null)

  const chapterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: PLAYED_CHAPTER_PAGE_TYPE_SLUG,
      where: [{ key: PLAYED_CHAPTER_STORY_KEY, eq: storyAddress }],
      order: [{ by: PLAYED_POSITION_KEY, dir: "asc" }],
    }),
    [storyAddress]
  )
  const turnOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: PLAYED_TURN_PAGE_TYPE_SLUG,
      where: [{ key: PLAYED_TURN_COLLECTIONS_KEY, includes: storyAddress }],
      order: [{ by: PLAYED_POSITION_KEY, dir: "asc" }],
    }),
    [storyAddress]
  )
  const chapters = usePages(chapterOptions)
  const turns = usePages(turnOptions)

  const runIsTurns = turns.rows.length > 0
  const runPageTypeSlug = runIsTurns ? PLAYED_TURN_PAGE_TYPE_SLUG : PLAYED_CHAPTER_PAGE_TYPE_SLUG
  const tail = useMemo(
    () => playedTail(runIsTurns ? turns.rows : chapters.rows),
    [runIsTurns, turns.rows, chapters.rows]
  )
  const drawnIds = useMemo(() => tail.drawn.map((row) => row.id), [tail])
  const prose = usePlayedProse(runPageTypeSlug, drawnIds)

  const beside = useGameBeside(slug)
  const display = beside.kind === "read" ? beside.beside.display : null
  const playerSlug = slugOf(beside.kind === "read" ? beside.beside.player : undefined)
  const gameTurnOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: gameTurn.slug,
      where: [{ key: GAME_KEY, eq: gameAddress }],
      order: [{ by: NUMBER_KEY, dir: "asc" }],
    }),
    [gameAddress]
  )
  const playerOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: gameEntity.slug,
      where: [{ key: SLUG_KEY, eq: playerSlug }],
      limit: ONE,
    }),
    [playerSlug]
  )
  const questOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({ pageTypeSlug: gameQuest.slug, where: [{ key: GAME_KEY, eq: gameAddress }] }),
    [gameAddress]
  )
  const gameTurns = usePages(gameTurnOptions)
  const players = usePages(playerOptions)
  const quests = usePages(questOptions)
  const state = useMemo(
    () => stateOf(gameTurns.rows, players.rows[0] ?? null, quests.rows),
    [gameTurns.rows, players.rows, quests.rows]
  )
  const externalId = beside.kind === "read" ? beside.beside.externalId : undefined
  const shown = usePanelsDrawn(beside.kind === "read" ? beside.beside.panels : [])

  const modules = useMemo(() => panelsDrawnHere(display?.modules ?? null), [display])
  const runTurns = useMemo(() => playedTurnsOf(tail.drawn, prose), [tail, prose])
  const hrefById = useMemo(
    () => playedHrefsOf(runPageTypeSlug, tail.drawn),
    [runPageTypeSlug, tail]
  )
  const storyChapters = useMemo(
    () => (runIsTurns ? playedChaptersOf(chapters.rows) : []),
    [runIsTurns, chapters.rows]
  )
  const envelope = useMemo(
    () => playedEnvelope({ title, modules, turns: runTurns, chapters: storyChapters, state }),
    [title, modules, runTurns, storyChapters, state]
  )
  const panelRun = useMemo<PanelRun>(
    () => ({
      turns: envelope.chapterProse ?? [],
      beats: modules.beatLog === undefined ? undefined : (envelope.beatLog ?? null),
      hrefById,
      earlier: tail.earlier,
      titles: modules.chapterProse?.titles,
      pastTurns: modules.chapterProse?.pastTurns,
      gameExternalId: externalId,
    }),
    [envelope, modules, hrefById, tail, externalId]
  )

  if (chapters.isLoading || turns.isLoading || gameTurns.isLoading) return null
  if (tail.drawn.length === 0) return null

  const drawnAside = shownIn(shown, ASIDE)
  const drawnRun = shownIn(shown, RUN)
  const hasPanels = drawnAside.length > 0
  const panels = <PlayedPanels shown={drawnAside} envelope={envelope} run={panelRun} />

  return (
    <div className={hasPanels ? WIDE_PAGE : NARROW_PAGE}>
      {beside.kind === "unread" ? <p className={NOTE_LINE}>{GAME_UNREAD}</p> : null}
      {hasPanels ? <AwenStatusDrawer statusPanels={panels} /> : null}
      <PlayedPanels shown={shownIn(shown, ABOVE)} envelope={envelope} run={panelRun} />
      <div className={hasPanels ? RUN_WITH_PANELS : RUN_ALONE}>
        <div className={RUN_COLUMN}>
          {drawnRun.length === 0 ? (
            <PlayedChannel {...panelRun} />
          ) : (
            <PlayedPanels shown={drawnRun} envelope={envelope} run={panelRun} />
          )}
        </div>
        {hasPanels ? <aside className={PANELS_ASIDE}>{panels}</aside> : null}
      </div>
    </div>
  )
}
