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
  shownIn,
  usePanelsDrawn,
} from "akasha/story/ui/played-panel/modules/panel-loading/panel-loading.module.code.ts"
import { aside } from "akasha/story/ui/played-panel/panel-place/pages/aside.panel-place.ts"
import { panelPlace } from "akasha/story/ui/played-panel/panel-place/panel-place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
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
import { type ReactNode, useMemo } from "react"

const ASIDE = namedAs(panelPlace.slug, aside.slug, null)

const PROSE_COLUMN = "mx-auto w-full min-w-0 max-w-[68ch]"

const SLUG_KEY = "slug"

const STORY_KEY = "story"

const ONE = 1

function textIn(value: unknown): string {
  return stringIn(value) ?? ""
}

export function chapterDisclosed(stepStatus: unknown): boolean {
  return (stepIn(stepStatus) ?? PLAYER) === PLAYER
}

export type ChapterShown = {
  readonly id: string
  readonly title: string
  readonly position: number | null
  readonly cover: string
  readonly disclosed: boolean
}

export function chapterTurnsOf(chapter: ChapterShown): readonly ClientStoryTurn[] {
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

export function chapterCoversOf(chapter: ChapterShown): readonly PlayedTurnCover[] {
  if (!chapter.disclosed || chapter.cover === "") return []
  return [{ id: chapter.id, number: chapter.position ?? ONE, cover: chapter.cover }]
}

type ChapterPanelsProps = {
  readonly pageTypeSlug: PageTypeSlug
  readonly id: string
  readonly children: ReactNode
}

export function ChapterPanels({ pageTypeSlug, id, children }: ChapterPanelsProps) {
  return (
    <PlayedLayout
      head={null}
      panelsAbove={null}
      runDrawn={<div className={PROSE_COLUMN}>{children}</div>}
      panelsAside={<ChapterAside pageTypeSlug={pageTypeSlug} id={id} />}
    />
  )
}

function ChapterAside({ pageTypeSlug, id }: Omit<ChapterPanelsProps, "children">) {
  const { page } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const storyAddress = textIn(data.story)
  const story = addressIn(storyAddress)
  if (page === null || story.kind !== "qualified" || story.slug === "") return null
  const chapter: ChapterShown = {
    id,
    title: textIn(data.title),
    position: asNumber(data.position),
    cover: textIn(data.cover),
    disclosed: chapterDisclosed(data.stepStatus),
  }
  return (
    <StoryAside
      pageTypeSlug={pageTypeSlug}
      chapter={chapter}
      storyAddress={storyAddress}
      storyPageTypeSlug={story.pageTypeSlug}
      storySlug={story.slug}
    />
  )
}

type StoryAsideProps = {
  readonly pageTypeSlug: PageTypeSlug
  readonly chapter: ChapterShown
  readonly storyAddress: string
  readonly storyPageTypeSlug: string
  readonly storySlug: string
}

function StoryAside({
  pageTypeSlug,
  chapter,
  storyAddress,
  storyPageTypeSlug,
  storySlug,
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
  const shown = usePanelsDrawn(stringsIn(storyRow?.panels))

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
      player,
      beats: undefined,
      earlier: 0,
      pastTurns: undefined,
      gameExternalId: undefined,
      submitPlayerAction: undefined,
    }),
    [turns, pageTypeSlug, chapter, player]
  )
  const drawn = shownIn(shown, ASIDE)
  if (drawn.length === 0) return null
  return <PlayedPanels shown={drawn} envelope={envelope} run={run} />
}
