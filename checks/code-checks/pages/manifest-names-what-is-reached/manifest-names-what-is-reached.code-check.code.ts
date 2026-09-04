import { builtinModules } from "node:module"
import { join } from "node:path"
import { landingOf, specifiersIn } from "@akasha/code-system/code-specifier"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import {
  bodyNamed,
  everyFileOf,
  FILES,
  input,
  overEachFile,
  styleNamed,
  textIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  type Manifest,
  manifestIn,
  manifestsIn,
  nameIn,
} from "../package-reached-where-named/package-reached-where-named.code-check.code.ts"

const AT = "@"

const PARTED_BY = "/"

const NODE = "node:"

const BUN = "bun:"

const BUN_ITSELF = "bun"

const TYPES = "@types/"

const TYPES_PARTED_BY = "__"

const TYPES_BUN = "@types/bun"

const TYPES_NODE = "@types/node"

const TYPESCRIPT = "typescript"

const TSCONFIG = "tsconfig.json"

const CAPACITOR = "@capacitor/"

const CAPACITOR_CONFIG = "capacitor-config"

const SCRIPTS = "scripts"

const PEERS = "peerDependencies"

const NAMING = ["dependencies", "devDependencies", PEERS, "optionalDependencies"] as const

const OWN: readonly string[] = ["dependencies", "devDependencies"]

const WORDS = /\s+/

