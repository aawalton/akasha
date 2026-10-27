import { recordIn } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"

export type BeatProse = {
  readonly beat: number
  readonly prose: string
  readonly continues?: boolean
}

type Refused = { readonly refused: string }

const CONTINUES = "continues"

const KNOWN: readonly string[] = ["beat", "prose", CONTINUES]

const BREAK = "\n\n"

const JOINED = " "

const FIRST_CONTINUES = "beat 1 continues, and has no paragraph before it to continue"

function shapeRefused(held: Readonly<Record<string, unknown>>, beats: number): string | null {
  const unknown = Object.keys(held).find((key) => !KNOWN.includes(key))
  if (unknown !== undefined) {
    return `states \`${unknown}\`, and a beat's prose states ${KNOWN.join(", ")}`
  }
  const beat = held["beat"]
  if (typeof beat !== "number" || !Number.isInteger(beat) || beat < 1 || beat > beats) {
    return `names no beat from 1 to ${beats}`
  }
  const prose = held["prose"]
  if (typeof prose !== "string" || prose.trim() === "") return "states no prose"
  const continues = held[CONTINUES]
  if (continues !== undefined && typeof continues !== "boolean") {
    return "states `continues` as neither true nor false"
  }
  if (continues === true && beat === 1) {
    return "states `continues` on beat 1, which has no paragraph before it to continue"
  }
  return null
}

function beatProseOf(held: Readonly<Record<string, unknown>>): BeatProse {
  const one = { beat: Number(held["beat"]), prose: String(held["prose"]).trim() }
  return held[CONTINUES] === true ? { ...one, continues: true } : one
}

export function proseLeadingRefused(prose: readonly BeatProse[]): string | null {
  const at = prose.findIndex((one, index) => one.beat !== index + 1)
  if (at >= 0) return `beat ${prose[at]?.beat} carries prose where beat ${at + 1} is due`
  if (prose[0]?.continues === true) return FIRST_CONTINUES
  return null
}

export function proseRefused(prose: readonly BeatProse[], beats: number): string | null {
  const leading = proseLeadingRefused(prose)
  if (leading !== null) return leading
  if (prose.length === beats) return null
  return `${beats} beats and prose for ${prose.length} of them, and every beat takes its own prose`
}

export function proseIn(lines: readonly string[], beats: number): readonly BeatProse[] | Refused {
  const prose: BeatProse[] = []
  let last = 0
  for (const [index, line] of lines.entries()) {
    const where = `prose ${index + 1}`
    const held = recordIn(line)
    if (held === null) return { refused: `${where} is no json object` }
    const wrong = shapeRefused(held, beats)
    if (wrong !== null) return { refused: `${where} ${wrong}` }
    const one = beatProseOf(held)
    if (one.beat <= last) return { refused: `${where} comes before beat ${last}'s prose` }
    last = one.beat
    prose.push(one)
  }
  return prose
}

export function proseWritten(prose: readonly BeatProse[]): string {
  const told = prose.map((one, at) => {
    if (at === 0) return one.prose
    return `${one.continues === true ? JOINED : BREAK}${one.prose}`
  })
  return `${told.join("")}\n`
}
