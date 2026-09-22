"use client"

import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { playerOf } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"
import { useEffect, useState } from "react"

const ATTRIBUTE_TYPE = "tower-attribute"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const VALUE_KEY = "value"

const OPENING = "tower-"

const NO_SCORES: Record<string, number> = {}

export type Scored = { readonly values: Record<string, unknown> }

function namedBy(held: unknown): string | null {
  if (typeof held !== "string" || !held.startsWith(OPENING)) return null
  const named = held.slice(OPENING.length)
  return named === "" ? null : named.toUpperCase()
}

export function scoresIn(rows: readonly Scored[]): Record<string, number> {
  const held: [string, number][] = []
  for (const row of rows) {
    const named = namedBy(row.values[TYPE_KEY])
    const score = row.values[VALUE_KEY]
    if (named === null || typeof score !== "number") continue
    held.push([named, score])
  }
  held.sort((one, two) => one[0].localeCompare(two[0]))
  return Object.fromEntries(held)
}

async function scoresOf(slug: string): Promise<Record<string, number>> {
  const asked = await askComposed({
    "page-type": ATTRIBUTE_TYPE,
    where: { slug: { is: slug } },
    keys: [TYPE_KEY, SLUG_KEY, VALUE_KEY],
  })
  return asked.ok ? scoresIn(asked.answer.rows) : NO_SCORES
}

async function readScores(game: string): Promise<Record<string, number>> {
  const player = await playerOf(game)
  if (player === null) return NO_SCORES
  const slug = slugIn(player)
  if (slug === null || slug === "") return NO_SCORES
  return scoresOf(slug)
}

export function useTowerAttributes(game: string | undefined): Record<string, number> {
  const asked = game ?? ""
  const [scores, setScores] = useState<Record<string, number>>(NO_SCORES)

  useEffect(() => {
    setScores(NO_SCORES)
    if (asked === "") return
    let alive = true
    void (async () => {
      const held = await readScores(asked).catch(() => NO_SCORES)
      if (alive) setScores(held)
    })()
    return () => {
      alive = false
    }
  }, [asked])

  return scores
}
