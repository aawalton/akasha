/**
 * What a page is called.
 *
 * What a page's name IS is written in
 * `pages/page-property-definition/page-name.page-property-definition.md`, never here: a page's name
 * is produced by the rule its page type declares, and a page's file is named for the page. This
 * file is the whole of what the package offers.
 *
 * THERE ARE TWO MOMENTS, as there are for a formula. `checkNaming` holds one page type's name
 * formula to the keys that page type declares, once. `nameOf` names one page, by running that
 * checked formula over that page's values. Only a checked naming can name a page: the class behind
 * `Naming` is never exported and holds its work under a private name, so nothing outside this file
 * can make one, and no caller can name a page by a formula nothing checked.
 *
 * A LEAF. No disk, no page index, no register of page types, no clock. Everything arrives as
 * arguments, the moment `now()` answers included.
 */

import {
  type Checked,
  checkPageType,
  type PageType,
  type PageTypeRefused,
  type Property,
  runFormula,
  type Values,
} from "../formula/formula.ts"

/** The key a page type declares its name under. */
const NAME = "name"

/** A name is text, and a page type declaring `name` to hold anything else is refused. */
const TEXT = { kind: "text" } as const

/**
 * What names a page whose page type declares no name formula of its own.
 *
 * THIS IS THE ONLY PLACE THE DEFAULT IS WRITTEN. A second copy is how a question with one answer
 * grows several, each right about the pages its own writer had in mind.
 *
 * A page type reaching this declares no `slug` or no `id` at its peril: the default names both, and
 * `checkNaming` refuses a page type that declares neither, rather than naming its pages nothing.
 */
export const DEFAULT_NAME = "{slug} ?? {id}"

/** A page that cannot be named, and why. */
export type Unnamed = {
  /** What was wrong, in the terms the name formula was written in. */
  readonly message: string
  /** The name formula that answered absent, as its page type states it. */
  readonly formula: string
  /**
   * The stored keys to blame: the ones the page holds nothing under, or every one the formula
   * reaches where the page holds all of them and the formula answered absent anyway.
   */
  readonly absent: readonly string[]
}

/** One computed key to work out on the way to the name, and the checked formula filling it. */
type Step = { readonly key: string; readonly formula: Checked }

/** `a` or `an`, for a refusal that names a type. */
const an = (word: string): string =>
  ["a", "e", "i", "o", "u"].includes(word[0] ?? "") ? `an ${word}` : `a ${word}`

/** Keys written out for a reader: `` `a` ``, `` `a` and `b` ``, `` `a`, `b` and `c` ``. */
const listOf = (keys: readonly string[]): string => {
  const quoted = keys.map((key) => `\`${key}\``)
  const last = quoted[quoted.length - 1]
  if (last === undefined) return ""
  if (quoted.length === 1) return last
  return `${quoted.slice(0, -1).join(", ")} and ${last}`
}

/** A page type refused for what it declares its name to be, rather than for a formula's text. */
const refuseNaming = (message: string): PageTypeRefused => ({
  ok: false,
  moment: "checking",
  message,
  at: { offset: 0, line: 1, column: 1 },
  keys: [NAME],
})

/**
 * Every computed key the name reaches, in the order they must be worked out, the name last.
 *
 * A COMPUTED KEY IS WORKED OUT RATHER THAN READ OFF THE VALUES. `runFormula` reads a key it is not
 * handed as absent, and reads one it is handed exactly as handed, so a name resting on another
 * computed key would answer absent where a caller passed only stored values, and would answer from
 * a stale value where a caller passed a wrong one. Neither fault is the page's, and both would
 * reach a reader as a page that cannot be named.
 *
 * The `walking` set cannot fire: `checkPageType` refuses a cycle among a page type's formulas
 * before this runs. It stands so that a defect there is a wrong answer rather than a hang.
 */
