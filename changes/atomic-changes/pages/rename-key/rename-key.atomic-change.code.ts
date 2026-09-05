import {
  declarationsNamed,
  declaredNamed,
  exportsNamed,
  namingOf,
  readingOf,
  spelledAs,
  type Typing,
  typed,
  typingOver,
} from "@akasha/code-system/code-typing"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

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

function whyNot(given: Asked): string | null {
  if (!typed(given.at)) return `\`${given.at}\` names no TypeScript body`
  if (!NAMED.test(given.of)) return `\`${given.of}\` is no key a type declares`
  if (!NAMED.test(given.to)) return `\`${given.to}\` is no key a type declares`
  if (given.of === given.to) return `\`${given.to}\` is the key it already carries`
  return null
}

function alsoANameIn(typing: Typing, path: string, key: string): boolean {
  if (exportsNamed(typing, path, key).length > 0) return true
  return declaredNamed(typing, path, key).length > 0
}

export function renameKey(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  const why = whyNot(given)
  if (why !== null) return refusing(why)
  const reading = importingOf(root, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const typing = typingOver(root, [given.at, ...reading.importers], readingOf(root, textOf))
  const declared = new Set(declarationsNamed(typing, given.at, given.of))
  if (declared.size === 0) return refusing(`\`${given.at}\` declares no \`${given.of}\` key`)
  if (alsoANameIn(typing, given.at, given.of)) {
    return refusing(`\`${given.at}\` carries \`${given.of}\` as a name as well as a key`)
  }
  const held = new Map<string, Spot[]>()
  const seen = new Set<string>()
  for (const found of namingOf(typing, root, declared)) {
    const spot = `${found.path}:${found.start}`
    if (seen.has(spot)) continue
    seen.add(spot)
    const at = held.get(found.path) ?? []
    at.push({ start: found.start, end: found.end, put: spelledAs(found, given.of, given.to) })
    held.set(found.path, at)
  }
  if (held.size === 0) {
    return refusing(`nothing spells \`${given.of}\`, so there is nothing to respell`)
  }
  for (const path of held.keys()) {
    if (declarationsNamed(typing, path, given.to).length > 0) {
      return refusing(`\`${path}\` already declares a \`${given.to}\` key`)
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
