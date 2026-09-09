import { pageNamed } from "@akasha/pages/page-file-name"
import { textAt } from "@akasha/pages/page-value"
import { unreadable, writtenIn } from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

const PAGE = "page"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

type Holder = { readonly path: string }

function otherThan(held: readonly Holder[], path: string): string | null {
  for (const one of held) {
    if (one.path !== path) return one.path
  }
  return null
}

function heldAt(given: Guarding, path: string): string | null {
  const value = given.shadow.pageOf(path)
  if (value === null) return null
  const index = given.shadow.index
  const id = textAt(value, ID)
  if (id !== null) {
    const other = otherThan(index.listedNamed(PAGE, NO_SCOPE, ID, id), path)
    if (other !== null) {
      return `\`${path}\` states the id \`${id}\`, which \`${other}\` already holds`
    }
  }
  const slug = textAt(value, SLUG)
  const pageTypeSlug = textAt(value, PAGE_TYPE) ?? textAt(value, PAGE_TYPE_SLUG)
  if (slug !== null && pageTypeSlug !== null) {
    const other = otherThan(index.listedAt(pageTypeSlug, slug), path)
    if (other !== null) {
      return `\`${path}\` states the slug \`${slug}\`, which \`${other}\` already holds`
    }
  }
  return null
}

export function identityNotAlreadyHeld(given: Guarding): string | null {
  try {
    const pageTypes = given.shadow.index.pageTypesIn()
    for (const path of writtenIn(given).keys()) {
      if (!pageNamed(path, pageTypes)) continue
      const why = heldAt(given, path)
      if (why !== null) return why
    }
    return null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = identityNotAlreadyHeld
