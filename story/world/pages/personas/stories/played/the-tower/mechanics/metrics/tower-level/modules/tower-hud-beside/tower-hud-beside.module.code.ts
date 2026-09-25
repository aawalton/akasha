"use client"

import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { playerOf } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"
import { useEffect, useState } from "react"

const LEVEL_TYPE = "tower-level"

const POINT_TYPE = "tower-attribute-point"

const SLUG_KEY = "slug"

const VALUE_KEY = "value"

export type Counted = { readonly values: Record<string, unknown> }

type TowerCounts = {
  readonly level: number | null
  readonly attributePoints: number | null
}

const NOTHING_FILED: TowerCounts = { level: null, attributePoints: null }

export function countIn(rows: readonly Counted[]): number | null {
  for (const row of rows) {
    const held = row.values[VALUE_KEY]
    if (typeof held === "number") return held
  }
  return null
}

async function countOf(pageType: string, slug: string): Promise<number | null> {
  const asked = await askComposed({
    "page-type": pageType,
    where: { slug: { is: slug } },
    keys: [SLUG_KEY, VALUE_KEY],
  })
  return asked.ok ? countIn(asked.answer.rows) : null
}

async function readCounts(game: string): Promise<TowerCounts> {
  const player = await playerOf(game)
  const slug = player === null ? null : slugIn(player)
  if (slug === null || slug === "") return NOTHING_FILED
  const [level, attributePoints] = await Promise.all([
    countOf(LEVEL_TYPE, slug),
    countOf(POINT_TYPE, slug),
  ])
  return { level, attributePoints }
}

export function levelShown(filed: TowerCounts | null, kept: number | undefined): number | null {
  if (filed === null) return kept ?? null
  return filed.level ?? kept ?? null
}

export function useTowerCounts(game: string | undefined): TowerCounts | null {
  const asked = game ?? ""
  const [counts, setCounts] = useState<TowerCounts | null>(asked === "" ? NOTHING_FILED : null)

  useEffect(() => {
    setCounts(asked === "" ? NOTHING_FILED : null)
    if (asked === "") return
    let alive = true
    void (async () => {
      const held = await readCounts(asked).catch(() => NOTHING_FILED)
      if (alive) setCounts(held)
    })()
    return () => {
      alive = false
    }
  }, [asked])

  return counts
}
