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
import { COVER_WIDTH_ASKED } from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import { ZoomableCover } from "akasha/story/ui/modules/cover-viewing/cover-viewing.module.code.tsx"
import {
  type SheetShown,
  SheetTabs,
} from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { useMemo } from "react"

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

type PlayerPanelProps = {
  readonly player: string
  readonly showsCover: boolean
  readonly sheet: SheetShown | null
}

export function PlayerCharacterPanel({ player, showsCover, sheet }: PlayerPanelProps) {
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
  const revealed = sheet?.sheet ?? null
  if (drawn.cover === null && revealed === null) return null
  return (
    <SurfaceProvider level={1} className={CARD}>
      {drawn.name === null && drawn.level === null ? null : (
        <div className="flex items-baseline justify-between gap-3 font-mono">
          <span className="min-w-0 break-words font-semibold text-primary text-sm">
            {drawn.name}
          </span>
          {drawn.level === null ? null : (
            <span className="flex-none font-semibold text-secondary text-sm">Lv {drawn.level}</span>
          )}
        </div>
      )}
      {drawn.cover === null || drawn.whole === null ? null : (
        <ZoomableCover
          name={drawn.name ?? "Your character"}
          source={drawn.cover}
          whole={drawn.whole}
        />
      )}
      {sheet === null || revealed === null ? null : (
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
