import { existsSync, readdirSync } from "node:fs"
import { dirname, join, sep } from "node:path"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { role } from "akasha/agent/seat/properties/role.relation-property.ts"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import {
  idsNaming,
  namersOf,
} from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { loreDisclosure } from "akasha/story/lore/properties/lore-disclosure.relation-property.ts"
import { worldBuilder } from "akasha/story/lore-disclosure/pages/world-builder.lore-disclosure.ts"
import { Glob } from "bun"

const SLASH = "/"

const GLOBBING = /[*?[]/

export const ASKED = "may I know X yet?"

export const WITHHELD: readonly string[] = [
  "This reaches a lore page that is the world builder's, and your seat is a game master's, so it",
  "is refused. A secret the game master holds leaks into every turn before the moment it waits on.",
  "",
  `Ask your game's world builder "${ASKED}" instead, naming what you need. Once the world`,
  "builder moves the page down to game-master disclosure, it is yours to read.",
  "",
  "A search, a listing or a history whose path holds such a page is refused whole. Name a",
  "narrower path, one holding none.",
]

export type Globbed = "file" | "folder" | null

export function seatOf(agentId: string): string {
  const at = agentId.indexOf(SUBAGENT_MARK)
  return at < 0 ? agentId : agentId.slice(0, at)
}

export function gameMasterIn(root: string, agentId: string | null): boolean {
  if (agentId === null || agentId === "") return false
  return idsNaming(root, gameMaster.id, role.propertySlug).includes(seatOf(agentId))
}

export function withheldIn(root: string): readonly string[] {
  return namersOf(root, worldBuilder.id)
    .filter((one) => one.propertySlug === loreDisclosure.propertySlug)
    .map((one) => one.path)
}

export function withheldFor(root: string, agentId: string | null): readonly string[] {
  return gameMasterIn(root, agentId) ? withheldIn(root) : []
}

export function withheldAt(at: string, withheld: readonly string[]): boolean {
  const found = settled(at)
  return withheld.some((one) => found.endsWith(`${sep}${one}`))
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
  const glob = new Glob(pattern)
  const held = [...tailsUnder(fixedOf(pattern), withheld), ...copiesOf(root, withheld)]
  if (held.some((one) => glob.match(one))) return "file"
  return held.some((one) => aboveOf(one).some((above) => glob.match(above))) ? "folder" : null
}
