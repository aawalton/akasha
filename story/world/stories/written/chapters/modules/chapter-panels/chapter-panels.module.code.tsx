"use client"

import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import type {
  PanelRun,
  PlayedTurnCover,
} from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import {
  type Shown,
  shownIn,
  usePanelsHeld,
} from "akasha/story/ui/played-panel/modules/panel-loading/panel-loading.module.code.ts"
import { aside } from "akasha/story/ui/played-panel/panel-place/pages/aside.panel-place.ts"
import { panelPlace } from "akasha/story/ui/played-panel/panel-place/panel-place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { useFirstRead } from "akasha/story/world/stories/played/modules/action-bar/action-bar.module.code.tsx"
import { PlayedLayout } from "akasha/story/world/stories/played/modules/played-layout/played-layout.module.code.tsx"
import { PlayedPanels } from "akasha/story/world/stories/played/modules/played-panels/played-panels.module.code.tsx"
import { playedEnvelope } from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import {
  stateOf,
  usePlayedState,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"
import {
  PLAYER,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { type ReactNode, useEffect, useMemo } from "react"

const ASIDE = namedAs(panelPlace.slug, aside.slug, null)

const NO_PANELS: readonly Shown[] = []

const UNSETTLED = "invisible"

const PROSE_COLUMN = "mx-auto w-full min-w-0 max-w-[68ch]"

const SLUG_KEY = "slug"

const STORY_KEY = "story"

const POSITION_KEY = "position"

const ONE = 1

function textIn(value: unknown): string {
  return stringIn(value) ?? ""
}

function chapterDisclosed(stepStatus: unknown): boolean {
  return (stepIn(stepStatus) ?? PLAYER) === PLAYER
}

type ChapterShown = {
  readonly id: string
  readonly title: string
  readonly position: number | null
  readonly cover: string
  readonly scenes: readonly string[]
  readonly disclosed: boolean
}

function chapterTurnsOf(chapter: ChapterShown): readonly ClientStoryTurn[] {
  if (!chapter.disclosed) return []
  return [
    {
      id: chapter.id,
      title: chapter.title,
      text: "",
      ...(chapter.position === null ? {} : { turnNumber: chapter.position }),
    },
  ]
}

function chapterCoversOf(chapter: ChapterShown): readonly PlayedTurnCover[] {
  if (!chapter.disclosed) return []
  if (chapter.scenes.length > 0) {
    return chapter.scenes.map((cover, at) => ({
      id: `${chapter.id}#${at + ONE}`,
      number: at + ONE,
      cover,
    }))
  }
  if (chapter.cover === "") return []
  return [{ id: chapter.id, number: chapter.position ?? ONE, cover: chapter.cover }]
}

type ChapterPanelsProps = {
  readonly pageTypeSlug: PageTypeSlug
  readonly id: string
  readonly children: ReactNode
}

export function ChapterPanels({ pageTypeSlug, id, children }: ChapterPanelsProps) {
  const [settled, onSettled] = useFirstRead()
  return (
    <div className={settled ? undefined : UNSETTLED}>
      <PlayedLayout
        head={null}
        panelsAbove={null}
        runDrawn={<div className={PROSE_COLUMN}>{children}</div>}
        underHeader
        panelsAside={<ChapterAside pageTypeSlug={pageTypeSlug} id={id} onSettled={onSettled} />}
      />
    </div>
  )
}

function chapterShownOf(id: string, data: Readonly<Record<string, unknown>>): ChapterShown {
  return {
    id,
    title: textIn(data.title),
    position: asNumber(data.position),
    cover: textIn(data.cover),
    scenes: stringsIn(data.scenes),
    disclosed: chapterDisclosed(data.stepStatus),
  }
}

type StoryPanelsProps = {
  readonly chapterPageTypeSlug: PageTypeSlug
  readonly storyPageTypeSlug: string
  readonly storySlug: string
  readonly children: ReactNode
}

export function StoryPanels({
  chapterPageTypeSlug,
  storyPageTypeSlug,
  storySlug,
  children,
}: StoryPanelsProps) {
  return (
    <PlayedLayout
      head={null}
      panelsAbove={null}
      runDrawn={children}
      panelsAside={
        storySlug === "" ? null : (
          <LatestChapterAside
            chapterPageTypeSlug={chapterPageTypeSlug}
            storyPageTypeSlug={storyPageTypeSlug}
            storySlug={storySlug}
          />
        )
      }
    />
  )
}

function LatestChapterAside({
  chapterPageTypeSlug,
  storyPageTypeSlug,
  storySlug,
}: Omit<StoryPanelsProps, "children">) {
  const storyAddress = namedAs(storyPageTypeSlug, storySlug, null)
  const chapterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: chapterPageTypeSlug,
      where: [{ key: STORY_KEY, eq: storyAddress }],
      order: [{ by: POSITION_KEY, dir: "asc" }],
      shape: namedShapeDescriptor(chapterPageTypeSlug, {
        by: "where",
        key: STORY_KEY,
        values: [storyAddress],
      }),
    }),
    [chapterPageTypeSlug, storyAddress]
  )
  const chapters = usePages(chapterOptions)
  const latest = chapters.rows.findLast((row) => chapterDisclosed(row.stepStatus))
  if (latest === undefined) return null
  return (
    <StoryAside
      pageTypeSlug={chapterPageTypeSlug}
      chapter={chapterShownOf(latest.id, latest)}
      storyAddress={storyAddress}
      storyPageTypeSlug={storyPageTypeSlug}
      storySlug={storySlug}
    />
  )
}