const IMPORTED = /@import\s+(?:url\(\s*)?["']([^"'\n]+)["']/g

const URLED = /\burl\(\s*(?:["']([^"'\n]+)["']|([^"')\s]+))\s*\)/g

const SCHEMED = /^[a-zA-Z][a-zA-Z0-9+.-]*:/

const FRAGMENT = "#"

const BUILTIN = new Set(builtinModules)

const SAID = "a manifest names what its own package reaches and nothing besides"

export type Reach = {
  readonly packages: ReadonlySet<string>
  readonly protocols: ReadonlySet<string>
}

export type Named = {
  readonly folder: string
  readonly at: string
  readonly called: string
  readonly declared: ReadonlyMap<string, string>
  readonly peers: ReadonlySet<string>
  readonly commands: ReadonlySet<string>
}

const NOTHING: Reach = { packages: new Set(), protocols: new Set() }

export function packageOf(at: string, specifier: string): string | null {
  if (specifier.startsWith(PARTED_BY)) return null
  if (landingOf(at, specifier) !== null) return null
  if (specifier.startsWith(NODE) || specifier.startsWith(BUN)) return null
  const scope = specifier.split(PARTED_BY)[0]
  if (scope === undefined || scope === "") return null
  if (!scope.startsWith(AT)) {
    return BUILTIN.has(scope) || scope === BUN_ITSELF ? null : scope
  }
  const slug = specifier.split(PARTED_BY)[1]
  if (slug === undefined || slug === "") return null
  return `${scope}${PARTED_BY}${slug}`
}

export function reachIn(at: string, text: string): Reach {
  const packages = new Set<string>()
  const protocols = new Set<string>()
  for (const one of specifiersIn(at, text)) {
    if (one.startsWith(NODE) || one.startsWith(BUN)) {
      protocols.add(one)
      continue
    }
    const found = packageOf(at, one)
    if (found !== null) packages.add(found)
  }
  return { packages, protocols }
}

export function styleSpecifiersIn(text: string): readonly string[] {
  const found: string[] = []
  for (const one of text.matchAll(IMPORTED)) {
    const said = one[1]
    if (said !== undefined) found.push(said)
  }
  for (const one of text.matchAll(URLED)) {
    const said = one[1] ?? one[2]
    if (said !== undefined) found.push(said)
  }
  return found
}

export function styleReachIn(at: string, text: string): Reach {
  const packages = new Set<string>()
  for (const one of styleSpecifiersIn(text)) {
    if (one.startsWith(FRAGMENT) || SCHEMED.test(one)) continue
    const found = packageOf(at, one)
    if (found !== null) packages.add(found)
  }
  return { packages, protocols: new Set() }
}

export function reachFrom(at: string, text: string): Reach {
  return styleNamed(at) ? styleReachIn(at, text) : reachIn(at, text)
}

export function typesFor(named: string): string {
  if (!named.startsWith(AT)) return `${TYPES}${named}`
  return `${TYPES}${named.slice(AT.length).split(PARTED_BY).join(TYPES_PARTED_BY)}`
}

export function typesTargetOf(named: string): string {
  const bare = named.slice(TYPES.length)
  const parted = bare.split(TYPES_PARTED_BY)
  const scope = parted[0]
  const slug = parted[1]
  if (parted.length !== 2 || scope === undefined || slug === undefined) return bare
  return `${AT}${scope}${PARTED_BY}${slug}`
}

function keysOf(held: Record<string, unknown>, field: string): readonly string[] {
  const said = held[field]
  if (said === null || typeof said !== "object") return []
  return Object.keys(said as Record<string, unknown>)
}

function commandsOf(held: Record<string, unknown>): ReadonlySet<string> {
  const found = new Set<string>()
  const said = held[SCRIPTS]
  if (said === null || typeof said !== "object") return found
  for (const one of Object.values(said as Record<string, unknown>)) {
    if (typeof one !== "string") continue
    for (const word of one.split(WORDS)) {
      if (word !== "") found.add(word)
    }
  }
  return found
}

export function declaringIn(folder: string, at: string, text: string): Named | null {
  const held = manifestIn(text)
  if (held === null) return null
  const declared = new Map<string, string>()
  for (const field of NAMING) {
    for (const one of keysOf(held, field)) declared.set(one, field)
  }
  return {
    folder,
    at,
    called: nameIn(text) ?? folder,
    declared,
    peers: new Set(keysOf(held, PEERS)),
    commands: commandsOf(held),
  }
}

export function ownerOf(folders: readonly string[], path: string): string | null {
  let found: string | null = null
  for (const one of folders) {
    if (!path.startsWith(`${one}${PARTED_BY}`)) continue
    if (found === null || one.length > found.length) found = one
  }
  return found
}

export function unnamedIn(
  held: Named,
  names: ReadonlySet<string>,
  reach: Reach
): readonly string[] {
  const said: string[] = []
  for (const one of reach.packages) {
    if (names.has(one)) continue
    if (held.declared.has(one)) continue
    if (held.declared.has(typesFor(one))) continue
    said.push(`reaches \`${one}\`, which \`${held.called}\` does not name — ${SAID}`)
  }
  return said
}

function peeredIn(dep: string, held: Named, byName: ReadonlyMap<string, Named>): boolean {
  for (const [other] of held.declared) {
    if (other === dep) continue
    if (byName.get(other)?.peers.has(dep) === true) return true
  }
  return false
}

function protocolUnder(reach: Reach, mark: string): boolean {
  for (const one of reach.protocols) {
    if (one.startsWith(mark)) return true
  }
  return false
}

export function creditedIn(
  dep: string,
  held: Named,
  byName: ReadonlyMap<string, Named>,
  reach: Reach,
  standing: (named: string) => boolean,
  config: string | null
): boolean {
  if (byName.has(dep)) return true
  if (reach.packages.has(dep)) return true
  if (held.peers.has(dep)) return true
  if (held.commands.has(dep)) return true
  if (peeredIn(dep, held, byName)) return true
  if (dep === TYPESCRIPT && standing(TSCONFIG)) return true
  if (dep.startsWith(CAPACITOR) && config !== null && standing(config)) return true
  if (dep === TYPES_BUN && protocolUnder(reach, BUN)) return true
  if (dep === TYPES_NODE && protocolUnder(reach, NODE)) return true
  if (!dep.startsWith(TYPES)) return false
  const target = typesTargetOf(dep)
  return reach.packages.has(target) || held.declared.has(target)
}

export function unreachedIn(
  held: Named,
  byName: ReadonlyMap<string, Named>,
  reach: Reach,
  standing: (named: string) => boolean,
  config: string | null
): readonly string[] {
  const said: string[] = []
  for (const [dep, field] of held.declared) {
    if (!OWN.includes(field)) continue
    if (creditedIn(dep, held, byName, reach, standing, config)) continue
    said.push(`names \`${dep}\` under \`${field}\`, which nothing it holds reaches — ${SAID}`)
  }
  return said
}

function configNamed(shadow: Shadow): string | null {
  return shadow.index.fileKeysAt().get(CAPACITOR_CONFIG) ?? null
}

function thereIn(change: Change, folder: string): (named: string) => boolean {
  return (named) => change.after(join(folder, named)) !== null
}

function declaringOver(change: Change, standing: readonly Manifest[]): readonly Named[] {
  const found: Named[] = []
  for (const one of standing) {
    const text = textIn(change, one.at)
    if (text === null) continue
    const held = declaringIn(one.folder, one.at, text)
    if (held !== null) found.push(held)
  }
  return found
}

function holdingBy(
  folders: readonly string[],
  every: readonly string[]
): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of folders) found.set(one, [])
  for (const path of every) {
    if (!bodyNamed(path)) continue
    const owner = ownerOf(folders, path)
    if (owner === null) continue
    found.get(owner)?.push(path)
  }
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const packages = declaringOver(change, manifestsIn(shadow))
  if (packages.length === 0) return []
  const folders = packages.map((one) => one.folder)
  const byName = new Map(packages.map((one) => [one.called, one]))
  const names = new Set(byName.keys())
  const byFolder = new Map(packages.map((one) => [one.folder, one]))
  const carried = new Map(packages.map((one) => [one.at, one]))
  const config = configNamed(shadow)
  const holding = holdingBy(folders, everyFileOf(shadow.index))
  const reaches = new Map<string, Reach>()

  const reachAt = (path: string): Reach => {
    const found = reaches.get(path)
    if (found !== undefined) return found
    const text = textIn(change, path)
    const made = text === null ? NOTHING : reachFrom(path, text)
    reaches.set(path, made)
    return made
  }

  const wholeOf = (held: Named): Reach => {
    const reached = new Set<string>()
    const protocols = new Set<string>()
    for (const path of holding.get(held.folder) ?? []) {
      const found = reachAt(path)
      for (const one of found.packages) reached.add(one)
      for (const one of found.protocols) protocols.add(one)
    }
    return { packages: reached, protocols }
  }

  return overEachFile(change, (given) => {
    const held = carried.get(given.path)
    if (held !== undefined) {
      return unreachedIn(held, byName, wholeOf(held), thereIn(change, held.folder), config)
    }
    if (!textNamed(given.path)) return []
    const owner = ownerOf(folders, given.path)
    if (owner === null) return []
    const under = byFolder.get(owner)
    return under === undefined ? [] : unnamedIn(under, names, reachAt(given.path))
  })
}

export const manifestNamesWhatIsReached = input(FILES, refusalsIn)
