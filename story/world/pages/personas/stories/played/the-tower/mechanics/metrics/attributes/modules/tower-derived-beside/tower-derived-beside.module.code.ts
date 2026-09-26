"use client"

import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { item } from "akasha/story/item/item.page-type.ts"
import { metricCharacterAttribute } from "akasha/story/world/mechanics/metrics/metric-character/attribute/metric-character-attribute.page-type.ts"
import { metricItem } from "akasha/story/world/mechanics/metrics/metric-item/metric-item.page-type.ts"
import type {
  Reading,
  Sheet,
  Summed,
} from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { worked as healthMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.world-derived-metric.formula.code.ts"
import { towerHealthMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.world-derived-metric.ts"
import { worked as initiative } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-initiative.world-derived-metric.formula.code.ts"
import { towerInitiative } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-initiative.world-derived-metric.ts"
import { worked as leveling } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-leveling.world-derived-metric.formula.code.ts"
import { towerLeveling } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-leveling.world-derived-metric.ts"
import { worked as manaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mana-max.world-derived-metric.formula.code.ts"
import { towerManaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mana-max.world-derived-metric.ts"
import { worked as mentalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-attack.world-derived-metric.formula.code.ts"
import { towerMentalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-attack.world-derived-metric.ts"
import { worked as mentalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-defence.world-derived-metric.formula.code.ts"
import { towerMentalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-defence.world-derived-metric.ts"
import { worked as physicalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.world-derived-metric.formula.code.ts"
import { towerPhysicalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.world-derived-metric.ts"
import { worked as physicalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-defence.world-derived-metric.formula.code.ts"
import { towerPhysicalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-defence.world-derived-metric.ts"
import { worked as staminaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-stamina-max.world-derived-metric.formula.code.ts"
import { towerStaminaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-stamina-max.world-derived-metric.ts"
import { towerItemAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-attack/tower-item-attack.page-type.ts"
import { towerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.ts"
import { towerItemDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-defence/tower-item-defence.page-type.ts"
import { playerOf } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"
import { useEffect, useState } from "react"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const VALUE_KEY = "value"

const CHARACTER_KEY = "character"

const ITEM_KEY = "item"

const SLOT_KEY = "slot"

type Working = { readonly title: string; readonly worked: (reading: Reading) => Summed }

const WORKINGS: readonly Working[] = [
  { title: towerHealthMax.title, worked: healthMax },
  { title: towerManaMax.title, worked: manaMax },
  { title: towerStaminaMax.title, worked: staminaMax },
  { title: towerInitiative.title, worked: initiative },
  { title: towerPhysicalAttack.title, worked: physicalAttack },
  { title: towerPhysicalDefence.title, worked: physicalDefence },
  { title: towerMentalAttack.title, worked: mentalAttack },
  { title: towerMentalDefence.title, worked: mentalDefence },
  { title: towerLeveling.title, worked: leveling },
]

const ITEM_METRICS: readonly string[] = [
  towerItemAttack.slug,
  towerItemDefence.slug,
  towerItemDamage.slug,
]

const NO_DERIVED: Record<string, number> = {}

export function heldIn(rows: readonly QueryRow[], into: Record<string, number>): undefined {
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined) continue
    into[type] = (into[type] ?? 0) + value
  }
  return undefined
}

export function derivedIn(held: Sheet): Record<string, number> {
  const derived: Record<string, number> = {}
  for (const working of WORKINGS) {
    const summed = working.worked({ held })
    if ("answered" in summed) derived[working.title] = summed.answered
  }
  return derived
}

function wornIn(rows: readonly QueryRow[]): readonly string[] {
  const worn: string[] = []
  for (const row of rows) {
    const slug = textIn(row.values[SLUG_KEY])
    if (slug !== null && textIn(row.values[SLOT_KEY]) !== null) worn.push(`${item.slug}/${slug}`)
  }
  return worn
}

async function readDerived(game: string): Promise<Record<string, number>> {
  const character = await playerOf(game)
  if (character === null) return NO_DERIVED
  const [attributes, items] = await Promise.all([
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
  ])
  if (!attributes.ok || attributes.answer.rows.length === 0) return NO_DERIVED
  const held: Record<string, number> = Object.fromEntries(ITEM_METRICS.map((one) => [one, 0]))
  heldIn(attributes.answer.rows, held)
  const worn = items.ok ? wornIn(items.answer.rows) : []
  if (worn.length > 0) {
    const gear = await askComposed({
      "page-type": metricItem.slug,
      where: { item: { in: [...worn] } },
      keys: [TYPE_KEY, ITEM_KEY, VALUE_KEY],
    })
    if (gear.ok) heldIn(gear.answer.rows, held)
  }
  return derivedIn(held)
}

export function derivedShown(
  filed: Record<string, number> | null,
  kept: Record<string, number>
): Record<string, number> {
  return filed === null || Object.keys(filed).length === 0 ? kept : filed
}

export function useTowerDerived(game: string | undefined): Record<string, number> | null {
  const asked = game ?? ""
  const [derived, setDerived] = useState<Record<string, number> | null>(
    asked === "" ? NO_DERIVED : null
  )

  useEffect(() => {
    setDerived(asked === "" ? NO_DERIVED : null)
    if (asked === "") return
    let alive = true
    void (async () => {
      const held = await readDerived(asked).catch(() => NO_DERIVED)
      if (alive) setDerived(held)
    })()
    return () => {
      alive = false
    }
  }, [asked])

  return derived
}
