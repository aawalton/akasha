import { checkFormula, type DeclaredType, type Shape } from "@akasha/pages-formula"

/**
 * The kind of value each sort of stored property holds, read off the name it is filed under.
 *
 * A page type states its parts as `<sort>-property/<slug>`, so the sort is already written down and
 * nothing here has to open the property file to learn it. A sort this does not know is refused by
 * name rather than left out of the shape: a key missing from the shape reads exactly like a key
 * misspelt in a formula, and the two want opposite answers.
 */
export const KIND_OF: Readonly<Record<string, DeclaredType>> = {
  "number-property": { kind: "number" },
  "text-property": { kind: "text" },
  "boolean-property": { kind: "boolean" },
  "instant-property": { kind: "instant" },
  "calendar-date-property": { kind: "date" },
}

/** The sorts of part that carry no value a formula can read, and so stand outside the shape. */
const UNREAD: ReadonlySet<string> = new Set([
  "page-property-entry",
  "relation-property",
  "file-property",
  "named-file-property",
  "formula-property",
])

export type Figure = {
  readonly slug: string
  readonly formula: string
}

export type Verdict =
  | {
      readonly slug: string
      readonly ok: true
      readonly holds: string
      readonly reads: readonly string[]
    }
  | { readonly slug: string; readonly ok: false; readonly why: string }

/**
 * The keys a page of this type carries a stored value under, as the formula language reads them.
 *
 * Only the stored sorts go in. An entry property is a file of rows rather than a value, and a
 * formula property is worked out rather than stored, so both are added as they are checked below
 * instead of being assumed to hold anything.
 */
export function shapeOf(partSlugs: readonly string[]): Shape {
  const shape: Record<string, DeclaredType> = { title: { kind: "text" } }
  for (const part of partSlugs) {
    const at = part.indexOf("/")
    if (at < 0) throw new Error(`\`${part}\` names no sort of property, so its kind is unknown`)
    const sort = part.slice(0, at)
    const slug = part.slice(at + 1)
    if (UNREAD.has(sort)) continue
    const kind = KIND_OF[sort]
    if (kind === undefined) {
      throw new Error(
        `no kind is written down for \`${sort}\`, so \`${slug}\` would be left out of the shape ` +
          "and a formula reading it would be refused for a misspelling it does not have"
      )
    }
    shape[slug] = { kind }
  }
  return shape
}

/**
 * Every figure a day works out, checked against the keys the day actually carries.
 *
 * The shape grows as the figures are checked, because a figure may read another figure — the six
 * stoplights read the six levels, and the strip reads the six stoplights. A figure whose inputs are
 * all in hand is checked and its own kind put into the shape; the rest are tried again on the next
 * pass. What survives a pass that settled nothing is refused, which is what a ring of figures
 * reading one another comes out as.
 *
 * This exists because a formula names its inputs as text. Renaming a stored property leaves every
 * formula reading it spelling a key nothing declares, and akasha works no formula out at the reader
 * yet, so nothing else would say a word: Alan's tiles would read empty rather than wrong.
 */
export function figuresIn(
  partSlugs: readonly string[],
  figures: readonly Figure[]
): readonly Verdict[] {
  const shape: Record<string, DeclaredType> = { ...shapeOf(partSlugs) }
  const verdicts: Verdict[] = []
  let waiting = [...figures]
  while (waiting.length > 0) {
    const again: Figure[] = []
    for (const figure of waiting) {
      const checked = checkFormula(figure.formula, shape)
      if (!checked.ok) {
        again.push(figure)
        continue
      }
      const holds = checked.type.holds
      if (holds === null) {
        verdicts.push({
          slug: figure.slug,
          ok: false,
          why: "it works out to nothing whatever the day holds",
        })
        continue
      }
      shape[figure.slug] = holds
      verdicts.push({ slug: figure.slug, ok: true, holds: holds.kind, reads: checked.reads })
    }
    if (again.length === waiting.length) {
      for (const figure of again) {
        const checked = checkFormula(figure.formula, shape)
        verdicts.push({
          slug: figure.slug,
          ok: false,
          why: checked.ok ? "it settled on no kind" : `${checked.moment} — ${checked.message}`,
        })
      }
      break
    }
    waiting = again
  }
  return verdicts
}
