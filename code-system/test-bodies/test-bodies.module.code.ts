import { readFileSync } from "node:fs"
import { dirname, extname, resolve } from "node:path"
import type { BunPlugin } from "bun"

export const SERVED = "body"

export const SERVING = import.meta.path

export type Form = "ts" | "tsx" | "js" | "jsx" | "json" | "css" | "toml" | "text"

export type Bodies = Readonly<Record<string, string | null>>

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

export function servedBy(bodies: Bodies): BunPlugin {
  const named = Object.keys(bodies)
  return {
    name: NAME,
    setup: (build): undefined => {
      build.onResolve({ filter: NEAR }, (args) => {
        if (!args.importer.startsWith(MARK)) return undefined
        const from = folderOf(args.importer)
        const at = resolve(from, args.path)
        if (at in bodies) return { path: at, namespace: SERVED }
        return { path: Bun.resolveSync(at, from), namespace: FILE }
      })
      build.onResolve({ filter: endingOf(named) }, (args) => {
        const at = resolve(folderOf(args.importer), args.path)
        return at in bodies ? { path: at, namespace: SERVED } : undefined
      })
      build.onLoad({ filter: wholeOf(named) }, (args) => servingOut(bodies, args.path))
      build.onLoad({ filter: EVERY, namespace: SERVED }, (args) => servingOut(bodies, args.path))
    },
  }
}
