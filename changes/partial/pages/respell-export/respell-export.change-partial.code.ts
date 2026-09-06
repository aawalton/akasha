import {
  boundAs,
  exportsNamed,
  reachedFrom,
  readingOf,
  referencesOf,
  typingOver,
} from "@akasha/code-system/code-typing"

export type Respelled = {
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

type Spot = {
  readonly start: number
  readonly end: number
  readonly put: string
}

function refusing(why: string): Respelled {
  return { bodies: null, refused: why }
}

export function respelled(
  root: string,
  at: string,
  over: readonly string[],
  of: string,
  to: string,
  textOf: (path: string) => string | null
): Respelled {
  const typing = typingOver(root, over, readingOf(root, textOf))
  const declared = new Set(exportsNamed(typing, at, of))
  if (declared.size === 0) return refusing(`\`${at}\` exports no \`${of}\``)
  const held = new Map<string, Spot[]>()
  const seen = new Set<string>()
  for (const found of referencesOf(typing, root, declared)) {
    const spot = `${found.path}:${found.start}`
    if (seen.has(spot)) continue
    seen.add(spot)
    const spots = held.get(found.path) ?? []
    spots.push({ start: found.start, end: found.end, put: boundAs(found, of, to) })
    held.set(found.path, spots)
  }
  if (held.size === 0) return refusing(`nothing names \`${of}\`, so there is nothing to spell`)
  for (const path of held.keys()) {
    const source = typing.sourceAt(path)
    if (source === null) return refusing(`\`${path}\` would change and could not be read`)
    if (reachedFrom(typing, source, to).length > 0) {
      return refusing(`\`${path}\` already reaches a \`${to}\``)
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
