import {
  answered,
  heldEach,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  fileNameOf,
  IMPORT,
  ownerOf,
  type Reference,
  referencesAt,
  referencesEach,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"

const ROOT = ""

const BLANK = ""

const BREAK = "\n"

export type Named = {
  readonly path: string
  readonly propertySlug: string
}

const beside = heldEach((reading: Reading, pagePath: string): readonly Reference[] => {
  const at = referencesAt(pagePath)
  if (at === null) return []
  const body = reading.read(at)
  if (body === null) return []
  return referencesEach(body.split(BREAK).filter((one) => one !== BLANK))
})

export function referencesFor(given: string | Reading, pagePath: string): readonly Reference[] {
  return beside(given, pagePath)
}

export function referencesOf(given: string | Reading, id: string): readonly Reference[] {
  return answered(given, ROOT, `what references \`${id}\``, (reading) => {
    const listed = listedById(reading, id)
    return listed === null ? [] : referencesFor(reading, listed.path)
  })
}

export function namersOf(given: string | Reading, id: string): readonly Named[] {
  const found: Named[] = []
  for (const one of referencesOf(given, id)) {
    if (one.propertySlug === IMPORT) continue
    found.push({ path: one.path, propertySlug: one.propertySlug })
  }
  return found
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

export function importersOf(given: string | Reading, path: string): readonly string[] {
  return answered(given, ROOT, `which files import \`${path}\``, (reading) => {
    const owner = ownerOf(path)
    if (owner === null) return []
    const name = fileNameOf(path)
    const found: string[] = []
    for (const one of referencesFor(reading, owner)) {
      if (one.propertySlug === IMPORT && one.fileName === name) found.push(one.path)
    }
    return found.sort()
  })
}
