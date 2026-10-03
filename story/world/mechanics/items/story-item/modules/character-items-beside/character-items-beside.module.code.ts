import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  type BeatOverlay,
  NO_OVERLAY,
  overlaidRows,
} from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
import { askedLoudly } from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"

const ITEM_TYPE = "story-item"

const SLOT_TYPE = "item-slot"

const SLUG_AT = "slug"

const TITLE_AT = "title"

const CHARACTER_AT = "character"

const SLOT_AT = "slot"

const DESCRIPTION_AT = "description"

const QUANTITY_AT = "quantity"

const UNREVEALED_AT = "unrevealed"

const NO_SLOT_NAMES: Record<string, string> = {}

export type Filed = { readonly values: Record<string, unknown> }

type Worn = { readonly name: string }

type Carried = { readonly name: string; readonly note?: string }

export type Had = { readonly worn: Record<string, Worn>; readonly carried: readonly Carried[] }

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

export function countedAs(title: string, quantity: unknown): string {
  return typeof quantity === "number" && quantity > 1 ? `${title} ×${String(quantity)}` : title
}

function ownedIn(row: Filed, slots: Record<string, string>): Owned | null {
  const title = row.values[TITLE_AT]
  if (typeof title !== "string" || title === "") return null
  if (row.values[UNREVEALED_AT] === true) return null
  const said = row.values[DESCRIPTION_AT]
  const note = typeof said === "string" && said !== "" ? said : null
  return {
    title: countedAs(title, row.values[QUANTITY_AT]),
    note,
    slot: slotNameOf(row.values[SLOT_AT], slots),
  }
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
  const asked = await askedLoudly({ "page-type": SLOT_TYPE, keys: [SLUG_AT, TITLE_AT] })
  return asked.ok ? slotNamesIn(asked.answer.rows) : NO_SLOT_NAMES
}

async function hadBy(slug: string, overlay: BeatOverlay): Promise<Had | null> {
  const [asked, slots] = await Promise.all([
    askedLoudly({
      "page-type": ITEM_TYPE,
      where: { character: { "ends-with": `/${slug}` } },
      keys: [SLUG_AT, CHARACTER_AT, TITLE_AT, SLOT_AT, DESCRIPTION_AT, QUANTITY_AT, UNREVEALED_AT],
    }),
    slotNames(),
  ])
  if (!asked.ok || asked.answer.rows.length === 0) return null
  return hadIn(overlaidRows(asked.answer.rows, ITEM_TYPE, overlay), slots)
}

export async function itemsOf(
  character: string,
  overlay: BeatOverlay = NO_OVERLAY
): Promise<Had | null> {
  const slug = slugIn(character)
  return slug === null || slug === "" ? null : hadBy(slug, overlay)
}
