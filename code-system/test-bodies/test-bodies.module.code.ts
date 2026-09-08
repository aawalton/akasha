import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { dirname, extname, join, resolve } from "node:path"
import type { BunPlugin } from "bun"
import { reachesIn } from "../package-manifest/package-manifest.module.code.ts"

export const SERVED = "body"

export const SERVING = import.meta.path

export type Form = "ts" | "tsx" | "js" | "jsx"

export type Bodies = Readonly<Record<string, string | null>>

export type Reaches = Readonly<Record<string, string>>

export type Serving = {
  readonly root: string
  readonly preload: string
  readonly standing: ReadonlyMap<string, string>
  readonly sweep: () => undefined
}

export type Served = {
  readonly contents: string
  readonly loader: Form
}

export type Paired = {
  readonly paths: ReadonlyMap<string, string>
  readonly spelled: ReadonlyMap<string, string>
}

export type Manifested = {
  readonly folder: string
  readonly was: string | null
  readonly now: string | null
}

export type Brought = (reached: string) => boolean

export type Pairing = {
  readonly wasFolder: string
  readonly nowFolder: string
  readonly was: string
  readonly now: string
}

const FILE = "file"

const MARK = `${SERVED}:`

const MARKING = new RegExp(`^/?${MARK}`)

const NAME = "akasha-test-bodies"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const EVERY = /.*/

const NOTHING = /(?!)/

const NEAR = /^\.\.?\//

