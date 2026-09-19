import { claimantIn } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  heldEach,
  listedById,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  fileNameOf,
  IMPORT,
  type Reference,
  referencesAt,
  referencesEach,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"

export type Named = {
  readonly path: string
  readonly propertySlug: string
}

const BLANK = ""

const BREAK = "\n"

const beside = heldEach((reading: Reading, pagePath: string): readonly Reference[] => {
  const at = referencesAt(pagePath)
  if (at === null) return []
  const body = reading.read(at)
  if (body === null) return []
  return referencesEach(body.split(BREAK).filter((one) => one !== BLANK))
})

function referencesFor(given: string | Reading, pagePath: string): readonly Reference[] {
  return beside(given, pagePath)
}

function referencesOf(given: string | Reading, id: string): readonly Reference[] {
  const reading = readingIn(given)
  const listed = listedById(reading, id)
  return listed === null ? [] : referencesFor(reading, listed.path)
}

export function idsNaming(
  given: string | Reading,
  id: string,
  propertySlug: string
): readonly string[] {
  const found: string[] = []
  for (const one of referencesOf(given, id)) {
    if (one.propertySlug === propertySlug && one.id !== null) found.push(one.id)
  }
  return found.sort()
}

export function namersAt(given: string | Reading, pagePath: string): readonly Named[] {
  const found: Named[] = []
  for (const one of referencesFor(given, pagePath)) {
    if (one.propertySlug === IMPORT) continue
    found.push({ path: one.path, propertySlug: one.propertySlug })
  }
  return found
}

export function namersOf(given: string | Reading, id: string): readonly Named[] {
  const listed = listedById(readingIn(given), id)
  return listed === null ? [] : namersAt(given, listed.path)
}

export function importersOf(given: string | Reading, path: string): readonly string[] {
  const reading = readingIn(given)
  const owner = claimantIn(reading, path)
  if (owner === null) return []
  const name = fileNameOf(path)
  const found: string[] = []
  for (const one of referencesFor(reading, owner)) {
    if (one.propertySlug === IMPORT && one.fileName === name) found.push(one.path)
  }
  return found.sort()
}
