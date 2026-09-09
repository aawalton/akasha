import { dirname, join, relative } from "node:path"
import { typed } from "@akasha/code/code-typing"
import { calledIn, objectIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import ts from "typescript"
import {
  missing,
  refusing,
  splicing,
  stating,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { entriesGoingIn, objectAt } from "../../../modules/json-entries/json-entries.module.code.ts"
import {
  spelledAnew,
  spelledByNaming,
} from "../../../modules/package-naming/package-naming.module.code.ts"

const AT = "at"

const NAME = "name"

const EXPORTS = "exports"

const DEPENDENCIES = "dependencies"

const OPENING = "./"

const ITSELF = "."

const PARTED_BY = "/"

const MANIFEST = "package.json"

const HOLDING = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]

const UNFOLDED = "so no package is folded"

const INDENT = "  "

export type RemovePackageManifestAsked = {
  readonly at: string
}

type Rooted = {
  readonly over: string
  readonly overText: string
  readonly held: Record<string, unknown>
  readonly was: string
  readonly to: string
  readonly under: string
  readonly asked: readonly Pair[]
}

export type Pair = readonly [string, string]

export function aboveIn(world: World, at: string): string | null {
  let folder = dirname(dirname(at))
  while (folder !== ITSELF && folder !== "" && folder !== PARTED_BY) {
    const held = `${folder}${PARTED_BY}${MANIFEST}`
    if (world.textOf(held) !== null) return held
    folder = dirname(folder)
  }
  if (at === MANIFEST || world.textOf(MANIFEST) === null) return null
  return MANIFEST
}

export function namingFor(
  held: Record<string, unknown>,
  was: string,
  under: string,
  to: string
): ReadonlyMap<string, string> | null {
  const said = held[EXPORTS]
  if (said === undefined) return new Map()
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const found = new Map<string, string>()
  for (const [key, one] of Object.entries(said as Record<string, unknown>)) {
    if (typeof one !== "string" || !one.startsWith(OPENING)) return null
    if (key !== ITSELF && !key.startsWith(OPENING)) return null
    const tail = key === ITSELF ? "" : key.slice(OPENING.length)
    const from = tail === "" ? was : `${was}${PARTED_BY}${tail}`
    found.set(from, `${to}${PARTED_BY}${join(under, one.slice(OPENING.length))}`)
  }
  return found
}

export function pairsIn(held: Record<string, unknown>, key: string): readonly Pair[] {
  const said = held[key]
  if (said === null || typeof said !== "object" || Array.isArray(said)) return []
  const found: Pair[] = []
  for (const [one, value] of Object.entries(said as Record<string, unknown>)) {
    if (typeof value === "string") found.push([one, value])
  }
  return found
}

export function waysIn(held: Record<string, unknown>, under: string): readonly Pair[] | null {
  const said = held[EXPORTS]
  if (said === undefined) return []
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const opened = `${OPENING}${under}${PARTED_BY}`
  const found: Pair[] = []
  for (const [key, one] of Object.entries(said as Record<string, unknown>)) {
    if (typeof one !== "string") return null
    if (!key.startsWith(OPENING) || !one.startsWith(OPENING)) return null
    found.push([`${opened}${key.slice(OPENING.length)}`, `${opened}${one.slice(OPENING.length)}`])
  }
  return found
}

export function objectPut(pairs: readonly Pair[]): string {
  if (pairs.length === 0) return "{}"
  const lines = pairs.map(
    ([key, one]) => `${INDENT}${INDENT}${JSON.stringify(key)}: ${JSON.stringify(one)}`
  )
  return `{\n${lines.join(",\n")}\n${INDENT}}`
}

function namesIn(text: string): ReadonlySet<string> {
  const held = objectIn(text)
  const found = new Set<string>()
  if (held === null) return found
  for (const field of HOLDING) {
    for (const [one] of pairsIn(held, field)) found.add(one)
  }
  return found
}

function dependingIn(held: Record<string, unknown>): readonly Pair[] | null {
  for (const field of HOLDING) {
    if (field !== DEPENDENCIES && held[field] !== undefined) return null
  }
  return pairsIn(held, DEPENDENCIES)
}

function objectSplice(source: ts.JsonSourceFile, key: string, put: string): Splice | null {
  const held = objectAt(source, key)
  if (held === null) return null
  return { from: held.getStart(source), to: held.getEnd(), put }
}

function inOrder(spots: readonly Splice[]): readonly Splice[] {
  return [...spots].sort((one, two) => one.from - two.from)
}

export function keysRenamed(at: string, text: string, was: string, to: string): readonly Splice[] {
  const source = ts.parseJsonText(at, text)
  const found: Splice[] = []
  for (const field of HOLDING) {
    const held = objectAt(source, field)
    if (held === null) continue
    for (const one of held.properties) {
      if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
      if (one.name.text !== was) continue
      const key = one.name
      found.push({ from: key.getStart(source), to: key.getEnd(), put: JSON.stringify(to) })
    }
  }
  return inOrder(found)
}

export function keysDropped(at: string, text: string, was: string): readonly Splice[] {
  const found: Splice[] = []
  const dropping = new Set([was])
  for (const field of HOLDING) found.push(...entriesGoingIn(at, text, field, dropping))
  return inOrder(found)
}

function overEdits(
  over: string,
  overText: string,
  ways: readonly Pair[],
  asked: readonly Pair[],
  was: string,
  to: string
): readonly FileChange[] | string {
  const held = objectIn(overText)
  if (held === null || Array.isArray(held)) {
    return `\`${over}\` reads as no JSON object, ${UNFOLDED}`
  }
  const source = ts.parseJsonText(over, overText)
  const spots: Splice[] = []
  const waysAt = objectSplice(source, EXPORTS, objectPut([...pairsIn(held, EXPORTS), ...ways]))
  if (waysAt === null) return `\`${over}\` states no \`${EXPORTS}\` of its own, ${UNFOLDED}`
  spots.push(waysAt)
  const named = namesIn(overText)
  const adding = asked.filter(([one]) => one !== to && one !== was && !named.has(one))
  const had = pairsIn(held, DEPENDENCIES)
  const kept = had.filter(([one]) => one !== was)
  if (adding.length > 0 || kept.length !== had.length) {
    const at = objectSplice(source, DEPENDENCIES, objectPut([...kept, ...adding]))
    if (at === null) return `\`${over}\` states no \`${DEPENDENCIES}\` of its own, ${UNFOLDED}`
    spots.push(at)
  }
  return splicing(over, overText, inOrder(spots))
}

function aliasEdits(
  world: World,
  at: string,
  over: string,
  was: string,
  to: string | null
): readonly FileChange[] {
  const found: FileChange[] = []
  for (const path of manifestsIn(world.index.everyPath(), world.index.fileKeysAt())) {
    if (path === at || path === over) continue
    const body = world.textOf(path)
    if (body === null) continue
    const named = namesIn(body)
    if (!named.has(was)) continue
    const spots =
      to === null || named.has(to) ? keysDropped(path, body, was) : keysRenamed(path, body, was, to)
    found.push(...splicing(path, body, spots))
  }
  return found
}

type Spelling = (path: string, body: string) => readonly Splice[]

function reachEdits(world: World, was: string, spelling: Spelling): readonly FileChange[] {
  const found: FileChange[] = []
  for (const path of world.index.everyPath()) {
    if (!typed(path)) continue
    const body = world.textOf(path)
    if (body === null || !body.includes(was)) continue
    found.push(...splicing(path, body, spelling(path, body)))
  }
  return found
}

function rootEdits(
  over: string,
  overText: string,
  asked: readonly Pair[],
  was: string
): readonly FileChange[] | string {
  const held = objectIn(overText)
  if (held === null || Array.isArray(held)) {
    return `\`${over}\` reads as no JSON object, ${UNFOLDED}`
  }
  const named = namesIn(overText)
  const adding = asked.filter(([one]) => one !== was && !named.has(one))
  const had = pairsIn(held, DEPENDENCIES)
  const kept = had.filter(([one]) => one !== was)
  if (adding.length === 0 && kept.length === had.length) return []
  const source = ts.parseJsonText(over, overText)
  const at = objectSplice(source, DEPENDENCIES, objectPut([...kept, ...adding]))
  if (at === null) return `\`${over}\` states no \`${DEPENDENCIES}\` of its own, ${UNFOLDED}`
  return splicing(over, overText, [at])
}

function rootedFold(world: World, at: string, given: Rooted): Said {
  const naming = namingFor(given.held, given.was, given.under, given.to)
  if (naming === null) {
    return refusing(`\`${at}\` states its ways in as no object of paths, ${UNFOLDED}`)
  }
  const first = rootEdits(given.over, given.overText, given.asked, given.was)
  if (typeof first === "string") return refusing(first)
  const edits: FileChange[] = [...first, { kind: "remove", path: at }]
  edits.push(...aliasEdits(world, at, given.over, given.was, null))
  edits.push(...reachEdits(world, given.was, (p, b) => spelledByNaming(p, b, naming)))
  return stating(edits)
}

export function removePackageManifest(world: World, given: RemovePackageManifestAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const held = objectIn(text)
  if (held === null || Array.isArray(held)) {
    return refusing(`\`${given.at}\` reads as no JSON object, ${UNFOLDED}`)
  }
  const was = calledIn(text)
  if (was === null) return refusing(`\`${given.at}\` states no \`${NAME}\`, ${UNFOLDED}`)
  const over = aboveIn(world, given.at)
  if (over === null) return refusing(`\`${given.at}\` sits under no other package, ${UNFOLDED}`)
  const overText = world.textOf(over)
  if (overText === null) return refusing(`\`${over}\` could not be read`)
  const to = calledIn(overText)
  if (to === null) return refusing(`\`${over}\` states no \`${NAME}\`, ${UNFOLDED}`)
  const under = relative(dirname(over), dirname(given.at))
  const asked = dependingIn(held)
  if (asked === null) {
    return refusing(`\`${given.at}\` names a dependency outside \`${DEPENDENCIES}\`, ${UNFOLDED}`)
  }
  if (over === MANIFEST) {
    return rootedFold(world, given.at, { over, overText, held, was, to, under, asked })
  }
  const ways = waysIn(held, under)
  if (ways === null) {
    return refusing(`\`${given.at}\` states its ways in as no object of paths, ${UNFOLDED}`)
  }
  const first = overEdits(over, overText, ways, asked, was, to)
  if (typeof first === "string") return refusing(first)
  const edits: FileChange[] = [...first, { kind: "remove", path: given.at }]
  edits.push(...aliasEdits(world, given.at, over, was, to))
  const spelled = `${to}${PARTED_BY}${under}`
  edits.push(...reachEdits(world, was, (path, body) => spelledAnew(path, body, was, spelled)))
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export function runChange(world: World, given: Asked): Said {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return removePackageManifest(world, { at })
}
