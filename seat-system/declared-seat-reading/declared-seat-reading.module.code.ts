import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  type Documents,
  declaredPathReading,
} from "../../domain-system/domain-documents/domain-documents.module.code.ts"
import { personaAt } from "../../persona-system/persona-reading/persona-reading.module.code.ts"
import { FLEET } from "../compose-seat-name/compose-seat-name.module.code.ts"
import type { SeatDocument } from "../seat-attribute/seat-attribute.module.code.ts"
import {
  ATTRIBUTES,
  type Attributes,
  type Claimant,
  type Mode,
} from "../seat-attributes/seat-attributes.module.code.ts"
import { initiativePlaceOf } from "../seat-initiative/seat-initiative.module.code.ts"

export interface Warranted {
  readonly claimant: Claimant
  readonly slug: string
  readonly documents: readonly SeatDocument[] | null
}

function withAncestry(relPath: string, root: string, docs: Documents): readonly SeatDocument[] {
  return declaredPathReading(relPath, docs).map((at) => ({ root, relPath: at }))
}

export function personaWarrant(
  slug: string,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  const held = personaAt(root, slug)
  return held === null ? null : withAncestry(held.path, root, docs)
}

export function domainWarrant(
  slug: string,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  const at = docs.domainAt(slug)
  return at === null ? null : withAncestry(at, root, docs)
}

export function initiativeWarrant(
  slug: string,
  roots: Roots,
  docs: Documents
): readonly SeatDocument[] | null {
  const root = rootFor(roots, AKASHA)
  const place = initiativePlaceOf(slug, root)
  if (place === null) return null
  const held: SeatDocument[] = [{ root, relPath: place.relPath }]
  const type = docs.domainAt(place.pageTypeSlug)
  if (type === null) return held
  return [...held, ...withAncestry(type, root, docs)]
}

export function onCallWarrant(root: string, docs: Documents): readonly SeatDocument[] | null {
  const at = docs.domainAt("seat-assignment-on-call")
  return at === null ? null : withAncestry(at, root, docs)
}

export function principalWarrant(
  principal: string,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  if (principal === FLEET) return []
  const at = docs.domainAt(principal)
  return at === null ? null : withAncestry(at, root, docs)
}

export function modeWarrant(
  mode: Mode,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  const at = docs.domainAt(`seat-mode-${mode}`)
  return at === null ? null : withAncestry(at, root, docs)
}

export function distinct(
  documents: readonly SeatDocument[] | null
): readonly SeatDocument[] | null {
  if (documents === null) return null
  const whole = new Map<string, SeatDocument>()
  for (const one of documents) whole.set(`${one.root}/${one.relPath}`, one)
  return [...whole.values()]
}

export interface SeatStated {
  readonly attributes: Attributes
  readonly initiative: string | null
  readonly mode: Mode | null
  readonly onCall: boolean
  readonly principal: string | null
}

export function declaredSeatReading(
  stated: SeatStated,
  roots: Roots,
  docs: Documents
): readonly Warranted[] {
  const root = rootFor(roots, AKASHA)
  const out: Warranted[] = []
  for (const slot of ATTRIBUTES) {
    if (slot === "role") continue
    const one = stated.attributes[slot]
    if (one === undefined) continue
    const found =
      slot === "persona"
        ? personaWarrant(one.slug, root, docs)
        : domainWarrant(one.slug, root, docs)
    out.push({ claimant: slot, slug: one.slug, documents: distinct(found) })
  }
  if (stated.initiative !== null) {
    const found = initiativeWarrant(stated.initiative, roots, docs)
    out.push({ claimant: "initiative", slug: stated.initiative, documents: distinct(found) })
  }
  if (stated.onCall) {
    const found = onCallWarrant(root, docs)
    out.push({ claimant: "on-call", slug: "on-call", documents: distinct(found) })
  }
  if (stated.principal !== null) {
    const found = principalWarrant(stated.principal, root, docs)
    out.push({ claimant: "principal", slug: stated.principal, documents: distinct(found) })
  }
  if (stated.mode !== null) {
    const found = modeWarrant(stated.mode, root, docs)
    out.push({ claimant: "mode", slug: stated.mode, documents: distinct(found) })
  }
  return out
}
