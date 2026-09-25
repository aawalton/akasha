import {
  reachedIn,
  readingIn,
  skippedFor,
} from "akasha/change/modules/ambient-reaching/ambient-reaching.module.code.ts"
import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  splicedTo,
  splicing,
  stating,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const IMPORTS = "imports"

const PARTED = " "

const LINE = "\n"

const OPENING = /^\n+/

const GAPPED = /\n{3,}/g

const GAP = "\n\n"

export type Listed = ReadonlyMap<string, readonly string[]>

export function listedIn(said: string): Listed | { readonly refused: string } {
  const found = new Map<string, string[]>()
  for (const line of said.split(LINE)) {
    const one = line.trim()
    if (one === "") continue
    const parts = one.split(PARTED)
    const path = parts[0]
    const specifier = parts[1]
    if (parts.length !== 2 || path === undefined || specifier === undefined) {
      return { refused: `\`${one}\` is no path and specifier parted by one space` }
    }
    const held = found.get(path)
    if (held === undefined) found.set(path, [specifier])
    else held.push(specifier)
  }
  return found
}

function lineOf(specifier: string): string {
  return `import ${JSON.stringify(specifier)}`
}

export function dropDeclarationImports(world: World, listed: Listed): Answer {
  const reading = readingIn(world)
  const reaching = new Map<string, readonly string[]>()
  const edits: FileChange[] = []
  for (const [path, specifiers] of [...listed].sort(([one], [two]) => one.localeCompare(two))) {
    const text = world.textOf(path)
    if (text === null) return refusing(`\`${path}\` holds no body, so no import is dropped`)
    const lines = text.split(LINE)
    const skipped = skippedFor(reading, path)
    const reached = new Set(reachedIn(world, reading.declaring, path, text, reaching, skipped))
    for (const one of specifiers) {
      if (!lines.includes(lineOf(one))) {
        return refusing(`\`${path}\` carries no \`${lineOf(one)}\`, so nothing is dropped`)
      }
      if (reached.has(one)) {
        return refusing(`\`${path}\` names what \`${one}\` declares, so that import stays`)
      }
    }
    const dropped = new Set(specifiers.map(lineOf))
    const now = lines
      .filter((one) => !dropped.has(one))
      .join(LINE)
      .replace(OPENING, "")
      .replace(GAPPED, GAP)
    edits.push(...splicing(path, text, [splicedTo(text, now)]))
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [IMPORTS]

export function runChange(world: World, given: Asked): Answer {
  for (const key of Object.keys(given)) {
    if (key !== IMPORTS) return refusing(untaken(key, takes))
  }
  const said = given[IMPORTS]
  if (said === undefined) return refusing(missing(IMPORTS))
  const listed = listedIn(said)
  if ("refused" in listed) return refusing(listed.refused)
  return dropDeclarationImports(world, listed)
}
