import {
  besideAt,
  FIRST_PART,
  uncommittedBesideAt,
} from "akasha/pages/file-name/page-file-name.module.code.ts"

function sectionFor(propertySlug: string, part: number): string {
  return part <= FIRST_PART ? propertySlug : `${propertySlug}.part${part}`
}

export function partAt(
  path: string,
  propertySlug: string,
  held: string,
  part: number
): string | null {
  return besideAt(path, sectionFor(propertySlug, part), held)
}

export function uncommittedPartAt(
  path: string,
  propertySlug: string,
  held: string,
  part: number
): string | null {
  return uncommittedBesideAt(path, sectionFor(propertySlug, part), held)
}

function walking(
  naming: (part: number) => string | null,
  existing: (at: string) => boolean
): readonly string[] {
  const found: string[] = []
  for (let part = FIRST_PART; ; part += 1) {
    const at = naming(part)
    if (at === null) break
    if (part > FIRST_PART && !existing(at)) break
    found.push(at)
  }
  return found
}

export function partsOf(
  path: string,
  propertySlug: string,
  held: string,
  existing: (at: string) => boolean
): readonly string[] {
  return walking((part) => partAt(path, propertySlug, held, part), existing)
}

export function* partsReading(
  path: string,
  propertySlug: string,
  held: string,
  reading: (at: string) => string | null
): Generator<readonly [string, string]> {
  for (let part = FIRST_PART; ; part += 1) {
    const at = partAt(path, propertySlug, held, part)
    if (at === null) return
    const text = reading(at)
    if (text === null) {
      if (part > FIRST_PART) return
      continue
    }
    yield [at, text]
  }
}

export function uncommittedPartsOf(
  path: string,
  propertySlug: string,
  held: string,
  existing: (at: string) => boolean
): readonly string[] {
  return walking((part) => uncommittedPartAt(path, propertySlug, held, part), existing)
}
