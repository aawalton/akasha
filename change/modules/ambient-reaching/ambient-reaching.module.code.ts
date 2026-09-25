import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  entriesIn,
  filesReached,
} from "akasha/check/code/pages/no-unused-modules/modules/bundle-reaching/bundle-reaching.module.code.ts"
import {
  bindingOf,
  declaredIn,
  globallyReached,
  identifiersIn,
  referencing,
  typeParameterOf,
} from "akasha/code/reading/modules/code-binding/code-binding.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const HOSTED = "+"

const AMBIENT = "ambient-types"

const SECTION = "d"

const HELD = "ts"

export const UNDER = "akasha"

export const PARTED = "/"

export type Declaring = ReadonlyMap<string, readonly string[]>

export type Reaching = Map<string, readonly string[]>

export function declaringIn(world: World): Declaring {
  const found = new Map<string, string[]>()
  const carried = world.index.carryingOf(AMBIENT)
  if ("refused" in carried) return found
  for (const listed of carried.carrying) {
    const at = besideAt(listed.path, SECTION, HELD)
    if (at === null) continue
    const text = world.textOf(at)
    if (text === null) continue
    for (const name of declaredIn(parsedAs(at, text)).keys()) {
      const held = found.get(name)
      if (held === undefined) found.set(name, [at])
      else held.push(at)
    }
  }
  return found
}

export type Reading = {
  readonly declaring: Declaring
  readonly hosted: ReadonlySet<string>
  readonly lua: ReadonlySet<string>
}

const NOTHING: ReadonlySet<string> = new Set()

const HOSTS = ["lib.esnext.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"]

const TYPED = ["node_modules/@types/node/index.d.ts", "node_modules/bun-types/index.d.ts"]

const TYPES = "node_modules/@types"

const INDEX = "index.d.ts"

const ENCODING = "utf8"

const hostedBy = new Map<string, ReadonlySet<string>>()

function globalsIn(source: ts.SourceFile, into: Set<string>): undefined {
  if (!ts.isExternalModule(source)) for (const name of declaredIn(source).keys()) into.add(name)
  const walk = (node: ts.Node): undefined => {
    if (ts.isModuleDeclaration(node) && (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0) {
      for (const name of declaredIn(node).keys()) into.add(name)
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
}

export function hostedIn(root: string): ReadonlySet<string> {
  const held = hostedBy.get(root)
  if (held !== undefined) return held
  const found = new Set<string>()
  const seen = new Set<string>()
  const libraries = dirname(ts.getDefaultLibFilePath({}))
  const rest = [...HOSTS.map((one) => join(libraries, one)), ...TYPED.map((one) => join(root, one))]
  while (rest.length > 0) {
    const at = rest.pop()
    if (at === undefined || seen.has(at) || !existsSync(at)) continue
    seen.add(at)
    const text = readFileSync(at, ENCODING)
    globalsIn(parsedAs(at, text), found)
    const said = ts.preProcessFile(text, true, true)
    for (const one of said.libReferenceDirectives) {
      rest.push(join(libraries, `lib.${one.fileName.toLowerCase()}.d.ts`))
    }
    for (const one of said.referencedFiles) rest.push(join(dirname(at), one.fileName))
    for (const one of said.typeReferenceDirectives) {
      rest.push(join(root, TYPES, one.fileName, INDEX))
    }
  }
  hostedBy.set(root, found)
  return found
}

export function luaReachIn(world: World): ReadonlySet<string> {
  const paged = { pageOf: world.index.pageByPath, index: world.index }
  const holds = (path: string): boolean => world.textOf(path) !== null
  return filesReached(world.root, world.under(""), world.textOf, entriesIn(paged, holds))
}

export function readingIn(world: World): Reading {
  return { declaring: declaringIn(world), hosted: hostedIn(world.root), lua: luaReachIn(world) }
}

export function skippedFor(reading: Reading, path: string): ReadonlySet<string> {
  return reading.lua.has(path) ? NOTHING : reading.hosted
}

export function namesIn(
  declaring: Declaring,
  at: string,
  text: string,
  skipped: ReadonlySet<string> = NOTHING
): readonly string[] {
  const found = new Set<string>()
  for (const one of identifiersIn(parsedAs(at, text))) {
    if (!declaring.has(one.text) || skipped.has(one.text)) continue
    if (!globallyReached(one)) {
      if (!referencing(one)) continue
      if (bindingOf(one) !== null || typeParameterOf(one) !== null) continue
    }
    found.add(one.text)
  }
  return [...found]
}

export function namesAt(
  world: World,
  declaring: Declaring,
  at: string,
  reaching: Reaching,
  skipped: ReadonlySet<string> = NOTHING
): readonly string[] {
  const key = skipped.size === 0 ? at : `${HOSTED}${at}`
  const held = reaching.get(key)
  if (held !== undefined) return held
  const body = world.textOf(at)
  const names = body === null ? [] : namesIn(declaring, at, body, skipped)
  reaching.set(key, names)
  return names
}

export function reachedIn(
  world: World,
  declaring: Declaring,
  path: string,
  text: string,
  reaching: Reaching = new Map(),
  skipped: ReadonlySet<string> = NOTHING
): readonly string[] {
  const found = new Set<string>()
  const rest = [...namesIn(declaring, path, text, skipped)]
  while (rest.length > 0) {
    const name = rest.pop()
    const held = name === undefined ? undefined : declaring.get(name)
    for (const at of held ?? []) {
      if (found.has(at)) continue
      found.add(at)
      rest.push(...namesAt(world, declaring, at, reaching, skipped))
    }
  }
  return [...found].map((one) => `${UNDER}${PARTED}${one}`).sort()
}
