import type { Dirent } from "node:fs"
import { existsSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { listedAt } from "@akasha/indexes"

const HOOK = "agent-hook"

const ENDING = ".ts"

const CODE = ".code.ts"

const AKASHA = "akasha"

const PASSED: readonly string[] = ["node_modules", ".git"]

export type Reached = { readonly at: string } | { readonly unreached: string }

export function namedFor(name: string): string {
  return `${name}.${HOOK}${CODE}`
}

export function codeOf(pagePath: string): string | null {
  if (!pagePath.endsWith(ENDING) || pagePath.endsWith(CODE)) return null
  return `${pagePath.slice(0, -ENDING.length)}${CODE}`
}

export function indexedIn(root: string, name: string): string | null {
  let found: readonly { readonly path: string }[]
  try {
    found = listedAt(root, HOOK, name)
  } catch {
    return null
  }
  const one = found[0]
  if (found.length !== 1 || one === undefined) return null
  const code = codeOf(one.path)
  return code !== null && existsSync(join(root, code)) ? code : null
}

function readable(at: string): readonly Dirent[] {
  try {
    return readdirSync(at, { withFileTypes: true })
  } catch {
    return []
  }
}

function foundUnder(at: string, wanted: string, into: string[]): undefined {
  for (const one of readable(at)) {
    if (PASSED.includes(one.name)) continue
    const here = join(at, one.name)
    if (one.isDirectory()) foundUnder(here, wanted, into)
    else if (one.name === wanted) into.push(here)
  }
}

export function searchedIn(root: string, name: string): readonly string[] {
  const found: string[] = []
  foundUnder(join(root, AKASHA), namedFor(name), found)
  return found.map((one) => relative(root, one)).sort()
}

export function reachedIn(root: string, name: string): Reached {
  const indexed = indexedIn(root, name)
  if (indexed !== null) return { at: indexed }
  const found = searchedIn(root, name)
  const one = found[0]
  if (found.length === 1 && one !== undefined) return { at: one }
  if (found.length === 0) {
    return {
      unreached:
        `the index names no \`${HOOK}\` page carrying the slug \`${name}\`, and no file called ` +
        `\`${namedFor(name)}\` is anywhere under \`${AKASHA}/\` either`,
    }
  }
  return {
    unreached:
      `${found.length} files are called \`${namedFor(name)}\`, so which one \`${name}\` names ` +
      `could not be answered — ${found.join(", ")}`,
  }
}
