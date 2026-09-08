import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { dirname, extname, join, resolve } from "node:path"
import type { BunPlugin } from "bun"
import { reachesIn, reachingOver } from "../package-manifest/package-manifest.module.code.ts"

export const SERVED = "body"

export const SERVING = import.meta.path

export type Form = "ts" | "tsx" | "js" | "jsx" | "json" | "css" | "toml" | "text"

export type Bodies = Readonly<Record<string, string | null>>

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

const FILE = "file"

const MARK = `${SERVED}:`

const NAME = "akasha-test-bodies"

const TEXT = "text"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const EVERY = /.*/

const NOTHING = /(?!)/

const NEAR = /^\.\.?\//

const HOLD = "/var/tmp"

const PREFIX = "akasha-serving-"

const BODIES_FILE = "bodies.json"

const MANIFEST = "/package.json"

const PRELOAD_FILE = "preload.ts"

const SHIM = ".test.ts"

const LOADERS: Readonly<Record<string, Form>> = {
  ".ts": "ts",
  ".tsx": "tsx",
  ".js": "js",
  ".jsx": "jsx",
  ".json": "json",
  ".css": "css",
  ".toml": "toml",
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
  return dirname(importer.startsWith(MARK) ? importer.slice(MARK.length) : importer)
}

export function loaderOf(path: string): Form {
  return LOADERS[extname(path)] ?? TEXT
}

export function bodiesAt(at: string): Bodies {
  return JSON.parse(readFileSync(at, "utf8")) as Bodies
}

export function preloadingOf(at: string): string {
  return (
    `import { bodiesAt, servedBy } from ${JSON.stringify(SERVING)}\n` +
    `Bun.plugin(servedBy(bodiesAt(${JSON.stringify(at)})))\n`
  )
}

export function servingOut(bodies: Bodies, path: string): Served {
  const body = bodies[path] ?? null
  if (body === null) throw new Error(`\`${path}\` is taken away by the change these tests judge`)
  return { contents: body, loader: loaderOf(path) }
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

export function reachedIn(bodies: Bodies): ReadonlyMap<string, string> {
  const held: ReadonlyMap<string, string>[] = []
  for (const [at, body] of Object.entries(bodies)) {
    if (body === null || !at.endsWith(MANIFEST)) continue
    held.push(reachesIn(dirname(at), body))
  }
  return reachingOver(held)
}

export function servingOf(
  from: string,
  paths: readonly string[],
  at: (path: string) => Uint8Array | null,
  named: readonly string[]
): Serving {
  const held = mkdtempSync(join(HOLD, PREFIX))
  try {
    const root = realpathSync(from)
    const bodies: Record<string, string | null> = {}
    for (const one of paths) bodies[join(root, one)] = bodyOf(at, one)
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
    writeFileSync(preload, preloadingOf(filed))
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

export function servedBy(bodies: Bodies): BunPlugin {
  const named = Object.keys(bodies)
  const apart = new Set(named.filter((one) => !existsSync(one)))
  return {
    name: NAME,
    setup: (build): undefined => {
      build.onResolve({ filter: NEAR }, (args) => {
        if (!args.importer.startsWith(MARK)) return undefined
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