function ChapterAside({
  pageTypeSlug,
  id,
  onSettled,
}: Omit<ChapterPanelsProps, "children"> & { readonly onSettled: () => void }) {
  const { page } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const storyAddress = textIn(data.story)
  const story = addressIn(storyAddress)
  if (page === null || story.kind !== "qualified" || story.slug === "") return null
  const chapter = chapterShownOf(id, data)
  return (
    <StoryAside
      pageTypeSlug={pageTypeSlug}
      chapter={chapter}
      storyAddress={storyAddress}
      storyPageTypeSlug={story.pageTypeSlug}
      storySlug={story.slug}
      onSettled={onSettled}
    />
  )
}

type StoryAsideProps = {
  readonly pageTypeSlug: PageTypeSlug
  readonly chapter: ChapterShown
  readonly storyAddress: string
  readonly storyPageTypeSlug: string
  readonly storySlug: string
  readonly onSettled?: () => void
}

function StoryAside({
  pageTypeSlug,
  chapter,
  storyAddress,
  storyPageTypeSlug,
  storySlug,
  onSettled,
}: StoryAsideProps) {
  const storyOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: storyPageTypeSlug,
      where: [{ key: SLUG_KEY, eq: storySlug }],
      limit: ONE,
      shape: namedShapeDescriptor(storyPageTypeSlug, { by: SLUG_KEY, values: [storySlug] }),
    }),
    [storyPageTypeSlug, storySlug]
  )
  const stories = usePages(storyOptions)
  const storyRow = stories.rows[0]
  const held = usePanelsHeld(stringsIn(storyRow?.panels))
  const shown = held ?? NO_PANELS

  const characterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: characterPlayer.slug,
      where: [{ key: STORY_KEY, eq: storyAddress }],
      limit: ONE,
      shape: namedShapeDescriptor(characterPlayer.slug, {
        by: "where",
        key: STORY_KEY,
        values: [storyAddress],
      }),
    }),
    [storyAddress]
  )
  const characters = usePages(characterOptions)
  const playerSlug = textIn(characters.rows[0]?.slug)
  const player = playerSlug === "" ? "" : namedAs(characterPlayer.slug, playerSlug, null)
  const turn = chapter.disclosed ? (chapter.position ?? ONE) : null
  const filed = usePlayedState(player, turn)
  const characterName = textIn(characters.rows[0]?.title)
  const state = useMemo(() => {
    if (filed === null || turn === null) return null
    return stateOf(filed, turn, characterName === "" ? undefined : characterName)
  }, [filed, turn, characterName])

  const turns = useMemo(() => chapterTurnsOf(chapter), [chapter])
  const title = textIn(storyRow?.title)
  const envelope = useMemo(
    () => playedEnvelope({ title, turns, chapters: [], state }),
    [title, turns, state]
  )
  const run = useMemo<PanelRun>(
    () => ({
      clock: null,
      upcoming: [],
      turns,
      turnsPageTypeSlug: pageTypeSlug,
      turnCovers: chapterCoversOf(chapter),
      coversAreScenes: chapter.scenes.length > 0,
      player,
      beats: undefined,
      earlier: 0,
      pastTurns: undefined,
      gameExternalId: undefined,
      submitPlayerAction: undefined,
    }),
    [turns, pageTypeSlug, chapter, player]
  )
  const ready = held !== null && !stories.isLoading && !characters.isLoading
  useEffect(() => {
    if (ready) onSettled?.()
  }, [ready, onSettled])
  const drawn = shownIn(shown, ASIDE)
  if (drawn.length === 0) return null
  return <PlayedPanels shown={drawn} envelope={envelope} run={run} />
}
