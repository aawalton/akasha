import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { canonicalize } from "../file/path.ts"
import { pageNameOf } from "../page/page-name.ts"
import type { Roots } from "./node-shape.ts"

export const AKASHA = "akasha"

export const INSTRUCTIONS = "instructions"

export const HERE = resolve(import.meta.dir, "..")

const REPO_PAGES = "pages/repo"

const REPO_ENDING = "-repo"

export function rootEnvName(repo: string): string {
  return `${repo.replaceAll("-", "_").toUpperCase()}_ROOT`
}

const SIBLING = process.env[rootEnvName(INSTRUCTIONS)] ?? resolve(HERE, "..", INSTRUCTIONS)

function namedIn(instructions: string): readonly string[] {
  const at = `${instructions}/${REPO_PAGES}`
  const found = new Set<string>()
  for (const one of readdirSync(at)) {
    const named = pageNameOf(one)
    if (named === null) continue
    if (!named.stem.endsWith(REPO_ENDING)) continue
    found.add(named.stem.slice(0, -REPO_ENDING.length))
  }
  if (found.size === 0) {
    throw new Error(
      `${at} holds no \`*${REPO_ENDING}\` page, so nothing says which repositories there are`
    )
  }
  return [...found].sort()
}

function rootOf(repo: string): string {
  const stated = process.env[rootEnvName(repo)]
  if (stated !== undefined) return resolve(stated)
  if (repo === INSTRUCTIONS) return SIBLING
  if (repo === AKASHA) return HERE
  return resolve(SIBLING, "..", repo)
}

function clonedHere(): Roots {
  const at: Record<string, string> = {}
  for (const repo of namedIn(SIBLING)) {
    const root = rootOf(repo)
    if (existsSync(`${root}/.git`)) at[repo] = root
  }
  return at
}

let held: Roots | null = null

export function rootsHere(): Roots {
  if (held === null) held = clonedHere()
  return held
}

export interface Touched {
  readonly repo: string
  readonly relPath: string
}

export function locate(absolute: string): Touched | null {
  const at = canonicalize(absolute)
  for (const [repo, root] of Object.entries(rootsHere())) {
    const real = canonicalize(root)
    if (at === real) return { repo, relPath: "" }
    if (at.startsWith(`${real}/`)) return { repo, relPath: at.slice(real.length + 1) }
  }
  return null
}
