import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"

const CONFIG = "tsconfig.json"

const WILDCARD = "*"

type Pattern = {
  readonly head: string
  readonly tail: string
  readonly targets: readonly string[]
}

type Aliases = {
  readonly dir: string
  readonly exact: ReadonlyMap<string, readonly string[]>
  readonly patterns: readonly Pattern[]
}

const ALIASES_NONE: Aliases = { dir: "", exact: new Map(), patterns: [] }

function targetsIn(held: unknown): readonly string[] {
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function pathsIn(dir: string): Readonly<Record<string, unknown>> | null {
  let text: string
  try {
    text = readFileSync(`${dir}/${CONFIG}`, "utf8")
  } catch {
    return null
  }
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return null
  }
  if (typeof held !== "object" || held === null || Array.isArray(held)) return null
  const options: unknown = Reflect.get(held, "compilerOptions")
  if (typeof options !== "object" || options === null || Array.isArray(options)) return null
  const paths: unknown = Reflect.get(options, "paths")
  if (typeof paths !== "object" || paths === null || Array.isArray(paths)) return null
  return paths as Readonly<Record<string, unknown>>
}

function aliasesAt(dir: string): Aliases {
  const paths = pathsIn(dir)
  if (paths === null) return ALIASES_NONE
  const exact = new Map<string, readonly string[]>()
  const patterns: Pattern[] = []
  for (const [specifier, held] of Object.entries(paths)) {
    const targets = targetsIn(held)
    if (targets.length === 0) continue
    const at = specifier.indexOf(WILDCARD)
    if (at < 0) exact.set(specifier, targets)
    else patterns.push({ head: specifier.slice(0, at), tail: specifier.slice(at + 1), targets })
  }
  patterns.sort((one, two) => two.head.length - one.head.length)
  return { dir, exact, patterns }
}

const HELD = new Map<string, Aliases>()

function foundFor(root: string, dir: string): Aliases {
  if (existsSync(`${dir}/${CONFIG}`)) return aliasesAt(dir)
  const up = dirname(dir)
  if (dir === root || up === dir) return ALIASES_NONE
  return aliasesFor(root, up)
}

function aliasesFor(root: string, dir: string): Aliases {
  const found = HELD.get(dir)
  if (found !== undefined) return found
  const made = foundFor(root, dir)
  HELD.set(dir, made)
  return made
}

export function aliasedTo(root: string, from: string, named: string): readonly string[] {
  const held = aliasesFor(root, dirname(from))
  const exact = held.exact.get(named)
  if (exact !== undefined) return exact.map((target) => resolve(held.dir, target))
  for (const one of held.patterns) {
    if (named.length < one.head.length + one.tail.length) continue
    if (!named.startsWith(one.head) || !named.endsWith(one.tail)) continue
    const filled = named.slice(one.head.length, named.length - one.tail.length)
    return one.targets
      .filter((target) => target.includes(WILDCARD))
      .map((target) => resolve(held.dir, target.replace(WILDCARD, filled)))
  }
  return []
}
