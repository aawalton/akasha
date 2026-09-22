"use client"

import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { playerOf } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"
import { useEffect, useState } from "react"

const ATTUNEMENT_TYPE = "attunement"

const ELEMENT_TYPE = "element"

const RANK_TYPE = "attunement-rank"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const CHARACTER_KEY = "character"

const ELEMENT_KEY = "element"

const RANK_KEY = "rank"

const COUNTER_KEY = "counter"

export type Titled = { readonly values: Record<string, unknown> }

export type Attuned = { readonly name: string; readonly value: number }

const NO_ATTUNEMENTS: readonly Attuned[] = []

const NO_TITLES: Record<string, string> = {}

export function titlesIn(rows: readonly Titled[]): Record<string, string> {
  const held: Record<string, string> = {}
  for (const row of rows) {
    const slug = row.values[SLUG_KEY]
    const title = row.values[TITLE_KEY]
    if (typeof slug !== "string" || slug === "") continue
    if (typeof title !== "string" || title === "") continue
    held[slug] = title
  }
  return held
}

function titleOf(named: unknown, titles: Record<string, string>): string | null {
  if (typeof named !== "string" || named === "") return null
  const slug = slugIn(named)
  if (slug === null || slug === "") return null
  return titles[slug] ?? null
}

export function attunementsIn(
  rows: readonly Titled[],
  elements: Record<string, string>,
  ranks: Record<string, string>
): readonly Attuned[] {
  const held: Attuned[] = []
  for (const row of rows) {
    const element = titleOf(row.values[ELEMENT_KEY], elements)
    const rank = titleOf(row.values[RANK_KEY], ranks)
    const counter = row.values[COUNTER_KEY]
    if (element === null || rank === null || typeof counter !== "number") continue
    held.push({ name: `${element} ${rank}`, value: counter })
  }
  held.sort((one, two) => one.name.localeCompare(two.name))
  return held
}

async function titlesOf(pageType: string): Promise<Record<string, string>> {
  const asked = await askComposed({ "page-type": pageType, keys: [SLUG_KEY, TITLE_KEY] })
  return asked.ok ? titlesIn(asked.answer.rows) : NO_TITLES
}

async function attunementsOf(slug: string): Promise<readonly Attuned[]> {
  const asked = await askComposed({
    "page-type": ATTUNEMENT_TYPE,
    where: { character: { "ends-with": `/${slug}` } },
    keys: [CHARACTER_KEY, ELEMENT_KEY, RANK_KEY, COUNTER_KEY],
  })
  if (!asked.ok || asked.answer.rows.length === 0) return NO_ATTUNEMENTS
  const [elements, ranks] = await Promise.all([titlesOf(ELEMENT_TYPE), titlesOf(RANK_TYPE)])
  return attunementsIn(asked.answer.rows, elements, ranks)
}

async function readAttunements(game: string): Promise<readonly Attuned[]> {
  const player = await playerOf(game)
  if (player === null) return NO_ATTUNEMENTS
  const slug = slugIn(player)
  if (slug === null || slug === "") return NO_ATTUNEMENTS
  return attunementsOf(slug)
}

export function useTowerAttunements(game: string | undefined): readonly Attuned[] {
  const asked = game ?? ""
  const [attunements, setAttunements] = useState<readonly Attuned[]>(NO_ATTUNEMENTS)

  useEffect(() => {
    setAttunements(NO_ATTUNEMENTS)
    if (asked === "") return
    let alive = true
    void (async () => {
      const held = await readAttunements(asked).catch(() => NO_ATTUNEMENTS)
      if (alive) setAttunements(held)
    })()
    return () => {
      alive = false
    }
  }, [asked])

  return attunements
}
