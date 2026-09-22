"use client"

import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { playerOf } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"
import { useEffect, useState } from "react"

const ITEM_TYPE = "item"

const SLOT_TYPE = "item-slot"

const SLUG_AT = "slug"

const TITLE_AT = "title"

const CHARACTER_AT = "character"

const SLOT_AT = "slot"

const DESCRIPTION_AT = "description"

const NO_SLOT_NAMES: Record<string, string> = {}

export type Filed = { readonly values: Record<string, unknown> }

export type Worn = { readonly name: string }

export type Carried = { readonly name: string; readonly note?: string }

export type Had = { readonly worn: Record<string, Worn>; readonly carried: readonly Carried[] }

export type Answered = { readonly had: Had | null }

const NOTHING_HAD: Answered = { had: null }

type Owned = { readonly title: string; readonly note: string | null; readonly slot: string | null }

export function slotNamesIn(rows: readonly Filed[]): Record<string, string> {
  const named: Record<string, string> = {}
  for (const row of rows) {
    const at = row.values[SLUG_AT]
    const shown = row.values[TITLE_AT]
    if (typeof at === "string" && typeof shown === "string" && at !== "" && shown !== "") {
      named[at] = shown
    }
  }
  return named
}

function slotNameOf(named: unknown, slots: Record<string, string>): string | null {
  const at = typeof named === "string" ? slugIn(named) : null
  return at === null || at === "" ? null : (slots[at] ?? null)
}

function ownedIn(row: Filed, slots: Record<string, string>): Owned | null {
  const title = row.values[TITLE_AT]
  if (typeof title !== "string" || title === "") return null
  const said = row.values[DESCRIPTION_AT]
  const note = typeof said === "string" && said !== "" ? said : null
  return { title, note, slot: slotNameOf(row.values[SLOT_AT], slots) }
}

export function hadIn(rows: readonly Filed[], slots: Record<string, string>): Had {
  const owned: Owned[] = []
  for (const row of rows) {
    const one = ownedIn(row, slots)
    if (one !== null) owned.push(one)
  }
  owned.sort((one, two) => one.title.localeCompare(two.title))
  const worn: [string, Worn][] = []
  const carried: Carried[] = []
  for (const one of owned) {
    const slot = one.slot
    if (slot !== null && !worn.some(([taken]) => taken === slot)) {
      worn.push([slot, { name: one.title }])
      continue
    }
    carried.push(one.note === null ? { name: one.title } : { name: one.title, note: one.note })
  }
  worn.sort((one, two) => one[0].localeCompare(two[0]))
  return { worn: Object.fromEntries(worn), carried }
}

async function slotNames(): Promise<Record<string, string>> {
  const asked = await askComposed({ "page-type": SLOT_TYPE, keys: [SLUG_AT, TITLE_AT] })
  return asked.ok ? slotNamesIn(asked.answer.rows) : NO_SLOT_NAMES
}

async function hadBy(slug: string): Promise<Had | null> {
  const asked = await askComposed({
    "page-type": ITEM_TYPE,
    where: { character: { "ends-with": `/${slug}` } },
    keys: [CHARACTER_AT, TITLE_AT, SLOT_AT, DESCRIPTION_AT],
  })
  if (!asked.ok || asked.answer.rows.length === 0) return null
  return hadIn(asked.answer.rows, await slotNames())
}

async function readItems(game: string): Promise<Answered> {
  const player = await playerOf(game)
  if (player === null) return NOTHING_HAD
  const slug = slugIn(player)
  if (slug === null || slug === "") return NOTHING_HAD
  return { had: await hadBy(slug) }
}

export function itemsOutstanding(filed: Answered | null, drawn: number): boolean {
  return filed === null && drawn === 0
}

export function useCharacterItems(game: string | undefined): Answered | null {
  const asked = game ?? ""
  const [answered, setAnswered] = useState<Answered | null>(asked === "" ? NOTHING_HAD : null)

  useEffect(() => {
    setAnswered(asked === "" ? NOTHING_HAD : null)
    if (asked === "") return
    let alive = true
    void (async () => {
      const held = await readItems(asked).catch(() => NOTHING_HAD)
      if (alive) setAnswered(held)
    })()
    return () => {
      alive = false
    }
  }, [asked])

  return answered
}
