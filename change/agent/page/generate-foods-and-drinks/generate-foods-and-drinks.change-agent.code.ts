import {
  type Answer,
  type FileChange,
  refusing,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { parsedIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Buff,
  buffOf,
  buffTextOf,
} from "akasha/temper/player/character/source/modules/food-or-drink-buff/food-or-drink-buff.module.code.ts"
import { recordsIn } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import { temperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.ts"

const MINE = "temper/player/character/temper-mine/pages/eso/"

const ITEMS = /^eso\.temper-mine\.items(\.part\d+)?\.jsonl$/

const PAGES = "temper/player/character/source/temper-food-or-drink/pages/"

const PAGE = `.${temperFoodOrDrink.slug}.ts`

const CASES = "temper/player/character/stat/temper-stat-case/pages/"

const CASE = ".temper-stat-case.verified-stats.json"

const TYPES =
  "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

const FOOD_OR_DRINK_ROW = /"itemType":(4|12),/

const KINDS: Readonly<Record<number, string>> = { 4: "food", 12: "drink" }

const UNSEEN_ICON = "/esoui/art/icons/icon_missing.dds"

const WORD = /\b[a-z]/g

type Json = Readonly<Record<string, unknown>>

type Item = {
  readonly title: string
  readonly itemId: number
  readonly kind: string
  readonly text: string
  readonly icon: string
  readonly requiredCp: number
}

type Held = { readonly path: string; readonly text: string; readonly page: Json }

type Verified = ReadonlyMap<number, ReadonlySet<string>>

type Told = { readonly changed: string[]; readonly kept: string[]; readonly unmatched: string[] }

function itemOf(row: Json): Item | null {
  const { itemType, abilityDescription, title, itemId, icon, requiredCp } = row
  const kind = typeof itemType === "number" ? KINDS[itemType] : undefined
  const text = typeof abilityDescription === "string" ? buffTextOf(abilityDescription) : ""
  if (kind === undefined || text === "") return null
  if (typeof title !== "string" || typeof itemId !== "number") return null
  return {
    title,
    itemId,
    kind,
    text,
    icon: typeof icon === "string" ? icon : "",
    requiredCp: typeof requiredCp === "number" ? requiredCp : 0,
  }
}

function placeOf(page: Json): number {
  return typeof page["hashPlace"] === "number" ? page["hashPlace"] : 0
}

function heldPagesOf(world: World): readonly Held[] {
  const held: Held[] = []
  for (const path of world.under(PAGES).filter((one) => one.endsWith(PAGE))) {
    const text = world.textOf(path)
    const page = text === null ? null : parsedIn(text)
    if (text !== null && page !== null) held.push({ path, text, page })
  }
  return held.sort((one, other) => placeOf(one.page) - placeOf(other.page))
}

function itemsOf(world: World): readonly Item[] {
  const items: Item[] = []
  const paths = world.under(MINE).filter((path) => ITEMS.test(path.slice(MINE.length)))
  for (const path of paths) {
    for (const line of (world.textOf(path) ?? "").split("\n")) {
      if (!FOOD_OR_DRINK_ROW.test(line)) continue
      const item = itemOf(JSON.parse(line) as Json)
      if (item !== null) items.push(item)
    }
  }
  return items.sort((one, other) => one.itemId - other.itemId)
}

function verifiedOf(world: World): Verified {
  const verified = new Map<number, Set<string>>()
  for (const path of world.under(CASES).filter((one) => one.endsWith(CASE))) {
    const said = JSON.parse(world.textOf(path) ?? "{}") as Json
    const pinned = said["pinned"]
    const stats = typeof pinned === "object" && pinned !== null ? Object.keys(pinned) : []
    for (const buff of recordsIn(said["activeBuffs"])) {
      const abilityId = buff["abilityId"]
      if (typeof abilityId !== "number") continue
      const held = verified.get(abilityId) ?? new Set<string>()
      for (const stat of stats) held.add(stat)
      verified.set(abilityId, held)
    }
  }
  return verified
}

function keyOf(item: Item): string {
  return `${item.kind}\n${item.text}`
}

function isVerified(page: Json, verified: Verified): boolean {
  const abilityId = page["abilityId"]
  const pinned = typeof abilityId === "number" ? verified.get(abilityId) : undefined
  if (pinned === undefined) return false
  return recordsIn(page["effects"]).some((one) => pinned.has(slugOf(String(one["metric"]))))
}

function iconOf(item: Item, held: unknown): string | undefined {
  if (item.icon !== "" && item.icon !== UNSEEN_ICON) return item.icon
  return typeof held === "string" ? held : undefined
}

function levelOf(item: Item, buff: Buff): string | undefined {
  if (item.requiredCp > 0) return `CP${String(item.requiredCp)}`
  return buff.scaled ? "Scaled" : undefined
}

function titleOf(item: Item): string {
  if (item.title !== item.title.toLowerCase()) return item.title
  return item.title.replace(WORD, (one) => one.toUpperCase())
}

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const ORDER = [
  "id",
  "type",
  "slug",
  "title",
  "description",
  "icon",
  "foodOrDrinkKind",
  "itemId",
  "itemIds",
  "abilityId",
  "seconds",
  "level",
  "effects",
  "status",
  "hashPlace",
  "createdAt",
  "updatedAt",
] as const

function ordered(page: Json): Json {
  const made: Record<string, unknown> = {}
  for (const key of ORDER) if (page[key] !== undefined) made[key] = page[key]
  return made
}

function textOf(page: Json): string {
  const lines = Object.entries(page).map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
  return [
    `import type { TemperFoodOrDrink } from "${TYPES}"`,
    "",
    `export const ${exportedAs(String(page["slug"]))} = {`,
    ...lines,
    "} as const satisfies TemperFoodOrDrink",
    "",
  ].join("\n")
}

function differencesOf(held: Json, item: Item, buff: Buff, agrees: boolean): readonly string[] {
  const differs: string[] = []
  if (held["title"] !== titleOf(item)) differs.push(`title is ${titleOf(item)}`)
  if (held["itemId"] !== item.itemId) {
    differs.push(`item ${String(held["itemId"])} is ${String(item.itemId)}`)
  }
  if (buff.seconds !== 0 && held["seconds"] !== buff.seconds) {
    differs.push(`seconds ${String(held["seconds"])} are ${String(buff.seconds)}`)
  }
  if (!agrees) {
    const was = JSON.stringify(held["effects"] ?? [])
    differs.push(`effects ${was} read ${JSON.stringify(buff.effects)}`)
  }
  return differs
}

function pageFor(held: Json, item: Item, itemIds: readonly number[], keep: boolean, told: Told) {
  const buff = buffOf(item.text)
  const slug = String(held["slug"])
  const agrees = JSON.stringify(recordsIn(held["effects"])) === JSON.stringify(buff.effects)
  const keeps = !agrees && (buff.status === "unsupported" || keep)
  const differs = differencesOf(held, item, buff, agrees)
  if (keeps) told.kept.push(slug)
  if (differs.length > 0) {
    told.changed.push(`${slug}: ${differs.join("; ")}${keeps ? " (hand-made effects kept)" : ""}`)
  }
  return ordered({
    ...held,
    title: titleOf(item),
    description: item.text,
    icon: iconOf(item, held["icon"]),
    foodOrDrinkKind: item.kind,
    itemId: item.itemId,
    itemIds,
    seconds: buff.seconds === 0 ? held["seconds"] : buff.seconds,
    effects: keeps ? held["effects"] : buff.effects.length === 0 ? undefined : buff.effects,
    status: keeps ? undefined : buff.status,
  })
}

function newPageFor(item: Item, itemIds: readonly number[], slug: string, hashPlace: number) {
  const buff = buffOf(item.text)
  return ordered({
    type: `page-type/${temperFoodOrDrink.slug}`,
    slug,
    title: titleOf(item),
    description: item.text,
    icon: iconOf(item, undefined),
    foodOrDrinkKind: item.kind,
    itemId: item.itemId,
    itemIds,
    seconds: buff.seconds,
    level: levelOf(item, buff),
    effects: buff.effects.length === 0 ? undefined : buff.effects,
    status: buff.status,
    hashPlace,
  })
}

function matchOf(page: Json, items: readonly Item[]): Item | undefined {
  const named = items.filter((item) => slugFromTitle(item.title) === page["slug"])
  return named.find((item) => item.itemId === page["itemId"]) ?? named[0]
}

function listed(count: number, said: string, named: readonly string[], parted: string): string {
  return `${String(count)} ${said}${named.length === 0 ? "" : `: ${named.join(parted)}`}`
}

function groupsOf(items: readonly Item[]): ReadonlyMap<string, readonly Item[]> {
  const groups = new Map<string, Item[]>()
  for (const item of items) groups.set(keyOf(item), [...(groups.get(keyOf(item)) ?? []), item])
  return groups
}

export function generateFoodsAndDrinksCommand(world: World): Answer {
  const items = itemsOf(world)
  if (items.length === 0) return refusing(`no food or drink is in the item mine under \`${MINE}\``)
  const held = heldPagesOf(world)
  if (held.length === 0) return refusing(`no food or drink page is under \`${PAGES}\``)
  const verified = verifiedOf(world)
  const groups = groupsOf(items)
  const told: Told = { changed: [], kept: [], unmatched: [] }
  const matched = new Map<Held, Item>()
  for (const one of held) {
    if (one.page["foodOrDrinkKind"] === "none") continue
    const item = matchOf(one.page, items)
    if (item === undefined) told.unmatched.push(String(one.page["slug"]))
    else matched.set(one, item)
  }
  const owned = new Set([...matched.values()].map((item) => item.itemId))
  const claimed = new Set<string>()
  const edits: FileChange[] = []
  for (const [one, item] of matched) {
    const key = keyOf(item)
    const others = claimed.has(key) ? [] : (groups.get(key) ?? [])
    const sharing = [item, ...others.filter((other) => !owned.has(other.itemId))]
    const itemIds = sharing.map((each) => each.itemId).sort((lower, higher) => lower - higher)
    claimed.add(key)
    const page = pageFor(one.page, item, itemIds, isVerified(one.page, verified), told)
    if (JSON.stringify(page) === JSON.stringify(ordered(one.page))) continue
    edits.push({ kind: "replace", path: one.path, contentFrom: one.text, contentTo: textOf(page) })
  }
  const slugs = new Set(held.map((one) => String(one.page["slug"])))
  const first = Math.max(...held.map((one) => placeOf(one.page))) + 1
  let place = first
  const unsupported: string[] = []
  for (const [key, sharing] of groups) {
    const item = sharing[0]
    if (claimed.has(key) || item === undefined) continue
    const named = slugFromTitle(titleOf(item))
    const slug = slugs.has(named) ? `${named}-${String(item.itemId)}` : named
    slugs.add(slug)
    const page = newPageFor(
      item,
      sharing.map((each) => each.itemId),
      slug,
      place
    )
    if (page["status"] === "unsupported") unsupported.push(slug)
    edits.push({ kind: "add", path: `${PAGES}${slug}${PAGE}`, content: textOf(page) })
    place += 1
  }
  return telling(stating(edits), [
    `${String(items.length)} foods and drinks hold ${String(groups.size)} distinct buffs`,
    `${String(place - first)} food or drink pages added, from hash place ${String(first)}`,
    listed(told.changed.length, "hand-made pages differ from the mine", told.changed, " | "),
    listed(told.kept.length, "hand-made pages keep their effects", told.kept, ", "),
    listed(told.unmatched.length, "hand-made pages match no mined item", told.unmatched, ", "),
    listed(unsupported.length, "buffs read as unsupported", unsupported, ", "),
  ])
}

export const takes: readonly string[] = []

export function runChange(world: World, given: Readonly<Record<string, string>>): Promise<Answer> {
  const asked = Object.keys(given)[0]
  if (asked !== undefined) {
    return Promise.resolve(refusing(`\`${asked}\` is no argument this change takes`))
  }
  return Promise.resolve(generateFoodsAndDrinksCommand(world))
}