const stepsTo = (computed: ReadonlyMap<string, Checked>, from: string): readonly Step[] => {
  const order: Step[] = []
  const placed = new Set<string>()
  const walking = new Set<string>()
  const walk = (key: string): void => {
    if (placed.has(key) || walking.has(key)) return
    const formula = computed.get(key)
    if (formula === undefined) return
    walking.add(key)
    for (const read of formula.reads) walk(read)
    walking.delete(key)
    placed.add(key)
    order.push({ key, formula })
  }
  walk(from)
  return order
}

/** The stored keys those steps reach: every key read that no step fills. */
const storedAmong = (steps: readonly Step[]): readonly string[] => {
  const computed = new Set(steps.map((step) => step.key))
  const stored = new Set<string>()
  for (const step of steps) {
    for (const read of step.formula.reads) if (!computed.has(read)) stored.add(read)
  }
  return [...stored]
}

/**
 * How one page type names its pages, checked.
 *
 * Held as a class so that `nameOf` can only be reached with something `checkNaming` made. The
 * running is a method rather than a getter over the steps, which keeps what a step is inside this
 * file.
 */
class PageNaming {
  /** What tells a checked naming from a refusal, as it does for a checked formula. */
  readonly ok: true = true

  readonly #steps: readonly Step[]

  /** The name formula's text, as its page type states it, or the default where it states none. */
  readonly formula: string

  /** Every stored key the name reaches, through any computed key between. */
  readonly reads: readonly string[]

  constructor(steps: readonly Step[], formula: string) {
    this.#steps = steps
    this.formula = formula
    this.reads = storedAmong(steps)
  }

  /** Work out the name over one page's values. */
  answer(values: Values): string | Unnamed {
    const properties = { ...values.properties }
    for (const step of this.#steps) {
      properties[step.key] = runFormula(step.formula, { now: values.now, properties })
    }
    const named = properties[NAME]
    if (named !== undefined && named.kind === "text") return named.text

    const missing = this.reads.filter(
      (key) => (values.properties[key]?.kind ?? "absent") === "absent"
    )
    const blamed = missing.length > 0 ? missing : this.reads
    const why =
      blamed.length === 0
        ? `\`${this.formula}\` answers absent`
        : missing.length > 0
          ? `\`${this.formula}\` answers absent, nothing standing under ${listOf(blamed)}`
          : `\`${this.formula}\` answers absent over ${listOf(blamed)}`
    return { message: why, formula: this.formula, absent: blamed }
  }
}

/** How a page type names its pages, once it has passed its check. */
export type Naming = PageNaming

/**
 * Check how a page type names its pages: its own name formula, or the default where it declares
 * none.
 *
 * THE WHOLE PAGE TYPE IS CHECKED, not the name formula alone. The shape a formula is held to is
 * read off the page type by `checkPageType` rather than derived again here, so no name can be held
 * to a shape its own page type does not declare, and a cycle running through the name is found. A
 * page type wrong in any of its formulas is therefore refused here, naming the key at fault rather
 * than `name`.
 *
 * A PAGE TYPE DECLARING NO NAME IS NOT AN ERROR. It is named by the default, which is most page
 * types here.
 */
export const checkNaming = (pageType: PageType): Naming | PageTypeRefused => {
  const held = pageType[NAME]
  if (held !== undefined && held.type.kind !== TEXT.kind) {
    const holds = held.type.kind === "list" ? `a list of ${held.type.of}` : an(held.type.kind)
    return refuseNaming(`a page's name is text, and \`${NAME}\` is declared to hold ${holds}`)
  }

  const formula = held?.formula ?? DEFAULT_NAME
  const property: Property = { type: TEXT, formula }
  const checked = checkPageType({ ...pageType, [NAME]: property })
  if (!checked.ok) return checked

  return new PageNaming(stepsTo(checked.computed, NAME), formula)
}

/**
 * What one page is called: the text its page type's name formula answers over its values.
 *
 * A PAGE WHOSE NAME ANSWERS ABSENT IS REFUSED, never given a name that merely looks right. That is
 * the whole of why absent is in the language: a formula reaching nothing answers absent rather than
 * some stand-in, and a stand-in written into a file name is a page addressed by something no rule
 * produced.
 */
export const nameOf = (naming: Naming, values: Values): string | Unnamed => naming.answer(values)
