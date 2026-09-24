import { pageTextOf } from "akasha/agent/seat/modules/page-values/seat-page-values.module.code.ts"
import { initiativesDrawn } from "akasha/domain/modules/work-initiatives/work-initiatives.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { AKASHA } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const KEY = "initiative"

const ASSIGNMENT_KEY = "domain-slug"

export interface InitiativeRecord {
  readonly value: string
}

function initiativesIn(root: string): ReadonlyMap<string, string> {
  return new Map(initiativesDrawn(root).map((one) => [one.slug, one.path]))
}

export function initiativeStemOf(bare: string, root: string): string | null {
  return initiativesIn(root).has(bare) ? bare : null
}

export function initiativeOf(agent: string): InitiativeRecord | null {
  const stated = pageTextOf(agent, ASSIGNMENT_KEY)
  if (stated === null) return null
  const address = addressIn(stated)
  if (address.kind !== "qualified" || address.pageTypeSlug !== KEY) return null
  return { value: address.slug }
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
