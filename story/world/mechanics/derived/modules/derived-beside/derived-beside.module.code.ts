"use client"

import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { item } from "akasha/story/item/item.page-type.ts"
import { metricCharacterAttribute } from "akasha/story/world/mechanics/metrics/metric-character/attribute/metric-character-attribute.page-type.ts"
import { metricItem } from "akasha/story/world/mechanics/metrics/metric-item/metric-item.page-type.ts"
import type {
  Reading,
  Sheet,
  Summed,
} from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { playerOf } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"
import { useEffect, useState } from "react"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const VALUE_KEY = "value"

const CHARACTER_KEY = "character"

const ITEM_KEY = "item"

const SLOT_KEY = "slot"

const EXTENDS_KEY = "extends"

const GEAR = namedAs(pageType.slug, metricItem.slug, null)

export type Working = { readonly title: string; readonly worked: (reading: Reading) => Summed }

const NO_DERIVED: Record<string, number> = {}

const NO_WORKINGS: readonly Working[] = []

export function heldIn(rows: readonly QueryRow[], into: Record<string, number>): undefined {
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined) continue
    into[type] = (into[type] ?? 0) + value
  }
  return undefined
}

export function derivedIn(held: Sheet, workings: readonly Working[]): Record<string, number> {
  const derived: Record<string, number> = {}
  for (const working of workings) {
    const summed = working.worked({ held })
    if ("answered" in summed) derived[working.title] = summed.answered
  }
  return derived
}

function wornIn(rows: readonly QueryRow[]): readonly string[] {
  const worn: string[] = []
  for (const row of rows) {
    const slug = textIn(row.values[SLUG_KEY])
    if (slug !== null && textIn(row.values[SLOT_KEY]) !== null) {
      worn.push(namedAs(item.slug, slug, null))
    }
  }
  return worn
}

function unwornIn(rows: readonly QueryRow[]): Record<string, number> {
  const held: Record<string, number> = {}
  for (const row of rows) {
    const slug = textIn(row.values[SLUG_KEY])
    if (slug !== null) held[slug] = 0
  }
  return held
}

async function readDerived(game: string, workings: readonly Working[]): Promise<Sheet> {
  const character = await playerOf(game)
  if (character === null) return NO_DERIVED
  const [attributes, items, gear] = await Promise.all([
    askComposed({
      "page-type": metricCharacterAttribute.slug,
      where: { character: { is: character } },
      keys: [TYPE_KEY, CHARACTER_KEY, VALUE_KEY],
    }),
    askComposed({
      "page-type": item.slug,
      where: { character: { is: character } },
      keys: [SLUG_KEY, CHARACTER_KEY, SLOT_KEY],
    }),
    askComposed({
      "page-type": pageType.slug,
      where: { [EXTENDS_KEY]: { has: GEAR } },
      keys: [SLUG_KEY, EXTENDS_KEY],
    }),
  ])
  if (!attributes.ok || attributes.answer.rows.length === 0) return NO_DERIVED
  const held = gear.ok ? unwornIn(gear.answer.rows) : {}
  heldIn(attributes.answer.rows, held)
  const worn = items.ok ? wornIn(items.answer.rows) : []
  if (worn.length > 0) {
    const carried = await askComposed({
      "page-type": metricItem.slug,
      where: { item: { in: [...worn] } },
      keys: [TYPE_KEY, ITEM_KEY, VALUE_KEY],
    })
    if (carried.ok) heldIn(carried.answer.rows, held)
  }
  return derivedIn(held, workings)
}

export function derivedShown(filed: Sheet | null, kept: Sheet): Sheet {
  return filed === null || Object.keys(filed).length === 0 ? kept : filed
}

export function useDerived(
  game: string | undefined,
  workings: readonly Working[] = NO_WORKINGS
): Sheet | null {
  const asked = workings.length === 0 ? "" : (game ?? "")
  const [derived, setDerived] = useState<Sheet | null>(asked === "" ? NO_DERIVED : null)

  useEffect(() => {
    setDerived(asked === "" ? NO_DERIVED : null)
    if (asked === "") return
    let alive = true
    void (async () => {
      const held = await readDerived(asked, workings).catch(() => NO_DERIVED)
      if (alive) setDerived(held)
    })()
    return () => {
      alive = false
    }
  }, [asked, workings])

  return derived
}
