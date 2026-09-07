import { sectionHeld, slugsWhere } from "@akasha/indexes/property-carrying"
import type { Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"

const NUL = 0

const NEWLINE = 0x0a

const HOLDS = "holdsBytes"

const BYTES = new WeakMap<Shadow, ReadonlySet<string>>()

type Site = {
  readonly line: number
  readonly column: number
}

export function sitesIn(bytes: Uint8Array): readonly Site[] {
  const found: Site[] = []
  let line = 1
  let start = 0
  for (let at = 0; at < bytes.length; at += 1) {
    if (bytes[at] === NEWLINE) {
      line += 1
      start = at + 1
      continue
    }
    if (bytes[at] === NUL) found.push({ line, column: at - start + 1 })
  }
  return found
}

function reasonFor(found: readonly Site[]): readonly string[] {
  const one = found[0]
  if (one === undefined) return []
  const where = `line ${one.line} column ${one.column}`
  if (found.length === 1) {
    return [`${where} is a raw NUL byte, which hides the whole file from a search`]
  }
  return [
    `${where} is the first of ${found.length} raw NUL bytes, which hide the whole file from a search`,
  ]
}

export function reasonsIn(given: Body): readonly string[] {
  return reasonFor(sitesIn(given.bytes))
}

export function holdingBytes(value: Value): boolean {
  return value[HOLDS] === true
}

function bytesHeld(shadow: Shadow): ReadonlySet<string> {
  const found = BYTES.get(shadow)
  if (found !== undefined) return found
  const made = slugsWhere(
    {
      kindsUnder: (of) => shadow.index.kindsUnder(of),
      everyOfType: (kind) => shadow.index.everyOfType(kind),
      valueAt: (path) => shadow.pageOf(path),
    },
    holdingBytes
  )
  BYTES.set(shadow, made)
  return made
}

export function exemptIn(path: string, shadow: Shadow): boolean {
  return sectionHeld(path, bytesHeld(shadow))
}

export const noRawNulBytes = judgingEach(FILES, (given, shadow) =>
  exemptIn(given.path, shadow) ? [] : reasonsIn(given)
)
