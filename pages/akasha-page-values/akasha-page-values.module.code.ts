import { kebabizeKey } from "@akasha/pages-access/file-rows"
import { carried, type Held, type Values } from "../carry/page-carry.module.code.ts"
import { partedIn } from "../file-name/page-file-name.module.code.ts"
import { wholeValue } from "../uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "../value/page-value.module.code.ts"

export const AKASHA_PAGE = ".ts"

export function isAkashaPage(relPath: string): boolean {
  return relPath.endsWith(AKASHA_PAGE)
}

export const SLUG = "slug"

export const PAGE_TYPE_SLUG = "page-type-slug"

export function valuesOfDeclared(
  relPath: string,
  declared: Readonly<Record<string, unknown>>
): Values {
  const values: Record<string, Held> = {}
  for (const [key, held] of Object.entries(declared)) values[kebabizeKey(key)] = carried(held)
  const parted = partedIn(relPath)
  if (parted !== null) {
    values[SLUG] ??= parted.slug
    values[PAGE_TYPE_SLUG] ??= parted.pageType
  }
  return values
}

export function kebabisedRow(values: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(values)) out[kebabizeKey(key)] = held
  return out
}

export function akashaValuesAt(root: string, relPath: string): Values | null {
  const declared = valueAt(relPath, root)
  return declared === null ? null : valuesOfDeclared(relPath, wholeValue(root, relPath, declared))
}
