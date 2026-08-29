import { dirname, join, relative } from "node:path"
import { placedIn, spelledIn } from "../../../../code-system/code-specifier.module.code.ts"

const RELATIVE = /^\.\.?\//

function landedAt(path: string, specifier: string): string | null {
  if (!RELATIVE.test(specifier)) return null
  return join(dirname(path), specifier)
}

function specifierFor(dir: string, target: string): string {
  const said = relative(dir, target)
  return said.startsWith(".") ? said : `./${said}`
}

function nextFor(
  was: string,
  dir: string,
  said: string,
  moved: ReadonlyMap<string, string>,
  specifier: boolean
): string | null {
  const rooted = moved.get(said)
  if (rooted !== undefined) return rooted
  const landed = landedAt(was, said)
  if (landed === null) return null
  const there = moved.get(landed)
  if (there !== undefined) return specifierFor(dir, there)
  return specifier ? specifierFor(dir, landed) : null
}

export function repointed(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  const dir = dirname(now)
  const specifier = new Set(placedIn(now, text).map((one) => one.start))
  let out = ""
  let at = 0
  for (const one of spelledIn(now, text)) {
    const next = nextFor(was, dir, one.text, moved, specifier.has(one.start))
    if (next === null || next === one.text) continue
    out = `${out}${text.slice(at, one.start)}${JSON.stringify(next)}`
    at = one.end
  }
  return `${out}${text.slice(at)}`
}
