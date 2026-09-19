"use client"

import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { AwenStatusDrawer } from "akasha/story/ui/modules/status-drawer/status-drawer.module.code.tsx"
import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"
import { useGameBeside } from "akasha/story/world/stories/played/modules/game-beside/game-beside.module.code.ts"
import { PlayedChannel } from "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"
import {
  PlayedPanels,
  panelsAsked,
} from "akasha/story/world/stories/played/modules/played-panels/played-panels.module.code.tsx"
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

const PANELS_ASIDE = "hidden flex-col gap-4 lg:sticky lg:top-6 lg:self-start min-[584px]:flex"

const NOTE_LINE = "font-mono text-tertiary text-xs"

const GAME_UNREAD = "The game beside this story went unread, so only its own prose is drawn."

function textIn(value: unknown): string {
  return typeof value === "string" ? value : ""
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
  const display = beside.kind === "read" ? beside.beside.display : null
  const state = beside.kind === "read" ? beside.beside.state : null
  const externalId = beside.kind === "read" ? beside.beside.externalId : undefined

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

  if (chapters.isLoading || turns.isLoading) return null
  if (tail.drawn.length === 0) return null

  const hasPanels = panelsAsked(modules)
  const panels = <PlayedPanels modules={modules} envelope={envelope} />

  return (
    <div className={hasPanels ? WIDE_PAGE : NARROW_PAGE}>
      {beside.kind === "unread" ? <p className={NOTE_LINE}>{GAME_UNREAD}</p> : null}
      {hasPanels ? <AwenStatusDrawer statusPanels={panels} /> : null}
      {modules.storySoFar === undefined ? null : (
        <StorySoFar chapters={envelope.storySoFar ?? []} />
      )}
      <div className={hasPanels ? RUN_WITH_PANELS : RUN_ALONE}>
        <PlayedChannel
          turns={envelope.chapterProse ?? []}
          beats={modules.beatLog === undefined ? undefined : (envelope.beatLog ?? null)}
          hrefById={hrefById}
          earlier={tail.earlier}
          titles={modules.chapterProse?.titles}
          pastTurns={modules.chapterProse?.pastTurns}
          gameExternalId={externalId}
        />
        {hasPanels ? <aside className={PANELS_ASIDE}>{panels}</aside> : null}
      </div>
    </div>
  )
}
