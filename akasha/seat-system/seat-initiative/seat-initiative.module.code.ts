import { existsSync } from "node:fs"
import { initiativesDrawn } from "@akasha/editor-extension/work-initiatives"
import { addressParts } from "@akasha/markdown-pages/page-address"
import { AKASHA } from "@akasha/pages-system/checkout-roots"
import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"

const KEY = "initiative"

// The assignment, under the key the old readers ask it by.
const ASSIGNMENT_KEY = "domain-slug"

export const INITIATIVE_SLUG_KEY = "initiative-slug"

export interface InitiativeRecord {
  readonly value: string
}

export interface InitiativePlace {
  readonly relPath: string
  readonly pageTypeSlug: string
}

// An initiative is a page standing in akasha, found through the index rather than by walking, and a
// slug is unique among the pages of its page type. So a slug reaches one initiative or none, and
// there is no spelling to take apart and no ambiguity to refuse.

export function initiativesIn(root: string): ReadonlyMap<string, string> {
  return new Map(initiativesDrawn(root).map((one) => [one.slug, one.path]))
}

export function initiativeStemOf(bare: string, root: string): string | null {
  return initiativesIn(root).has(bare) ? bare : null
}

export function initiativePlaceOf(bare: string, root: string): InitiativePlace | null {
  const at = initiativesIn(root).get(bare)
  if (at === undefined || !existsSync(`${root}/${at}`)) return null
  return { relPath: at, pageTypeSlug: KEY }
}

// A seat's initiative is the assignment it states, under the page type that initiative stands as.
// An assignment naming another type is no initiative, and a bare slug names a domain. The old
// `initiative-slug` stood beside the assignment saying the same thing, and no seat ever stated it,
// so the sweep that read it swept nothing.
export function initiativeOf(agent: string): InitiativeRecord | null {
  const stated = pageTextOf(agent, ASSIGNMENT_KEY)
  if (stated === null) return null
  const parts = addressParts(stated)
  return parts === null || parts.type !== KEY ? null : { value: parts.slug }
}

function placeOf(found: ReadonlyMap<string, string>): string {
  const [first] = found.values()
  const cut = first === undefined ? -1 : first.lastIndexOf("/")
  return first === undefined || cut === -1 ? AKASHA : first.slice(0, cut)
}

export function refuseInitiative(slug: string, root: string): readonly string[] {
  const found = initiativesIn(root)
  if (found.has(slug)) return []
  const known = [...found.keys()]
  return [
    `initiative: nothing under ${placeOf(found)}/ is named \`${slug}\`, so the seat would name no ` +
      `initiative at all. There: ${known.length === 0 ? "nothing yet" : known.sort().join(", ")}`,
  ]
}

export function initiativeLine(record: InitiativeRecord | null): string {
  return `  ${KEY.padEnd(8)} ${record === null ? "— none stated" : record.value}`
}
