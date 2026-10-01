"use client"

import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"

import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { PageTitleRow } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { usePageMenuExtra } from "akasha/page/ui/component/modules/page-detail-header-menu/page-detail-header-menu.module.code.tsx"
import { titleColorClass } from "akasha/page/ui/component/modules/title-color/title-color.module.code.ts"

import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { usePageTypeNamed } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
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
  PLAYED_SEAT_PAGE_TYPE_SLUG,
  PLAYED_SEAT_STORY_KEY,
  PLAYED_TURN_COLLECTIONS_KEY,
  PLAYED_TURN_PAGE_TYPE_SLUG,
  type PlayedList,
  playedAppointmentsListOf,
  playedChaptersOf,
  playedClockOf,
  playedCoversOf,
  playedEnvelope,
  playedListsOf,
  playedMaking,
  playedMakingKey,
  playedReady,
  playedTail,
  playedTurnsOf,
  playedUpcomingOf,
  playedWorking,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import {
  stateOf,
  usePlayedState,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"
import { usePlayedProse } from "akasha/story/world/stories/played/modules/prose-beside/prose-beside.module.code.ts"
import {
  undoOffered,
  useTurnUndo,
} from "akasha/story/world/stories/played/modules/turn-undo-control/turn-undo-control.module.code.tsx"
import { useCallback, useEffect, useMemo, useState } from "react"

const QUIET_TICK_MS = 15_000

type Quiet = { readonly key: string | null; readonly since: number }

function useQuietFor(key: string | null, working: boolean): number {
  const [quiet, setQuiet] = useState<Quiet>(() => ({ key, since: Date.now() }))
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    setQuiet({ key, since: Date.now() })
  }, [key, working])
  useEffect(() => {
    if (key === null) return
    const ticking = setInterval(() => {
      setNow(Date.now())
    }, QUIET_TICK_MS)
    return () => {
      clearInterval(ticking)
    }
  }, [key])
  if (working || quiet.key !== key) return 0
  return Math.max(0, now - quiet.since)
}

const TITLE_ROW_WIDE = "hidden min-[584px]:block"

const NOTE_LINE = "font-mono text-tertiary text-xs"

const GAME_UNREAD = "The game beside this story went unread, so only its own prose is drawn."

const ABOVE = namedAs(panelPlace.slug, above.slug, null)

const ASIDE = namedAs(panelPlace.slug, aside.slug, null)

const RUN = namedAs(panelPlace.slug, run.slug, null)

const STORY_KEY = "story"

const ONE = 1

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

function latestSlugOf(rows: readonly Page[]): string | null {
  let latest: { readonly slug: string; readonly position: number } | null = null
  for (const row of rows) {
    const position = asNumber(row.position)
    const slug = textIn(row.slug)
    if (position === null || slug === "") continue
    if (latest === null || position > latest.position) latest = { slug, position }
  }
  return latest?.slug ?? null
}

const LAST_TURN_POSITION = "lastTurnPosition"

