import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { isAbsolute, join, resolve } from "node:path"
import { whyOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"

export type Shape = "token" | "prose" | "switch"

export const STDIN = "-"

const ROUTE = "-file"

const HOME = "~/"

export function textIn(path: string): { readonly text: string } | { readonly why: string } {
  try {
    return { text: path === STDIN ? readFileSync(0, "utf8") : readFileSync(path, "utf8") }
  } catch (thrown) {
    return { why: whyOf(thrown) }
  }
}

export function wholeIn(raw: string): number | null {
  const said = raw.trim()
  if (!/^\d+$/.test(said)) return null
  const held = Number.parseInt(said, 10)
  return Number.isSafeInteger(held) ? held : null
}

export function numberIn(said: ReadonlyMap<string, string>, flag: string): number | undefined {
  const raw = said.get(flag)
  return raw === undefined ? undefined : (wholeIn(raw) ?? undefined)
}

export function routedIn(said: string, shapes: ReadonlyMap<string, Shape>): string | null {
  if (!said.endsWith(ROUTE)) return null
  const named = said.slice(0, -ROUTE.length)
  return shapes.get(named) === "prose" ? named : null
}

export function pathUnder(root: string, path: string): string {
  if (path.startsWith(HOME)) return join(homedir(), path.slice(HOME.length))
  return isAbsolute(path) ? path : resolve(root, path)
}

export function heldOnce(
  said: Map<string, string>,
  refusals: string[],
  flag: string,
  value: string
): undefined {
  if (said.has(flag)) {
    refusals.push(`\`${flag}\` is said more than once, and it carries one value`)
    return undefined
  }
  said.set(flag, value)
  return undefined
}
