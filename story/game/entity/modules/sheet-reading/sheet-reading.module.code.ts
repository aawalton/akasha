import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameAttribute } from "akasha/story/game/attribute/game-attribute.page-type.ts"
import { gameEntity } from "akasha/story/game/entity/game-entity.page-type.ts"

const SLOTS = ["armor", "weapon"] as const
const ITEMS = "items"
const JOIN = " — "
const UNNAMED = "unnamed"
const UNSTATED = "none stated"
const INBOUND = "inbound"
const AFFINITY = "affinity"
const NONE = 0

export type Scored = { readonly attribute: string; readonly score: number }

export type Carried = {
  readonly name: string
  readonly slot?: string
  readonly attack?: number
  readonly defense?: number
  readonly scaling?: string
  readonly note?: string
}

export type Marked = { readonly name: string; readonly effect: string; readonly source?: string }

export type Skilled = Marked & { readonly progress: number }

export type Attuned = {
  readonly name: string
  readonly type: string
  readonly tier: string
  readonly counter: number
  readonly effect?: string
  readonly source?: string
}

export type Bonded = {
  readonly name: string
  readonly entity: string
  readonly direction: string
  readonly attribute?: string
  readonly boundAttribute?: string
  readonly grows?: boolean
  readonly establishedTurn?: number
  readonly note?: string
  readonly source?: string
}

export function saidIn(held: unknown): string | undefined {
  const said = textIn(held)?.trim()
  return said === undefined || said === "" ? undefined : said
}

export function countIn(held: unknown): number | undefined {
  return asNumber(held) ?? undefined
}

export function listIn(held: unknown): readonly Record<string, unknown>[] {
  return Array.isArray(held) ? held.filter(isRecord) : []
}

export function attributeAt(held: unknown): string | undefined {
  const said = saidIn(held)
  return said === undefined ? undefined : namedAs(gameAttribute.slug, said.toLowerCase(), null)
}

export function joinedOf(
  one: Record<string, unknown>,
  keys: readonly string[]
): string | undefined {
  const said = keys.map((key) => saidIn(one[key])).filter((held) => held !== undefined)
  return said.length === 0 ? undefined : said.join(JOIN)
}

export function attributesIn(held: unknown): readonly Scored[] {
  if (!isRecord(held)) return []
  const found: Scored[] = []
  for (const [key, one] of Object.entries(held)) {
    const score = countIn(one)
    const attribute = attributeAt(key)
    if (score === undefined || attribute === undefined) continue
    found.push({ attribute, score })
  }
  return found.sort((first, next) => first.attribute.localeCompare(next.attribute))
}

function carriedFrom(one: Record<string, unknown>, slot: string | undefined): Carried {
  return {
    name: saidIn(one["name"]) ?? slot ?? UNNAMED,
    slot,
    attack: countIn(one["atk"]),
    defense: countIn(one["def"]),
    scaling: attributeAt(one["scaling"]),
    note: joinedOf(one, ["note", "affinity"]),
  }
}

export function equipmentIn(held: unknown): readonly Carried[] {
  if (!isRecord(held)) return []
  const found: Carried[] = []
  for (const slot of SLOTS) {
    const one = held[slot]
    if (isRecord(one)) found.push(carriedFrom(one, slot))
  }
  for (const one of listIn(held[ITEMS])) found.push(carriedFrom(one, undefined))
  return found
}

export function markedIn(held: unknown): readonly Marked[] {
  return listIn(held).map((one) => ({
    name: saidIn(one["name"]) ?? UNNAMED,
    effect: saidIn(one["effect"]) ?? UNSTATED,
    source: saidIn(one["source"]),
  }))
}

export function skillsIn(held: unknown): readonly Skilled[] {
  return listIn(held).map((one) => ({
    name: saidIn(one["name"]) ?? UNNAMED,
    progress: countIn(one["displayed"]) ?? countIn(one["score"]) ?? NONE,
    effect: saidIn(one["effect"]) ?? UNSTATED,
    source: joinedOf(one, ["source", "status", "talent"]),
  }))
}

export function affinitiesIn(held: unknown): readonly Attuned[] {
  return listIn(held).map((one) => ({
    name: saidIn(one["name"]) ?? UNNAMED,
    type: saidIn(one["type"]) ?? UNSTATED,
    tier: (saidIn(one["tier"]) ?? AFFINITY).toLowerCase(),
    counter: countIn(one["counter"]) ?? NONE,
    effect: saidIn(one["effect"]),
    source: saidIn(one["source"]),
  }))
}

export function bondsIn(held: unknown, game: string): readonly Bonded[] {
  const found: Bonded[] = []
  for (const one of listIn(held)) {
    const named = saidIn(one["entity"])
    if (named === undefined) continue
    found.push({
      name: saidIn(one["name"]) ?? named,
      entity: namedAs(gameEntity.slug, `${game}-${named}`, null),
      direction: (saidIn(one["direction"]) ?? INBOUND).toLowerCase(),
      attribute: attributeAt(one["trait"]),
      boundAttribute: attributeAt(one["boundTrait"]),
      grows: typeof one["grows"] === "boolean" ? one["grows"] : undefined,
      establishedTurn: countIn(one["establishedTurn"]),
      note: saidIn(one["description"]),
      source: saidIn(one["source"]),
    })
  }
  return found
}