function sheetTurnOf(ready: readonly Page[], chapters: readonly Page[]): number | null {
  const open = lastTurnOf(ready)
  if (open !== null) return open
  let last: number | null = null
  for (const row of chapters) {
    const position = asNumber(row[LAST_TURN_POSITION])
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
  const { pageType } = usePageTypeNamed(pageTypeSlug)
  const { propertyDefinitions } = parsePageTypeData(pageType?.properties)
  const data = toPageDataJSON(page.properties)
  const title = textIn(data.title)
  const titleColor = titleColorClass(propertyDefinitions, data)
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
  const seatOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: PLAYED_SEAT_PAGE_TYPE_SLUG,
      where: [{ key: PLAYED_SEAT_STORY_KEY, eq: storyAddress }],
    }),
    [storyAddress]
  )
  const chapters = usePages(chapterOptions)
  const turns = usePages(turnOptions)
  const seats = usePages(seatOptions)
  const ready = useMemo(() => playedReady(turns.rows), [turns.rows])
  const seated = seats.isLoading || seats.error !== null ? null : seats.rows
  const makingKey = useMemo(() => playedMakingKey(turns.rows), [turns.rows])
  const quietMs = useQuietFor(makingKey, playedWorking(seated))
  const making = useMemo(
    () => playedMaking(turns.rows, seated, quietMs),
    [turns.rows, seated, quietMs]
  )

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
  const latestTurn = useMemo(() => latestSlugOf(ready), [ready])
  const opensAt = data.opensAt
  const clock = useMemo(
    () => playedClockOf(ready, opensAt, chapters.rows),
    [ready, opensAt, chapters.rows]
  )
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
    () => playedUpcomingOf(appointments.rows, ready, opensAt, chapters.rows),
    [appointments.rows, ready, opensAt, chapters.rows]
  )
  const sheetTurn = useMemo(() => sheetTurnOf(ready, chapters.rows), [ready, chapters.rows])
  const filed = usePlayedState(characterAddress, sheetTurn)
  const characterName = textIn(characters.rows[0]?.title)
  const state = useMemo(() => {
    if (filed === null || sheetTurn === null) return null
    return stateOf(filed, sheetTurn, characterName === "" ? undefined : characterName)
  }, [filed, sheetTurn, characterName])
  const externalId = beside.kind === "read" ? beside.beside.externalId : undefined
  const coordinatorAgent = beside.kind === "read" ? beside.beside.coordinatorAgent : undefined
  const shown = usePanelsDrawn(stringsIn(data.panels))
  const userId = useUserId()
  const [waiting, setWaiting] = useState(false)
  const [undoneAt, setUndoneAt] = useState(0)
  const onUndone = useCallback(() => setUndoneAt(Date.now()), [])
  const playable = externalId !== undefined && coordinatorAgent !== undefined && userId !== null
  const offer = playable ? undoOffered(making?.slug ?? null, latestTurn, waiting) : null
  const undo = useTurnUndo({ gameExternalId: externalId ?? null, offer, onUndone })
  usePageMenuExtra(undo.item)

  const runTurns = useMemo(
    () =>
      playedTurnsOf(
        tail.drawn.filter((row) => prose.read.has(row.id)),
        prose.prose
      ),
    [tail, prose]
  )
  const storyChapters = useMemo(
    () => (runIsTurns ? playedChaptersOf(chapters.rows) : []),
    [runIsTurns, chapters.rows]
  )
  const envelope = useMemo(
    () => playedEnvelope({ title, turns: runTurns, chapters: storyChapters, state }),
    [title, runTurns, storyChapters, state]
  )
  const turnCovers = useMemo(() => playedCoversOf(chapters.rows, ready), [chapters.rows, ready])
  const player = textIn(characters.rows[0]?.slug) === "" ? "" : characterAddress
  const panelRun = useMemo<PanelRun>(
    () => ({
      clock,
      upcoming,
      turns: envelope.chapterProse ?? [],
      turnCovers,
      player,
      beats: undefined,
      earlier: tail.earlier,
      pastTurns: undefined,
      gameExternalId: externalId,
      submitPlayerAction: coordinatorAgent === undefined ? undefined : sendAction,
    }),
    [clock, upcoming, envelope, turnCovers, player, tail, externalId, coordinatorAgent]
  )

  if (chapters.isLoading || turns.isLoading) return null

  const titleRow = (
    <div className={TITLE_ROW_WIDE}>
      <PageTitleRow
        pageTypeSlug={pageTypeSlug}
        id={id}
        title={title}
        isFavorite={data.favoritedAt != null}
        titleColor={titleColor}
      />
    </div>
  )

  const bar =
    externalId === undefined || coordinatorAgent === undefined ? null : (
      <>
        {undo.dialog}
        <ActionBar
          gameExternalId={externalId}
          storyTitle={title}
          turnsSeen={ready.length}
          lastTurn={lastTurn}
          making={making}
          undoneAt={undoneAt}
          onWaiting={setWaiting}
        />
      </>
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
        drawnAside.length === 0 ? null : (
          <PlayedPanels shown={drawnAside} envelope={envelope} run={panelRun} />
        )
      }
    />
  )
}
