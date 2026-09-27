import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  pagesKept,
  type Written,
  writtenAgain,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/player/character/companion-build/properties/base-roles.select-property.ts",
  pageTypeSlug: temperCompanionBaseRole.slug,
  from: "companion base role pages",
  unions: [{ name: "BaseRoles", holds: () => true }],
}

const VALUES = /values: \[[^\]]*\]/

const NOTHING: Written = { edits: [], said: [] }

function keysInOrder(
  this: void,
  pages: readonly { readonly value: Readonly<Record<string, unknown>> }[]
): readonly string[] {
  const held = pages.flatMap(({ value }) =>
    typeof value.key === "string"
      ? [{ key: value.key, order: Number(value.displayOrder ?? 0) }]
      : []
  )
  held.sort((one, other) => one.order - other.order || one.key.localeCompare(other.key))
  return held.map((one) => one.key)
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  if (!keepingTurns(KEEPING, change)) return NOTHING
  const pages = pagesKept(KEEPING, change)
  const was = textOf(change.after(KEEPING.at))
  if (pages === null || was === null || !VALUES.test(was)) return NOTHING
  return writtenAgain(
    KEEPING,
    change,
    was.replace(VALUES, `values: ${JSON.stringify(keysInOrder(pages))}`)
  )
}
