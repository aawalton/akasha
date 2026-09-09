import { partedIn } from "@akasha/pages/page-file-name"
import { takingIn, unreadable } from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

const PAGE_TYPE = "page-type"

const NAMED = 5

function typeSlugIn(path: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0 || said.pageType !== PAGE_TYPE) return null
  return said.slug
}

export function carryingIn(given: Guarding, slug: string): readonly string[] {
  return [...given.shadow.index.everyOfType(slug).map((one) => one.path)].sort()
}

function countSaid(count: number): string {
  return count === 1 ? "1 page, which goes first" : `${count} pages, which go first`
}

export function carrySaid(slug: string, carrying: readonly string[]): string {
  const named = carrying.slice(0, NAMED).join(", ")
  const rest = carrying.length > NAMED ? `, and ${carrying.length - NAMED} more` : ""
  return `\`${slug}\` is the page type of ${countSaid(carrying.length)} — ${named}${rest}`
}

function carriedIn(given: Guarding, taken: readonly string[]): string | null {
  for (const path of taken) {
    const slug = typeSlugIn(path)
    if (slug === null) continue
    const carrying = carryingIn(given, slug)
    if (carrying.length > 0) return carrySaid(slug, carrying)
  }
  return null
}

export function pageTypeCarriesNoPages(given: Guarding): string | null {
  const taken = takingIn(given.said)
  if (taken.length === 0) return null
  try {
    return carriedIn(given, taken)
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = pageTypeCarriesNoPages
