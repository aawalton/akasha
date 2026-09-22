import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  type Body,
  filesBy,
  type Selector,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  extensionsFor,
  heldNamed,
} from "akasha/page/index/modules/extension-carrying/extension-carrying.module.code.ts"
import {
  type Carried,
  foldersFor,
  heldBeside,
  heldUnder,
  namingFor,
  sectionHeld,
  slugsWhere,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const NUL = 0

const NEWLINE = 0x0a

const HOLDS = "holdsBytes"

const BYTES = new WeakMap<Paged, ReadonlySet<string>>()

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

export function reasonsFor(bytes: Uint8Array): readonly string[] {
  const found = sitesIn(bytes)
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
  return reasonsFor(given.bytes)
}

export function holdingBytes(value: Value): boolean {
  return value[HOLDS] === true
}

function bytesHeld(paged: Paged): ReadonlySet<string> {
  const found = BYTES.get(paged)
  if (found !== undefined) return found
  const made = slugsWhere(paged.index, holdingBytes, (named) => paged.index.typesCarrying(named))
  BYTES.set(paged, made)
  return made
}

export function exemptIn(path: string, paged: Paged): boolean {
  if (sectionHeld(path, bytesHeld(paged))) return true
  const carrying = (named: string): Carried => paged.index.carryingOf(named)
  if (heldBeside(path, namingFor(paged.index), holdingBytes, carrying)) return true
  if (heldUnder(path, foldersFor(paged.index), holdingBytes, carrying)) return true
  return heldNamed(path, extensionsFor(paged.index), holdingBytes, carrying)
}

export const UNEXEMPT: Selector<Body> = filesBy(
  "files no property declares as bytes",
  (path, shadow) => !exemptIn(path, shadow)
)
