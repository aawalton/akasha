import {
  besideAt,
  FIRST_PART,
  uncommittedBesideAt,
} from "../file-name/page-file-name.module.code.ts"

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

export function partsOf(
  path: string,
  propertySlug: string,
  held: string,
  standing: (at: string) => boolean
): readonly string[] {
  const found: string[] = []
  for (let part = FIRST_PART; ; part += 1) {
    const at = partAt(path, propertySlug, held, part)
    if (at === null) break
    if (part > FIRST_PART && !standing(at)) break
    found.push(at)
  }
  return found
}
