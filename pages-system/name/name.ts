import {
  type Checked,
  checkPageType,
  type PageType,
  type PageTypeRefused,
  type Property,
  runFormula,
  type Values,
} from "../formula/formula.ts"

const NAME = "name"

const TEXT = { kind: "text" } as const

export const DEFAULT_NAME = "{slug} ?? {id}"

export type Unnamed = {
  readonly message: string
  readonly formula: string
  readonly absent: readonly string[]
}

type Step = { readonly key: string; readonly formula: Checked }

const an = (word: string): string =>
  ["a", "e", "i", "o", "u"].includes(word[0] ?? "") ? `an ${word}` : `a ${word}`

const listOf = (keys: readonly string[]): string => {
  const quoted = keys.map((key) => `\`${key}\``)
  const last = quoted[quoted.length - 1]
  if (last === undefined) return ""
  if (quoted.length === 1) return last
  return `${quoted.slice(0, -1).join(", ")} and ${last}`
}

const refuseNaming = (message: string): PageTypeRefused => ({
  ok: false,
  moment: "checking",
  message,
  at: { offset: 0, line: 1, column: 1 },
  keys: [NAME],
})

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

const storedAmong = (steps: readonly Step[]): readonly string[] => {
  const computed = new Set(steps.map((step) => step.key))
  const stored = new Set<string>()
  for (const step of steps) {
    for (const read of step.formula.reads) if (!computed.has(read)) stored.add(read)
  }
  return [...stored]
}

class PageNaming {
  readonly ok: true = true

  readonly #steps: readonly Step[]

  readonly formula: string

  readonly reads: readonly string[]

  constructor(steps: readonly Step[], formula: string) {
    this.#steps = steps
    this.formula = formula
    this.reads = storedAmong(steps)
  }

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

export type Naming = PageNaming

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

export const nameOf = (naming: Naming, values: Values): string | Unnamed => naming.answer(values)
