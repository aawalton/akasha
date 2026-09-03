import {
  boolIn,
  type Row,
  rowsFor,
  textIn,
  textsIn,
  titleOf,
} from "../exercise-rows/exercise-rows.module.code.ts"

const COACHING_CONSTRAINT = "coaching-constraint"

const EQUIPMENT_ITEM = "equipment-item"

const EVERY_FOCUS = "all"

const AT_MOST = 200

export interface EquipmentStanding {
  readonly title: string
  readonly category: string | null
  readonly configuration: string | null
  readonly loads: string | null
  readonly available: boolean
  readonly notes: string | null
}

export interface ConstraintStanding {
  readonly title: string
  readonly kind: string | null
  readonly body: string | null
  readonly focusTags: readonly string[]
}

export type Equipped =
  | { readonly equipment: readonly EquipmentStanding[] }
  | { readonly refused: string }

export type Constrained =
  | { readonly constraints: readonly ConstraintStanding[] }
  | { readonly refused: string }

export function focusTagsOf(row: Row): readonly string[] {
  return textsIn(row, "focusTags")
}

export function bindsFocus(row: Row, focus: string | null): boolean {
  if (focus === null) return true
  const tags = focusTagsOf(row)
  return tags.includes(focus) || tags.includes(EVERY_FOCUS)
}

export function equipmentIn(rows: readonly Row[]): readonly EquipmentStanding[] {
  return rows.map((row) => ({
    title: titleOf(row),
    category: textIn(row, "category") ?? null,
    configuration: textIn(row, "configuration") ?? null,
    loads: textIn(row, "loads") ?? null,
    available: boolIn(row, "available") ?? true,
    notes: textIn(row, "notes") ?? null,
  }))
}

export function constraintsIn(
  rows: readonly Row[],
  focus: string | null
): readonly ConstraintStanding[] {
  return rows
    .filter((row) => bindsFocus(row, focus))
    .map((row) => ({
      title: titleOf(row),
      kind: textIn(row, "coachingConstraintKind") ?? null,
      body: textIn(row, "body") ?? null,
      focusTags: focusTagsOf(row),
    }))
}

export async function equipmentStandings(): Promise<Equipped> {
  const found = await rowsFor({
    pageTypeSlug: EQUIPMENT_ITEM,
    order: [{ by: "title", dir: "asc" }],
    limit: AT_MOST,
  })
  if ("unread" in found) return { refused: found.unread }
  return { equipment: equipmentIn(found.rows) }
}

export async function constraintStandings(focus: string | null): Promise<Constrained> {
  const found = await rowsFor({
    pageTypeSlug: COACHING_CONSTRAINT,
    where: [{ key: "coachingConstraintActive", eq: true }],
    order: [{ by: "coachingConstraintSortOrder", dir: "asc" }],
    limit: AT_MOST,
  })
  if ("unread" in found) return { refused: found.unread }
  return { constraints: constraintsIn(found.rows, focus) }
}
