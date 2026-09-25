import {
  carried,
  type Held,
  type Values,
} from "akasha/page/modules/carry/page-carry.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { wholeValue } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { inLowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "page-type-slug"

export function valuesOfDeclared(
  relPath: string,
  declared: Readonly<Record<string, unknown>>
): Values {
  const values: Record<string, Held> = {}
  for (const [key, held] of Object.entries(declared)) {
    values[inLowerKebabCase(key)] = carried(held)
  }
  const parted = partedIn(relPath)
  if (parted !== null) {
    values[SLUG] ??= parted.slug
    values[PAGE_TYPE_SLUG] ??= parted.pageType
  }
  return values
}

export function kebabisedRow(values: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(values)) out[inLowerKebabCase(key)] = held
  return out
}

export function akashaValuesAt(root: string, relPath: string): Values | null {
  const declared = valueAt(relPath, root)
  return declared === null ? null : valuesOfDeclared(relPath, wholeValue(root, relPath, declared))
}