const RELATIVE =
  /(\bfrom\s+|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)(["'])(\.\.?\/[^"']*)\2/g

const MANIFEST = "/package.json"

const HOLD = "/var/tmp"

const PREFIX = "akasha-serving-"

const BODIES_FILE = "bodies.json"

const PRELOAD_FILE = "preload.ts"

const SERVING_FILE = "serving.ts"

const SHIM = ".test.ts"

const LOADERS: Readonly<Record<string, Form>> = {
  ".ts": "ts",
  ".tsx": "tsx",
  ".js": "js",
  ".jsx": "jsx",
}

function escaped(one: string): string {
  return one.replace(SPECIAL, "\\$&")
}

export function wholeOf(named: readonly string[]): RegExp {
  if (named.length === 0) return NOTHING
  return new RegExp(`^(${named.map(escaped).join("|")})$`)
}

export function endingOf(named: readonly string[]): RegExp {
  if (named.length === 0) return NOTHING
  const parts = new Set(named.map((one) => escaped(one.slice(one.lastIndexOf("/") + 1))))
  return new RegExp(`(?:^|/)(${[...parts].join("|")})$`)
}

export function folderOf(importer: string): string {
  return dirname(importer.replace(MARKING, ""))
}

export function loaderOf(path: string): Form | null {
  return LOADERS[extname(path)] ?? null
}

export function bodiesAt(at: string): Bodies {
  return JSON.parse(readFileSync(at, "utf8")) as Bodies
}

export function preloadingOf(at: string, serving: string = SERVING, reaches: Reaches = {}): string {
  return (
    `import { bodiesAt, servedBy } from ${JSON.stringify(serving)}\n` +
    `Bun.plugin(servedBy(bodiesAt(${JSON.stringify(at)}), ${JSON.stringify(reaches)}))\n`
  )
}

export function servingOut(bodies: Bodies, path: string): Served {
  const body = bodies[path] ?? null
  if (body === null) throw new Error(`\`${path}\` is taken away by the change these tests judge`)
  const form = loaderOf(path)
  if (form !== null) return { contents: body, loader: form }
  return { contents: `export default ${JSON.stringify(body)}\n`, loader: "js" }
}

function bodyOf(at: (path: string) => Uint8Array | null, one: string): string | null {
  try {
    const bytes = at(one)
    return bytes === null ? null : new TextDecoder().decode(bytes)
  } catch (thrown) {
    const said = thrown instanceof Error ? thrown.message : String(thrown)
    throw new Error(`the body handed in for \`${one}\` would not be read — ${said}`)
  }
}

export function absoluteIn(text: string, folder: string): string {
  let out = ""
  let from = 0
  for (const found of text.matchAll(RELATIVE)) {
    const said = found[3]
    if (said === undefined) continue
    out += text.slice(from, found.index) + found[1] + found[2] + resolve(folder, said) + found[2]
    from = found.index + found[0].length
  }
  return out + text.slice(from)
}

export function spellingIn(text: string, said: ReadonlyMap<string, string>): string {
  let held = text
  for (const [reads, holds] of said) {
    held = held.split(`"${reads}"`).join(`"${holds}"`)
    held = held.split(`'${reads}'`).join(`'${holds}'`)
  }
  return held
}

export function pairedIn(
  wasFolder: string,
  nowFolder: string,
  was: string,
  now: string,
  brought: Brought
): Paired {
  const paths = new Map<string, string>()
  const spelled = new Map<string, string>()
  const before = reachesIn(wasFolder, was)
  const after = reachesIn(nowFolder, now)
  const gone: (readonly [string, string])[] = []
  const come: (readonly [string, string])[] = []
  for (const [key, to] of before) {
    const holds = after.get(key)
    if (holds === undefined) gone.push([key, to])
    else if (holds !== to) paths.set(to, holds)
  }
  for (const [key, to] of after) if (!before.has(key)) come.push([key, to])
  const one = gone[0]
  const two = come[0]
  if (
    gone.length === 1 &&
    come.length === 1 &&
    one !== undefined &&
    two !== undefined &&
    brought(two[1])
  ) {
    paths.set(one[1], two[1])
    spelled.set(two[0], one[0])
  }
  return { paths, spelled }
}

export function manifestedIn(
  root: string,
  paths: readonly string[],
  bodies: Bodies,
  was: (path: string) => Uint8Array | null
): readonly Manifested[] {
  const found: Manifested[] = []
  for (const one of paths) {
    if (!one.endsWith(MANIFEST)) continue
    const at = join(root, one)
    found.push({ folder: dirname(at), was: bodyOf(was, one), now: bodies[at] ?? null })
  }
  return found
}

export function pairingsIn(held: readonly Manifested[]): readonly Pairing[] {
  const found: Pairing[] = []
  const gone: Manifested[] = []
  const come: Manifested[] = []
  for (const one of held) {
    if (one.was !== null && one.now !== null) {
      found.push({ wasFolder: one.folder, nowFolder: one.folder, was: one.was, now: one.now })
    } else if (one.was !== null) gone.push(one)
    else if (one.now !== null) come.push(one)
  }
  if (gone.length !== 1 || come.length !== 1) return found
  const first = gone[0]
  const second = come[0]
  if (first === undefined || second === undefined) return found
  const before = first.was
  const after = second.now
  if (before === null || after === null) return found
  found.push({
    wasFolder: first.folder,
    nowFolder: second.folder,
    was: before,
    now: after,
  })
  return found
}

export function reachingIn(held: readonly Pairing[], brought: Brought): Reaches {
  const found: Record<string, string> = {}
  for (const one of held) {
    const every = reachesIn(one.nowFolder, one.now)
    if (one.wasFolder !== one.nowFolder) {
      for (const [specifier, at] of every) found[specifier] = at
      continue
    }
    const before = reachesIn(one.wasFolder, one.was)
    for (const [specifier, at] of every) {
      if (!before.has(specifier) && brought(at)) found[specifier] = at
    }
  }
  return found
}

function servingAt(held: string, bodies: Bodies): string {
  const body = bodies[SERVING] ?? null
  if (body === null) return SERVING
  const at = join(held, SERVING_FILE)
  writeFileSync(at, absoluteIn(body, dirname(SERVING)))
  return at
}

export function servingOf(
  from: string,
  paths: readonly string[],
  at: (path: string) => Uint8Array | null,
  named: readonly string[],
  was: (path: string) => Uint8Array | null = () => null
): Serving {
  const held = mkdtempSync(join(HOLD, PREFIX))
  try {
    const root = realpathSync(from)
    const bodies: Record<string, string | null> = {}
    for (const one of paths) bodies[join(root, one)] = bodyOf(at, one)
    const brought: Brought = (reached) => typeof bodies[reached] === "string"
    const spelled = new Map<string, string>()
    const pairings = pairingsIn(manifestedIn(root, paths, bodies, was))
    for (const pair of pairings) {
      const found = pairedIn(pair.wasFolder, pair.nowFolder, pair.was, pair.now, brought)
      for (const [gone, come] of found.paths) {
        const body = bodies[come] ?? null
        if (body === null) continue
        bodies[gone] = absoluteIn(body, dirname(come))
      }
      for (const [reads, holds] of found.spelled) spelled.set(reads, holds)
    }
    for (const [one, body] of Object.entries(bodies)) {
      if (body === null || spelled.size === 0) continue
      bodies[one] = spellingIn(body, spelled)
    }
    const standing = new Map<string, string>()
    for (const one of named) {
      const real = join(root, one)
      if (existsSync(real) || (bodies[real] ?? null) === null) continue
      const shim = join(held, `${standing.size}${SHIM}`)
      writeFileSync(shim, `import ${JSON.stringify(real)}\n`)
      standing.set(one, shim)
    }
    const filed = join(held, BODIES_FILE)
    writeFileSync(filed, JSON.stringify(bodies))
    const preload = join(held, PRELOAD_FILE)
    writeFileSync(
      preload,
      preloadingOf(filed, servingAt(held, bodies), reachingIn(pairings, brought))
    )
    return {
      root,
      preload,
      standing,
      sweep: (): undefined => {
        rmSync(held, { recursive: true, force: true })
      },
    }
  } catch (thrown) {
    rmSync(held, { recursive: true, force: true })
    throw thrown
  }
}

export function servedBy(bodies: Bodies, reaches: Reaches = {}): BunPlugin {
  const named = Object.keys(bodies)
  const apart = new Set(named.filter((one) => !existsSync(one)))
  return {
    name: NAME,
    setup: (build): undefined => {
      for (const [specifier, at] of Object.entries(reaches)) {
        build.module(specifier, async () => ({
          exports: (await import(at)) as Record<string, unknown>,
          loader: "object",
        }))
      }
      build.onResolve({ filter: NEAR }, (args) => {
        if (!MARKING.test(args.importer)) return undefined
        const from = folderOf(args.importer)
        const at = resolve(from, args.path)
        if (apart.has(at)) return { path: at, namespace: SERVED }
        return { path: Bun.resolveSync(at, from), namespace: FILE }
      })
      build.onResolve({ filter: endingOf(named) }, (args) => {
        const at = resolve(folderOf(args.importer), args.path)
        return apart.has(at) ? { path: at, namespace: SERVED } : undefined
      })
      build.onLoad({ filter: wholeOf(named) }, (args) => servingOut(bodies, args.path))
      build.onLoad({ filter: EVERY, namespace: SERVED }, (args) => servingOut(bodies, args.path))
    },
  }
}
