import { spawnSync } from "node:child_process"
import { readdirSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import type { At } from "../../checking.module.code.ts"

const TS = ".ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const COMPILER = "typescript/bin/tsc"

const PASSED = new Set(["node_modules", "dist", "build"])

export const SETTINGS: readonly string[] = [
  "--noEmit",
  "--strict",
  "--noUncheckedIndexedAccess",
  "--allowImportingTsExtensions",
  "--module",
  "preserve",
  "--moduleResolution",
  "bundler",
  "--target",
  "esnext",
  "--skipLibCheck",
  "--pretty",
  "false",
]

const SAID = /^(\S.*)\((\d+),(\d+)\): (?:error|warning) (TS\d+): (.*)$/

type Found = {
  readonly path: string
  reason: string
}

const reach_ = createRequire(import.meta.url)

const ran_ = new Map<string, ReadonlyMap<string, readonly string[]>>()

function walked(root: string, at: string, found: string[]): void {
  for (const entry of readdirSync(join(root, at), { withFileTypes: true })) {
    if (entry.name.startsWith(".") || PASSED.has(entry.name)) continue
    const path = `${at}/${entry.name}`
    if (entry.isDirectory()) walked(root, path, found)
    else if (entry.name.endsWith(TS)) found.push(path)
  }
}

export function everyIn(root: string): readonly string[] {
  const found: string[] = []
  walked(root, AKASHA, found)
  return found.sort()
}

function outputOf(root: string, every: readonly string[]): string {
  const ran = spawnSync(process.execPath, [reach_.resolve(COMPILER), ...SETTINGS, ...every], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  if (ran.error !== undefined) {
    throw new Error(`the compiler could not be run — ${ran.error.message}`)
  }
  if (ran.status === null) {
    throw new Error("the compiler was stopped before it answered")
  }
  return `${ran.stdout}${ran.stderr}`
}

export function foundIn(output: string): readonly Found[] {
  const found: Found[] = []
  for (const line of output.split("\n")) {
    if (line.trim() === "") continue
    const matched = SAID.exec(line)
    if (matched !== null) {
      const [, path = "", at = "", , code = "", why = ""] = matched
      found.push({ path, reason: `line ${at}: ${code}: ${why}` })
      continue
    }
    const held = found[found.length - 1]
    if (line.startsWith(" ") && held !== undefined) {
      held.reason = `${held.reason} ${line.trim()}`
      continue
    }
    throw new Error(
      `the compiler said \`${line.trim()}\`, which names no file it could be kept against`
    )
  }
  return found
}

function ranOver(root: string): ReadonlyMap<string, readonly string[]> {
  const held = ran_.get(root)
  if (held !== undefined) return held
  const every = everyIn(root)
  const found = every.length === 0 ? [] : foundIn(outputOf(root, every))
  const said = new Map<string, readonly string[]>()
  for (const one of found) said.set(one.path, [...(said.get(one.path) ?? []), one.reason])
  ran_.set(root, said)
  return said
}

export function typecheck(given: At): readonly string[] {
  if (!given.path.endsWith(TS)) return []
  if (!given.path.startsWith(INSIDE)) return []
  const said = ranOver(given.root)
  const elsewhere: string[] = []
  for (const [path, every] of said) {
    if (path === given.path) continue
    for (const one of every) {
      elsewhere.push(
        `\`${path}\` ${one} — the akasha folder does not compile as this change leaves it`
      )
    }
  }
  return [...(said.get(given.path) ?? []), ...elsewhere.sort()]
}
