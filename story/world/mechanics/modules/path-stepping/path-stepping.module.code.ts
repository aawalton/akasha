import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import {
  listedAt,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { skillTierSteps } from "akasha/story/world/mechanics/skills/properties/skill-tier-steps.number-property.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { z } from "zod"

export const BASIC_TIERS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

const TIER_POINT = 1

const STAT_TIER = 9

const STAT_TIER_STATS = 1

const LAST_TIER = 10

const LAST_TIER_STATS = 2

const TALENTED_SHARE = 500

const GIFTED_SHARE = 250

const CHARACTER = "character"

const SKILL = "skill"

const SLUG = "slug"

const TITLE = "title"

const ATTRIBUTE = "attribute"

const DORMANT = "dormant"

const WORLD = "world"

const TIER_STEPS = exportedAs(skillTierSteps.propertySlug)

export const SPEED = {
  talented: z.number().int().min(0).optional(),
  gifted: z.number().int().min(0).optional(),
}

export type Speed = { readonly talented?: number | undefined; readonly gifted?: number | undefined }

export const ONE_SPEED = "say `talented` or `gifted`, never both"

export function oneSpeed(speed: Speed): boolean {
  return speed.talented === undefined || speed.gifted === undefined
}

export function sped(steps: number, speed: Speed, whole: (exact: number) => number): number {
  if (speed.talented !== undefined) {
    return whole((steps * (TALENTED_SHARE + speed.talented)) / TALENTED_SHARE)
  }
  if (speed.gifted !== undefined) {
    return whole((steps * (GIFTED_SHARE + speed.gifted)) / GIFTED_SHARE)
  }
  return steps
}

export function unallocated(stats: string, by: number): Added {
  return { page: stats, key: "value", by }
}

export function basicPaid(
  attribute: string,
  stats: string,
  from: number,
  to: number
): readonly Added[] {
  let points = 0
  let gained = 0
  for (let tier = from + 1; tier <= to; tier++) {
    if (tier === LAST_TIER) gained += LAST_TIER_STATS
    else if (tier === STAT_TIER) gained += STAT_TIER_STATS
    else points += TIER_POINT
  }
  const paid: Added[] = []
  if (points > 0) paid.push({ page: attribute, key: "value", by: points })
  if (gained > 0) paid.push(unallocated(stats, gained))
  return paid
}

export type HeldPath = {
  readonly address: string
  readonly character: string
  readonly title: string
  readonly tiers: readonly number[]
  readonly attribute: string | null
  readonly setAside: boolean
}

export type PathReach = {
  readonly heldAt: (address: string) => HeldPath | null
  readonly heldBy: (character: string) => readonly HeldPath[]
  readonly ownerOf: (address: string) => string | null
  readonly statsOf: (character: string) => string
}

export function heldNamed<Listed extends { readonly held: HeldPath }>(
  paths: readonly Listed[],
  said: string
): Listed | undefined {
  return paths.find((one) => one.held.address === said)
}

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function pageValue(root: string, type: string, slug: string): Value | null {
  const found = listedAt(root, type, slug)[0]
  return found === undefined ? null : valueByPath(root, found.path)
}

function heldOf(root: string, value: Value): HeldPath | null {
  const slug = textAt(value, SLUG)
  const character = textAt(value, CHARACTER)
  const skill = textAt(value, SKILL)
  const path = skill === null ? null : pageValue(root, worldSkill.slug, slugOf(skill))
  const title = path === null ? null : textAt(path, TITLE)
  if (slug === null || character === null || path === null || title === null) return null
  const steps = path[TIER_STEPS]
  return {
    address: addressOf(characterSkill.slug, slug),
    character,
    title,
    tiers: Array.isArray(steps)
      ? steps.filter((one): one is number => typeof one === "number")
      : [],
    attribute: textAt(value, ATTRIBUTE),
    setAside: value[DORMANT] === true,
  }
}

function heldIndexed(address: string): HeldPath | null {
  const said = addressIn(address)
  if (said.kind !== "qualified" || said.pageTypeSlug !== characterSkill.slug) return null
  const root = akashaRoot()
  const value = pageValue(root, characterSkill.slug, said.slug)
  return value === null ? null : heldOf(root, value)
}

function heldByIndexed(character: string): readonly HeldPath[] {
  const root = akashaRoot()
  const found: HeldPath[] = []
  for (const one of valuesOfType(root, characterSkill.slug)) {
    const held = one.value[CHARACTER] === character ? heldOf(root, one.value) : null
    if (held !== null) found.push(held)
  }
  return found.toSorted((one, two) =>
    one.address < two.address ? -1 : one.address > two.address ? 1 : 0
  )
}

function ownerIndexed(address: string): string | null {
  const held = heldIndexed(address)
  if (held !== null) return held.character
  const named = slugOf(address)
  const owners = new Set<string>()
  for (const one of valuesOfType(akashaRoot(), characterSkill.slug)) {
    const character = textAt(one.value, CHARACTER)
    if (character !== null && named.startsWith(`${slugOf(character)}-`)) owners.add(character)
  }
  return [...owners].toSorted((one, two) => slugOf(two).length - slugOf(one).length)[0] ?? null
}

export type StatsKind = { readonly kind: string; readonly world: string }

export function statsKindIn(world: string | null, stats: StatsKind): string {
  const own = `${stats.world}-`
  if (world === null || !stats.kind.startsWith(own)) return stats.kind
  return `${world}-${stats.kind.slice(own.length)}`
}

function statsIndexed(stats: StatsKind): (character: string) => string {
  return (character) => {
    const root = akashaRoot()
    const said = addressIn(character)
    const page = said.kind === "qualified" ? pageValue(root, said.pageTypeSlug, said.slug) : null
    const world = page === null ? null : textAt(page, WORLD)
    const type = statsKindIn(world === null ? null : slugOf(world), stats)
    for (const one of valuesOfType(root, type)) {
      const slug = textAt(one.value, SLUG)
      if (slug !== null && one.value[CHARACTER] === character) return addressOf(type, slug)
    }
    return addressOf(type, slugOf(character))
  }
}

export function pathsIndexed(stats: StatsKind): PathReach {
  return {
    heldAt: heldIndexed,
    heldBy: heldByIndexed,
    ownerOf: ownerIndexed,
    statsOf: statsIndexed(stats),
  }
}
