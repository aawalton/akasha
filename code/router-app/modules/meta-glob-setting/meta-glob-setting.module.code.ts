import { existsSync, realpathSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, relative, resolve } from "node:path"

const WILD = /[*?[{]/

const CLIMBS = /^\.\.(\/|$)/

const PARTED_BY = "/"

const HERE = "./"

const PACKAGES = "/node_modules/"

const EAGER_ONLY =
  "bun is handed the bundler's glob eagerly alone, so a glob here states `{ eager: true }` and nothing else"

const NO_CALLER = "the file calling the glob could not be named"

type Globbing = { readonly eager?: boolean }

type Stacked = { stack?: readonly NodeJS.CallSite[] }

function callerOf(called: (...args: never[]) => unknown): string {
  const was = Error.prepareStackTrace
  Error.prepareStackTrace = (_thrown, sites): readonly NodeJS.CallSite[] => sites
  try {
    const held: Stacked = {}
    Error.captureStackTrace(held, called)
    const at = held.stack?.[0]?.getFileName()
    if (at === undefined || at === null) throw new Error(NO_CALLER)
    return at
  } finally {
    Error.prepareStackTrace = was
  }
}

function keyFor(folder: string, full: string): string {
  const said = relative(folder, full)
  return CLIMBS.test(said) ? said : `${HERE}${said}`
}

function matched(folder: string, pattern: string): readonly string[] {
  const parts = pattern.split(PARTED_BY)
  const wild = parts.findIndex((part) => WILD.test(part))
  const cut = wild === -1 ? parts.length - 1 : wild
  const named = resolve(folder, ...parts.slice(0, cut))
  if (!existsSync(named)) return []
  const cwd = realpathSync(named)
  const glob = new Bun.Glob(parts.slice(cut).join(PARTED_BY))
  return [...glob.scanSync({ cwd, absolute: true })].filter((full) => !full.includes(PACKAGES))
}

export function metaGlob(
  patterns: string | readonly string[],
  options: Globbing = {}
): Readonly<Record<string, unknown>> {
  const { eager, ...rest } = options
  if (eager !== true || Object.keys(rest).length > 0) throw new Error(EAGER_ONLY)
  const at = realpathSync(callerOf(metaGlob))
  const folder = dirname(at)
  const load = createRequire(at)
  const found = new Set<string>()
  for (const pattern of typeof patterns === "string" ? [patterns] : patterns) {
    for (const full of matched(folder, pattern)) if (full !== at) found.add(full)
  }
  return Object.fromEntries([...found].sort().map((full) => [keyFor(folder, full), load(full)]))
}

Object.assign(globalThis, { metaGlob })
