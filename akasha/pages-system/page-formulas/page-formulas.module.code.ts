import {
  type Checked,
  checkPageType,
  type DeclaredType,
  runFormula,
  type ScalarKind,
  type PageType as Shaped,
  type Value as Worked,
} from "@akasha/pages-formula"
import { valuedAs } from "@akasha/pages-formula/held"

export const FORMULA = "formula-property"

export const KIND_OF: Readonly<Record<string, DeclaredType["kind"]>> = {
  "boolean-property": "boolean",
  "calendar-date-property": "date",
  "email-address-property": "text",
  "instant-property": "instant",
  "number-property": "number",
  "one-of-property": "text",
  "phone-number-property": "text",
  "rank-property": "text",
  "relation-property": "text",
  "select-property": "text",
  "text-property": "text",
  "url-property": "text",
}

export const UNREAD: ReadonlySet<string> = new Set([
  "file-property",
  "named-file-property",
  "page-property-entry",
  "process-property",
  "record-property",
])

export const HOLDS: Readonly<Record<string, DeclaredType>> = {
  boolean: { kind: "boolean" },
  date: { kind: "date" },
  instant: { kind: "instant" },
  number: { kind: "number" },
  text: { kind: "text" },
}

export type Declared = {
  readonly slug: string
  readonly key: string
  readonly sort: string
  readonly many: boolean
  readonly formula: string | null
  readonly holds: string | null
}

export type Figure = {
  readonly slug: string
  readonly key: string
  readonly checked: Checked
}

export type Read = {
  readonly slug: string
  readonly key: string
  readonly type: DeclaredType
}

export type Working = {
  readonly reads: readonly Read[]
  readonly figures: readonly Figure[]
}

export type Barred = {
  readonly barred: string
  readonly keys: readonly string[]
}

const SCALARS: ReadonlySet<string> = new Set(["text", "number", "boolean", "instant"])

function typeFor(kind: DeclaredType["kind"], many: boolean): DeclaredType | null {
  if (!many) return { kind } as DeclaredType
  return SCALARS.has(kind) ? { kind: "list", of: kind as ScalarKind } : null
}

function heldFrom(worked: Worked): unknown {
  if (worked.kind === "absent") return undefined
  if (worked.kind === "text") return worked.text
  if (worked.kind === "number") return worked.number
  if (worked.kind === "boolean") return worked.boolean
  if (worked.kind === "date") return worked.date
  if (worked.kind === "instant") return new Date(worked.instant).toISOString()
  return worked.items.map((one) => heldFrom(one))
}

function everyFigure(declared: readonly Declared[]): readonly string[] {
  return declared.filter((one) => one.sort === FORMULA).map((one) => one.key)
}

export function workingOver(
  pageTypeSlug: string,
  declared: readonly Declared[]
): Working | Barred | null {
  if (!declared.some((one) => one.sort === FORMULA)) return null
  const every = everyFigure(declared)
  const shaped: Record<string, { type: DeclaredType; formula?: string }> = {}
  const keyOf = new Map<string, string>()
  const reads: Read[] = []
  for (const one of declared) {
    keyOf.set(one.slug, one.key)
    if (one.sort === FORMULA) {
      const holds = one.holds === null ? undefined : HOLDS[one.holds]
      if (one.formula === null) {
        return {
          barred: `\`${pageTypeSlug}\` carries \`${one.slug}\` as a formula property, and no page states the formula it is worked out by`,
          keys: every,
        }
      }
      if (holds === undefined) {
        return {
          barred: `\`${one.slug}\` states no kind its formula answers, so nothing can judge what \`${pageTypeSlug}\` works out under that key`,
          keys: every,
        }
      }
      shaped[one.slug] = { type: holds, formula: one.formula }
      continue
    }
    if (UNREAD.has(one.sort)) continue
    const kind = KIND_OF[one.sort]
    if (kind === undefined) {
      return {
        barred: `no kind is written down for \`${one.sort}\`, so \`${one.slug}\` would be left out of the shape and a formula reading it would be refused for a misspelling it does not have`,
        keys: every,
      }
    }
    const type = typeFor(kind, one.many)
    if (type === null) {
      return {
        barred: `\`${one.slug}\` carries many a ${kind}, which the formula language holds no list of`,
        keys: every,
      }
    }
    shaped[one.slug] = { type }
    reads.push({ slug: one.slug, key: one.key, type })
  }

  const checked = checkPageType(shaped as Shaped)
  if (!checked.ok) {
    return {
      barred: `${checked.moment} — ${checked.message}`,
      keys: checked.keys.map((slug) => keyOf.get(slug) ?? slug).sort(),
    }
  }

  const figures: Figure[] = []
  const placed = new Set<string>()
  const place = (slug: string): undefined => {
    if (placed.has(slug)) return
    const one = checked.computed.get(slug)
    if (one === undefined) return
    placed.add(slug)
    for (const read of one.reads) place(read)
    figures.push({ slug, key: keyOf.get(slug) ?? slug, checked: one })
  }
  for (const slug of checked.computed.keys()) place(slug)
  return { reads, figures }
}

export function workedInto(
  working: Working,
  value: Readonly<Record<string, unknown>>,
  now: number
): Record<string, unknown> {
  const properties: Record<string, Worked> = {}
  for (const one of working.reads) properties[one.slug] = valuedAs(value[one.key], one.type)
  const filled: Record<string, unknown> = { ...value }
  for (const figure of working.figures) {
    const worked = runFormula(figure.checked, { now, properties })
    properties[figure.slug] = worked
    const held = heldFrom(worked)
    if (held !== undefined) filled[figure.key] = held
  }
  return filled
}
