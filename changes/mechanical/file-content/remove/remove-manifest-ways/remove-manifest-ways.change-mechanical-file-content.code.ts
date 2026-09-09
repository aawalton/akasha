import { dirname } from "node:path"
import ts from "typescript"
import {
  refusing,
  splicing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  entriesGoingIn,
  keysGoingIn,
  objectAt,
  textAt,
} from "../../../../modules/json-entries/json-entries.module.code.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const EXPORTS = "exports"

const HERE = "."

const PARTED_BY = "/"

const OPENING = "./"

export type Asked = {
  readonly at: string
  readonly going: readonly string[]
}

function readsAsObject(text: string): boolean {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return false
  }
  return read !== null && typeof read === "object" && !Array.isArray(read)
}

export function landsOn(at: string, value: string): string {
  const folder = dirname(at)
  const said = value.startsWith(OPENING) ? value.slice(OPENING.length) : value
  return folder === HERE ? said : `${folder}${PARTED_BY}${said}`
}

export function waysGoneIn(
  at: string,
  text: string,
  going: ReadonlySet<string>
): readonly string[] {
  const held = objectAt(ts.parseJsonText(at, text), EXPORTS)
  if (held === null) return []
  const found: string[] = []
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    const value = one.initializer
    if (!ts.isStringLiteral(value)) continue
    if (going.has(landsOn(at, value.text))) found.push(one.name.text)
  }
  return found
}

export function waysGoingIn(
  at: string,
  text: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  return entriesGoingIn(at, text, EXPORTS, dropping)
}

export function loneWayGone(at: string, text: string, going: ReadonlySet<string>): boolean {
  const said = textAt(ts.parseJsonText(at, text), EXPORTS)
  return said !== null && going.has(landsOn(at, said))
}

export function removeManifestWays(given: Asked, textOf: (path: string) => string | null): Said {
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no way in is dropped`)
  if (!readsAsObject(text)) {
    return refusing(`\`${given.at}\` reads as no JSON object, so no way in is dropped`)
  }
  const going = new Set(given.going)
  if (loneWayGone(given.at, text, going)) {
    return stating(splicing(given.at, text, keysGoingIn(given.at, text, new Set([EXPORTS]))))
  }
  const ways = waysGoneIn(given.at, text, going)
  if (ways.length === 0) return stating([])
  return stating(splicing(given.at, text, waysGoingIn(given.at, text, new Set(ways))))
}

export function runChange(world: World, given: Asked): Said {
  return removeManifestWays(given, world.textOf)
}
