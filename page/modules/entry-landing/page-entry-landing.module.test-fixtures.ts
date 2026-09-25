import { readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { filed, NO_PAGE } from "akasha/page/modules/entry-landing/page-entry-landing.module.code.ts"
import {
  linesOver,
  partsOverLines,
} from "akasha/page/modules/entry-writing/page-entry-writing.module.code.ts"
import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  partAt,
  uncommittedPartAt,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

type Landed = { readonly paths: readonly string[] } | { readonly refused: string }

function pastAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  from: number,
  uncommitted = false
): readonly string[] {
  const found: string[] = []
  for (let part = from; ; part += 1) {
    const at = uncommitted
      ? uncommittedPartAt(page, propertySlug, held, part)
      : partAt(page, propertySlug, held, part)
    if (at === null) break
    if (!filed(join(root, at))) break
    found.push(at)
  }
  return found
}

export function landedLinesAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  lines: Iterable<string>,
  ceiling: number,
  uncommitted = false
): Landed {
  if (!filed(join(root, page))) return { refused: `'${page}' ${NO_PAGE}` }
  const made = partsOverLines(page, propertySlug, held, lines, ceiling, uncommitted)
  if ("refused" in made) return made
  const paths: string[] = []
  for (const part of made.parts) {
    const at = join(root, part.path)
    if (filed(at) && readFileSync(at, "utf8") === part.text) continue
    writeFileSync(at, part.text)
    paths.push(part.path)
  }
  const from = FIRST_PART + made.parts.length
  for (const gone of pastAt(root, page, propertySlug, held, from, uncommitted)) {
    rmSync(join(root, gone), { force: true })
    paths.push(gone)
  }
  return { paths }
}

export function landedAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  values: Iterable<Value>,
  ceiling: number,
  uncommitted = false
): Landed {
  return landedLinesAt(root, page, propertySlug, held, linesOver(values), ceiling, uncommitted)
}
