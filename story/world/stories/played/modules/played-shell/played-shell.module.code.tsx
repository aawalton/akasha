"use client"

import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { PageTitleRow } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"

import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  namedShapeDescriptor,
  type ShapeDescriptor,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ChapterProseTitles } from "akasha/story/engine/core/modules/story-display/story-display.module.code.ts"

import type { PanelRun } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import {
  shownIn,
  usePanelsDrawn,
} from "akasha/story/ui/played-panel/modules/panel-loading/panel-loading.module.code.ts"
import { above } from "akasha/story/ui/played-panel/panel-place/pages/above.panel-place.ts"
import { aside } from "akasha/story/ui/played-panel/panel-place/pages/aside.panel-place.ts"
import { run } from "akasha/story/ui/played-panel/panel-place/pages/run.panel-place.ts"
import { panelPlace } from "akasha/story/ui/played-panel/panel-place/panel-place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"

import { ActionBar } from "akasha/story/world/stories/played/modules/action-bar/action-bar.module.code.tsx"
import { sendAction } from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"
import { usePlayedBeside } from "akasha/story/world/stories/played/modules/played-beside/played-beside.module.code.ts"
import { PlayedChannel } from "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"
import {
  NARROW_PAGE,
  PlayedLayout,
} from "akasha/story/world/stories/played/modules/played-layout/played-layout.module.code.tsx"
import { PlayedPanels } from "akasha/story/world/stories/played/modules/played-panels/played-panels.module.code.tsx"
import {
  PLAYED_APPOINTMENT_AT_KEY,
  PLAYED_APPOINTMENT_PAGE_TYPE_SLUG,
  PLAYED_CHAPTER_PAGE_TYPE_SLUG,
  PLAYED_CHAPTER_STORY_KEY,
  PLAYED_POSITION_KEY,
  PLAYED_TURN_COLLECTIONS_KEY,
  PLAYED_TURN_PAGE_TYPE_SLUG,
  type PlayedList,
  playedAppointmentsListOf,
  playedChaptersOf,
  playedClockOf,
  playedEnvelope,
  playedHrefsOf,
  playedListsOf,
  playedMaking,
  playedReady,
  playedTail,
  playedTurnsOf,
  playedUpcomingOf,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import {
  stateOf,
  usePlayedState,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"
import { usePlayedProse } from "akasha/story/world/stories/played/modules/prose-beside/prose-beside.module.code.ts"
import { useMemo } from "react"

const TITLE_ROW_WIDE = "hidden min-[584px]:block"

const NOTE_LINE = "font-mono text-tertiary text-xs"

const CLOCK_LINE = "text-secondary text-sm"

const UPCOMING_LIST = "flex flex-col gap-1 text-sm text-tertiary"

const TIME_PANEL = "flex flex-col gap-2 rounded-xl p-4 shadow-sm"

const GAME_UNREAD = "The game beside this story went unread, so only its own prose is drawn."

const ABOVE = namedAs(panelPlace.slug, above.slug, null)

const ASIDE = namedAs(panelPlace.slug, aside.slug, null)

const RUN = namedAs(panelPlace.slug, run.slug, null)

const STORY_KEY = "story"

const ONE = 1

const TURN_TITLES: ChapterProseTitles = "hidden"

function shapeOf(list: PlayedList): ShapeDescriptor {
  return namedShapeDescriptor(list.pageTypeSlug, list.named)
}

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

type PlayedShellProps = {
  readonly pageTypeSlug: PageTypeSlug
  readonly id: string
  readonly page: PageWithProperties | null
}

export function PlayedShell({ pageTypeSlug, id, page }: PlayedShellProps) {
  if (page === null) return null
  return <PlayedStory pageTypeSlug={pageTypeSlug} id={id} page={page} />
}

function PlayedStory({
  pageTypeSlug,
  id,
  page,
}: PlayedShellProps & { readonly page: PageWithProperties }) {
  const data = toPageDataJSON(page.properties)
  const title = textIn(data.title)
  const slug = textIn(data.slug)
  const storyAddress = namedAs(pageTypeSlug, slug, null)
  const lists = useMemo(() => playedListsOf(storyAddress), [storyAddress])

  const chapterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: PLAYED_CHAPTER_PAGE_TYPE_SLUG,
      where: [{ key: PLAYED_CHAPTER_STORY_KEY, eq: storyAddress }],
      order: [{ by: PLAYED_POSITION_KEY, dir: "asc" }],
      shape: shapeOf(lists.chapters),
    }),
    [storyAddress, lists]
  )
  const turnOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: PLAYED_TURN_PAGE_TYPE_SLUG,
      where: [{ key: PLAYED_TURN_COLLECTIONS_KEY, includes: storyAddress }],
      order: [{ by: PLAYED_POSITION_KEY, dir: "asc" }],
      shape: shapeOf(lists.turns),
    }),
    [storyAddress, lists]
  )
  const chapters = usePages(chapterOptions)
  const turns = usePages(turnOptions)
  const ready = useMemo(() => playedReady(turns.rows), [turns.rows])
  const making = useMemo(() => playedMaking(turns.rows), [turns.rows])

  const runIsTurns = ready.length > 0
  const runPageTypeSlug = runIsTurns ? PLAYED_TURN_PAGE_TYPE_SLUG : PLAYED_CHAPTER_PAGE_TYPE_SLUG
  const tail = useMemo(
    () => playedTail(runIsTurns ? ready : chapters.rows),
    [runIsTurns, ready, chapters.rows]
  )
  const drawnIds = useMemo(() => tail.drawn.map((row) => row.id), [tail])
  const prose = usePlayedProse(runPageTypeSlug, drawnIds)

  const beside = usePlayedBeside(slug)
  const characterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: characterPlayer.slug,
      where: [{ key: STORY_KEY, eq: storyAddress }],
      limit: ONE,
      shape: shapeOf(lists.character),
    }),
    [storyAddress, lists]
  )
  const characters = usePages(characterOptions)
  const characterAddress = namedAs(characterPlayer.slug, textIn(characters.rows[0]?.slug), null)
  const lastTurn = useMemo(() => lastTurnOf(ready), [ready])
  const clock = useMemo(() => playedClockOf(ready), [ready])
  const appointmentOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: PLAYED_APPOINTMENT_PAGE_TYPE_SLUG,
      where: [{ key: "characters", includes: characterAddress }],
      order: [{ by: PLAYED_APPOINTMENT_AT_KEY, dir: "asc" }],
      shape: shapeOf(playedAppointmentsListOf(characterAddress)),
    }),
    [characterAddress]
  )
  const appointments = usePages(appointmentOptions)
  const upcoming = useMemo(
    () => playedUpcomingOf(appointments.rows, ready),
    [appointments.rows, ready]
  )
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
    <div className={TITLE_ROW_WIDE}>
      <PageTitleRow
        pageTypeSlug={pageTypeSlug}
        id={id}
        title={title}
        isFavorite={data.favoritedAt != null}
      />
    </div>
  )

  const bar =
    externalId === undefined || coordinatorAgent === undefined ? null : (
      <ActionBar
        gameExternalId={externalId}
        storyTitle={title}
        turnsSeen={ready.length}
        lastTurn={lastTurn}
        making={making}
      />
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
  const timeDrawn =
    clock === null && upcoming.length === 0 ? null : (
      <SurfaceProvider level={1} className={TIME_PANEL}>
        {clock === null ? null : <p className={CLOCK_LINE}>{clock}</p>}
        {upcoming.length === 0 ? null : (
          <ul className={UPCOMING_LIST}>
            {upcoming.map((one) => (
              <li key={one.id}>
                {one.when} · {one.title}
              </li>
            ))}
          </ul>
        )}
      </SurfaceProvider>
    )
  const drawnRun = shownIn(shown, RUN)

  return (
    <PlayedLayout
      head={
        <>
          {titleRow}
          {beside.kind === "unread" ? <p className={NOTE_LINE}>{GAME_UNREAD}</p> : null}
        </>
      }
      panelsAbove={
        <PlayedPanels shown={shownIn(shown, ABOVE)} envelope={envelope} run={panelRun} />
      }
      runDrawn={
        drawnRun.length === 0 ? (
          <PlayedChannel {...panelRun} />
        ) : (
          <PlayedPanels shown={drawnRun} envelope={envelope} run={panelRun} />
        )
      }
      bar={bar}
      panelsAside={
        drawnAside.length === 0 && timeDrawn === null ? null : (
          <>
            {timeDrawn}
            {drawnAside.length === 0 ? null : (
              <PlayedPanels shown={drawnAside} envelope={envelope} run={panelRun} />
            )}
          </>
        )
      }
    />
  )
}
