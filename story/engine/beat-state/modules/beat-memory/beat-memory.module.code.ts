export type Memory = {
  readonly beat: number
  readonly page: string
  readonly fact: string
  readonly learns?: string
  readonly shown?: true
  readonly establishes?: true
}

type Refused = { readonly refused: string }

const PARTED = "/"

const LONGEST_FACT = 100

const KNOWN: readonly string[] = ["beat", "page", "fact", "learns", "shown", "establishes"]

function recordIn(line: string): Readonly<{ [key: string]: unknown }> | null {
  try {
    const held: unknown = JSON.parse(line)
    if (typeof held === "object" && held !== null && !Array.isArray(held)) {
      return held as Readonly<{ [key: string]: unknown }>
    }
  } catch {}
  return null
}

function actOf(held: Readonly<{ [key: string]: unknown }>): Memory | string {
  const learns = held["learns"]
  const acts = [learns !== undefined, held["shown"] === true, held["establishes"] === true]
  if (acts.filter((one) => one).length !== 1) {
    return "states one of `learns`, `shown: true` or `establishes: true`, and only one"
  }
  if (learns !== undefined && (typeof learns !== "string" || !learns.includes(PARTED))) {
    return "names who `learns` by no character's address"
  }
  const base = {
    beat: Number(held["beat"]),
    page: String(held["page"]),
    fact: String(held["fact"]).trim(),
  }
  if (typeof learns === "string") return { ...base, learns }
  return held["shown"] === true ? { ...base, shown: true } : { ...base, establishes: true }
}

function shapeRefused(held: Readonly<{ [key: string]: unknown }>, beats: number): string | null {
  const unknown = Object.keys(held).find((key) => !KNOWN.includes(key))
  if (unknown !== undefined) return `states \`${unknown}\`, and a memory states ${KNOWN.join(", ")}`
  const beat = held["beat"]
  if (typeof beat !== "number" || !Number.isInteger(beat) || beat < 1 || beat > beats) {
    return `names no beat from 1 to ${beats}`
  }
  const page = held["page"]
  if (typeof page !== "string" || !page.includes(PARTED)) return "names no lore page by its address"
  const fact = held["fact"]
  if (typeof fact !== "string" || fact.trim() === "" || fact.length > LONGEST_FACT) {
    return `states no fact of 1 to ${LONGEST_FACT} characters`
  }
  return null
}

export function memoryIn(lines: readonly string[], beats: number): readonly Memory[] | Refused {
  const memory: Memory[] = []
  for (const [index, line] of lines.entries()) {
    const where = `memory ${index + 1}`
    const held = recordIn(line)
    if (held === null) return { refused: `${where} is no json object` }
    const wrong = shapeRefused(held, beats)
    if (wrong !== null) return { refused: `${where} ${wrong}` }
    const one = actOf(held)
    if (typeof one === "string") return { refused: `${where} ${one}` }
    memory.push(one)
  }
  return memory.toSorted((one, other) => one.beat - other.beat)
}

export function shownOf(memory: readonly Memory[]): readonly Memory[] {
  return memory.filter((one) => one.shown === true || one.establishes === true)
}
