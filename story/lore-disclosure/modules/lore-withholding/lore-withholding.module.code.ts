import { existsSync, readdirSync } from "node:fs"
import { dirname, join, matchesGlob, sep } from "node:path"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import { role } from "akasha/agent/seat/properties/role.relation-property.ts"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import {
  everyOfType,
  listedAt,
  valueByPath,
  valuesByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { loreAbout } from "akasha/story/lore/properties/lore-about.relation-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { loreSecrets } from "akasha/story/lore/properties/lore-secrets.file-property.ts"

const SLASH = "/"

const STORY = "story/"

const GLOBBING = /[*?[]/

export const ASKED = "may I know X yet?"

export const WITHHELD: readonly string[] = [
  "This reaches a lore page that is the world builder's, and your seat is a game master's, so it",
  "is refused. A secret the game master holds leaks into every turn before the moment it waits on.",
  "",
  `Ask your game's world builder "${ASKED}" instead, naming what you need. Once the world`,
  "builder tells the game master a fact, that fact is yours to read.",
  "",
  "A search, a listing or a history whose path holds such a page is refused whole. Name a",
  "narrower path, one holding none.",
]

const NOTHING_READ =
  "a file this read names is lore the world builder holds, so nothing was read here and nothing is recorded."

export const REFUSED_WHOLE: string = [NOTHING_READ, "", ...WITHHELD].join("\n")

export type Globbed = "file" | "folder" | null

export function seatOf(agentId: string): string {
  const at = agentId.indexOf(SUBAGENT_MARK)
  return at < 0 ? agentId : agentId.slice(0, at)
}

export const HELD_ROLES: readonly string[] = [
  gameMaster.id,
  reviewer.id,
  writer.id,
  storyRecorder.id,
]

export function gameMasterIn(root: string, agentId: string | null): boolean {
  if (agentId === null || agentId === "") return false
  const seat = seatOf(agentId)
  return HELD_ROLES.some((one) => idsNaming(root, one, role.propertySlug).includes(seat))
}

function pathOf(root: string, about: string): string | null {
  const address = addressIn(about)
  if (address.kind !== "qualified") return null
  return listedAt(root, address.pageTypeSlug, address.slug)[0]?.path ?? null
}

const SECRETS_HELD = "jsonl"

function namesKnower(one: unknown): boolean {
  if (typeof one !== "object" || one === null) return false
  const knowers: unknown = Reflect.get(one, loreKnowers.propertySlug)
  return Array.isArray(knowers) && knowers.length > 0
}

function toldIn(value: Value): boolean {
  const held = value[loreFacts.propertySlug]
  return Array.isArray(held) && held.some(namesKnower)
}

function loreValuesIn(root: string): readonly (readonly [string, Value])[] {
  return [lore.slug, place.slug].flatMap((kind) => [...valuesByPath(root, kind)])
}

export function untoldIn(root: string): readonly string[] {
  const found: string[] = []
  for (const kind of [lore.slug, place.slug]) {
    for (const one of everyOfType(root, kind)) {
      const value = valueByPath(root, one.path)
      if (value === null || !toldIn(value)) found.push(one.path)
    }
  }
  return found.sort()
}

export function secretsIn(root: string): readonly string[] {
  const found: string[] = []
  for (const [path, value] of loreValuesIn(root)) {
    if (textAt(value, loreSecrets.propertySlug) === null) continue
    const at = besideAt(path, loreSecrets.propertySlug, SECRETS_HELD)
    if (at !== null) found.push(at)
  }
  return found.sort()
}

export function secretTargetsIn(root: string, held: readonly string[]): readonly string[] {
  const telling = new Map<string, string[]>()
  for (const [path, value] of valuesByPath(root, lore.slug)) {
    const about = textAt(value, loreAbout.propertySlug)
    if (about === null) continue
    telling.set(about, [...(telling.get(about) ?? []), path])
  }
  const found: string[] = []
  for (const [about, paths] of telling) {
    if (!paths.every((one) => held.includes(one))) continue
    const at = pathOf(root, about)
    if (at?.startsWith(STORY)) found.push(at)
  }
  return found.sort()
}

export function withheldIn(root: string): readonly string[] {
  const held = untoldIn(root)
  return [...new Set([...held, ...secretTargetsIn(root, held), ...secretsIn(root)])]
}

export function withheldFor(root: string, agentId: string | null): readonly string[] {
  return gameMasterIn(root, agentId) ? withheldIn(root) : []
}

export function withheldAt(at: string, withheld: readonly string[]): boolean {
  const found = settled(at)
  return withheld.some((one) => found.endsWith(`${sep}${one}`))
}

export function anyWithheld(
  root: string,
  agentId: string | null,
  paths: readonly string[]
): boolean {
  const withheld = withheldFor(root, agentId)
  if (withheld.length === 0) return false
  return paths.some((one) => withheldAt(join(root, one), withheld))
}

function treesIn(root: string): readonly string[] {
  const at = storeIn(root, TREES)
  if (!existsSync(at)) return []
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => join(at, one.name))
}

export function copiesOf(root: string, withheld: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const tree of [root, ...treesIn(root)]) {
    for (const one of withheld) {
      const at = join(tree, one)
      if (existsSync(at)) found.push(settled(at))
    }
  }
  return found
}

function tailsOf(one: string): readonly string[] {
  const parts = one.split(SLASH)
  return parts.map((_part, at) => parts.slice(at).join(SLASH))
}

function tailsUnder(at: string, withheld: readonly string[]): readonly string[] {
  return withheld
    .flatMap((one) => tailsOf(one).map((tail) => join(at, tail)))
    .filter((one) => existsSync(one))
}

export function reachesWithheld(at: string, root: string, withheld: readonly string[]): boolean {
  if (withheld.length === 0) return false
  const found = settled(at)
  if (withheldAt(found, withheld)) return true
  if (tailsUnder(found, withheld).length > 0) return true
  return copiesOf(root, withheld).some((one) => insideOf(found, one))
}

export function globbed(word: string): boolean {
  return GLOBBING.test(word)
}

function fixedOf(pattern: string): string {
  const parts = pattern.split(sep)
  const at = parts.findIndex((one) => GLOBBING.test(one))
  const fixed = parts.slice(0, at < 0 ? parts.length : at).join(sep)
  return fixed === "" ? sep : fixed
}

function aboveOf(at: string): readonly string[] {
  const found: string[] = []
  let one = dirname(at)
  while (one !== dirname(one)) {
    found.push(one)
    one = dirname(one)
  }
  return found
}

export function globReach(pattern: string, root: string, withheld: readonly string[]): Globbed {
  if (withheld.length === 0) return null
  const held = [...tailsUnder(fixedOf(pattern), withheld), ...copiesOf(root, withheld)]
  if (held.some((one) => matchesGlob(one, pattern))) return "file"
  return held.some((one) => aboveOf(one).some((above) => matchesGlob(above, pattern)))
    ? "folder"
    : null
}
