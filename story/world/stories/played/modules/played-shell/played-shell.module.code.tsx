"use client"

import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { PageTitleRow } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"

import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { characterPlayer } from "akasha/story/character/player/character-player.page-type.ts"
import type { ChapterProseTitles } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { PanelRun } from "akasha/story/game/game-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import {
  shownIn,
  usePanelsDrawn,
} from "akasha/story/game/game-panel/modules/panel-loading/panel-loading.module.code.ts"
import { above } from "akasha/story/game/game-panel/panel-place/pages/above.panel-place.ts"
import { aside } from "akasha/story/game/game-panel/panel-place/pages/aside.panel-place.ts"
import { run } from "akasha/story/game/game-panel/panel-place/pages/run.panel-place.ts"
import { panelPlace } from "akasha/story/game/game-panel/panel-place/panel-place.page-type.ts"
import { AwenStatusDrawer } from "akasha/story/ui/modules/status-drawer/status-drawer.module.code.tsx"

import { ActionBar } from "akasha/story/world/stories/played/modules/action-bar/action-bar.module.code.tsx"
import { sendAction } from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"
import { useGameBeside } from "akasha/story/world/stories/played/modules/game-beside/game-beside.module.code.ts"
import { PlayedChannel } from "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"
import { PlayedPanels } from "akasha/story/world/stories/played/modules/played-panels/played-panels.module.code.tsx"
import {
  PLAYED_CHAPTER_PAGE_TYPE_SLUG,
  PLAYED_CHAPTER_STORY_KEY,
  PLAYED_POSITION_KEY,
  PLAYED_TURN_COLLECTIONS_KEY,
  PLAYED_TURN_PAGE_TYPE_SLUG,
  playedChaptersOf,
  playedEnvelope,
  playedHrefsOf,
  playedTail,
  playedTurnsOf,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import {
  stateOf,
  usePlayedState,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"
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

const STORY_KEY = "story"

const ONE = 1

const TURN_TITLES: ChapterProseTitles = "hidden"

function textIn(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function lastTurnOf(rows: readonly Page[]): number | null {
  let last: number | null = null
  for (const row of rows) {
    const position = asNumber(row.position)
    if (position !== null && (last === null || position > last)) last = position
  }
  return last
}

export function PlayedShell({ pageTypeSlug, id }: { pageTypeSlug: PageTypeSlug; id: string }) {
  const { page } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const title = textIn(data.title)
  const slug = textIn(data.slug)
  const storyAddress = namedAs(pageTypeSlug, slug, null)

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
  const characterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: characterPlayer.slug,
      where: [{ key: STORY_KEY, eq: storyAddress }],
      limit: ONE,
    }),
    [storyAddress]
  )
  const characters = usePages(characterOptions)
  const characterAddress = namedAs(characterPlayer.slug, textIn(characters.rows[0]?.slug), null)
  const lastTurn = useMemo(() => lastTurnOf(turns.rows), [turns.rows])
  const filed = usePlayedState(characterAddress, lastTurn)
  const characterName = textIn(characters.rows[0]?.title)
  const state = useMemo(() => {
    if (filed === null || lastTurn === null) return null
    return stateOf(filed, lastTurn, characterName === "" ? undefined : characterName)
  }, [filed, lastTurn, characterName])
  const externalId = beside.kind === "read" ? beside.beside.externalId : undefined
  const coordinatorAgent = beside.kind === "read" ? beside.beside.coordinatorAgent : undefined
  const shown = usePanelsDrawn(stringsIn(data.panels))

  const runTurns = useMemo(
    () =>
      playedTurnsOf(
        tail.drawn.filter((row) => prose.read.has(row.id)),
        prose.prose
      ),
    [tail, prose]
  )
  const hrefById = useMemo(
    () => playedHrefsOf(runPageTypeSlug, tail.drawn),
    [runPageTypeSlug, tail]
  )
  const storyChapters = useMemo(
    () => (runIsTurns ? playedChaptersOf(chapters.rows) : []),
    [runIsTurns, chapters.rows]
  )
  const envelope = useMemo(
    () => playedEnvelope({ title, turns: runTurns, chapters: storyChapters, state }),
    [title, runTurns, storyChapters, state]
  )
  const panelRun = useMemo<PanelRun>(
    () => ({
      turns: envelope.chapterProse ?? [],
      beats: undefined,
      hrefById,
      earlier: tail.earlier,
      titles: runIsTurns ? TURN_TITLES : undefined,
      pastTurns: undefined,
      gameExternalId: externalId,
      submitPlayerAction: coordinatorAgent === undefined ? undefined : sendAction,
    }),
    [envelope, hrefById, tail, externalId, runIsTurns, coordinatorAgent]
  )

  if (chapters.isLoading || turns.isLoading) return null

  const titleRow = (
    <PageTitleRow
      pageTypeSlug={pageTypeSlug}
      id={id}
      title={title}
      isFavorite={data.favoritedAt != null}
    />
  )

  const bar =
    externalId === undefined || coordinatorAgent === undefined ? null : (
      <ActionBar gameExternalId={externalId} turnsSeen={turns.rows.length} />
    )

  if (tail.drawn.length === 0) {
    return (
      <div className={NARROW_PAGE}>
        {titleRow}
        {bar}
      </div>
    )
  }

  const drawnAside = shownIn(shown, ASIDE)
  const drawnRun = shownIn(shown, RUN)
  const hasPanels = drawnAside.length > 0
  const panels = <PlayedPanels shown={drawnAside} envelope={envelope} run={panelRun} />

  return (
    <div className={hasPanels ? WIDE_PAGE : NARROW_PAGE}>
      {titleRow}
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
          {bar}
        </div>
        {hasPanels ? <aside className={PANELS_ASIDE}>{panels}</aside> : null}
      </div>
    </div>
  )
}
