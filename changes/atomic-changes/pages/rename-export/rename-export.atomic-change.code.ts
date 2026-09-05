import {
  boundAs,
  exportsNamed,
  reachedFrom,
  readingOf,
  referencesOf,
  typed,
  typingOver,
} from "@akasha/code-system/code-typing"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const BESIDE = [".code.ts", ".code.tsx", ".test.ts", ".test.tsx", ".test-fixtures.ts"]

export type Asked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

export type Renamed = {
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

type Spot = {
  readonly start: number
  readonly end: number
  readonly put: string
}

function refusing(why: string): Renamed {
  return { bodies: null, refused: why }
}

function besideAPage(at: string): boolean {
  return BESIDE.some((one) => at.endsWith(one))
}

function whyNot(given: Asked): string | null {
  if (!typed(given.at)) return `\`${given.at}\` names no TypeScript body`
  if (!besideAPage(given.at)) return `\`${given.at}\` is a page, and a page's export is its slug`
  if (!NAMED.test(given.of)) return `\`${given.of}\` is no name a body carries`
  if (!NAMED.test(given.to)) return `\`${given.to}\` is no name a body carries`
  if (given.of === given.to) return `\`${given.to}\` is the name it already carries`
  return null
}

export function renameExport(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  const why = whyNot(given)
  if (why !== null) return refusing(why)
  const reading = importingOf(root, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const over = [given.at, ...reading.importers]
  const typing = typingOver(root, over, readingOf(root, textOf))
  const declared = new Set(exportsNamed(typing, given.at, given.of))
  if (declared.size === 0) return refusing(`\`${given.at}\` exports no \`${given.of}\``)
  const held = new Map<string, Spot[]>()
  const seen = new Set<string>()
  for (const found of referencesOf(typing, root, declared)) {
    const spot = `${found.path}:${found.start}`
    if (seen.has(spot)) continue
    seen.add(spot)
    const at = held.get(found.path) ?? []
    at.push({ start: found.start, end: found.end, put: boundAs(found, given.of, given.to) })
    held.set(found.path, at)
  }
  if (held.size === 0)
    return refusing(`nothing names \`${given.of}\`, so there is nothing to spell`)
  for (const path of held.keys()) {
    const source = typing.sourceAt(path)
    if (source === null) return refusing(`\`${path}\` would change and could not be read`)
    if (reachedFrom(typing, source, given.to).length > 0) {
      return refusing(`\`${path}\` already reaches a \`${given.to}\``)
    }
  }
  const bodies = new Map<string, string>()
  for (const [path, spots] of held) {
    const text = textOf(path)
    if (text === null) return refusing(`\`${path}\` would change and could not be read`)
    let body = text
    for (const one of [...spots].sort((here, there) => there.start - here.start)) {
      body = body.slice(0, one.start) + one.put + body.slice(one.end)
    }
    bodies.set(path, body)
  }
  return { bodies, refused: null }
}
