"use client"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { cover } from "akasha/page/properties/cover.relation-property.ts"
import { coverSource } from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import {
  type CharacterCover,
  CharacterSteps,
  COVER_WIDTH_ASKED,
  characterShownAt,
  OtherCharacterCovers,
} from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { ZoomableCover } from "akasha/story/ui/modules/cover-viewing/cover-viewing.module.code.tsx"
import {
  type SheetShown,
  SheetTabs,
} from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { useMemo, useState } from "react"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const ONE = 1

const CARD = "flex flex-col gap-3 rounded-xl p-4 shadow-sm"

type PlayerDrawn = {
  readonly name: string | null
  readonly level: number | string | null
  readonly cover: string | null
  readonly whole: string | null
}

export function playerSlugOf(player: string): string {
  const address = addressIn(player)
  return address.kind === "qualified" && address.pageTypeSlug === characterPlayer.slug
    ? address.slug
    : ""
}

export function playerDrawnOf(
  row: Page | undefined,
  slug: string,
  showsCover: boolean,
  sheet: SheetShown | null
): PlayerDrawn {
  const title = row?.[TITLE_KEY]
  const named =
    typeof title === "string" && title !== ""
      ? title
      : (sheet?.sheet?.name ?? sheet?.sheet?.kind ?? (slug === "" ? null : titledAs(slug)))
  const shown = showsCover && row !== undefined
  return {
    name: named ?? null,
    level: sheet?.sheet?.level ?? null,
    cover: shown ? coverSource(row[cover.propertySlug], COVER_WIDTH_ASKED) : null,
    whole: shown ? coverSource(row[cover.propertySlug]) : null,
  }
}

type CharacterShown = PlayerDrawn & {
  readonly slug: string
  readonly isPlayer: boolean
}

export function charactersShownOf(
  drawn: PlayerDrawn,
  slug: string,
  revealed: boolean,
  others: readonly CharacterCover[]
): readonly CharacterShown[] {
  const theirs = others.map((one) => ({
    slug: one.slug,
    name: one.name,
    level: null,
    cover: one.source,
    whole: one.whole,
    isPlayer: false,
  }))
  if (drawn.cover === null && !revealed) return theirs
  return [{ ...drawn, slug, isPlayer: true }, ...theirs]
}

const NO_TURNS: readonly ClientStoryTurn[] = []

type PlayerPanelProps = {
  readonly player: string
  readonly showsCover: boolean
  readonly sheet: SheetShown | null
  readonly turns?: readonly ClientStoryTurn[] | undefined
  readonly turnsPageTypeSlug?: string | undefined
}

export function PlayerCharacterPanel({
  player,
  showsCover,
  sheet,
  turns = NO_TURNS,
  turnsPageTypeSlug,
}: PlayerPanelProps) {
  const slug = playerSlugOf(player)
  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: characterPlayer.slug,
      where: [{ key: SLUG_KEY, in: slug === "" ? [] : [slug] }],
      limit: ONE,
      shape: namedShapeDescriptor(characterPlayer.slug, {
        by: SLUG_KEY,
        values: slug === "" ? [] : [slug],
      }),
    }),
    [slug]
  )
  const rows = usePages(options).rows
  const drawn = playerDrawnOf(
    rows.find((row) => row[SLUG_KEY] === slug),
    slug,
    showsCover,
    sheet
  )
  return (
    <OtherCharacterCovers
      turns={turns}
      pageTypeSlug={turnsPageTypeSlug}
      drawn={(others) => <CharactersCard drawn={drawn} slug={slug} sheet={sheet} others={others} />}
    />
  )
}

type CharactersCardProps = {
  readonly drawn: PlayerDrawn
  readonly slug: string
  readonly sheet: SheetShown | null
  readonly others: readonly CharacterCover[]
}

function CharactersCard({ drawn, slug, sheet, others }: CharactersCardProps) {
  const [picked, setPicked] = useState<string | null>(null)
  const revealed = sheet?.sheet ?? null
  const characters = charactersShownOf(drawn, slug, revealed !== null, others)
  const at = characterShownAt(characters, picked)
  const shown = characters[at]
  if (shown === undefined) return null
  return (
    <SurfaceProvider level={1} className={CARD}>
      {shown.name === null && shown.level === null ? null : (
        <div className="flex items-baseline justify-between gap-3 font-mono">
          <span className="min-w-0 break-words font-semibold text-primary text-sm">
            {shown.name}
          </span>
          {shown.level === null ? null : (
            <span className="flex-none font-semibold text-secondary text-sm">Lv {shown.level}</span>
          )}
        </div>
      )}
      {shown.cover === null || shown.whole === null ? null : (
        <ZoomableCover
          key={shown.slug}
          name={shown.name ?? "Your character"}
          source={shown.cover}
          whole={shown.whole}
        />
      )}
      <CharacterSteps shown={characters} at={at} onPicked={setPicked} />
      {!shown.isPlayer || sheet === null || revealed === null ? null : (
        <SheetTabs
          sheet={revealed}
          game={sheet.game}
          workings={sheet.workings}
          showsStats={sheet.showsStats}
          showsBonds={sheet.showsBonds}
        />
      )}
    </SurfaceProvider>
  )
}
