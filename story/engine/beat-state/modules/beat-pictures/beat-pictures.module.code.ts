import { recordIn } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"

export type Pictured = {
  readonly beat: number
  readonly cover: string
  readonly coverAfter: string
  readonly character?: string
  readonly outfit?: string
  readonly setting?: string
}

type Refused = { readonly refused: string }

const PARTED = "/"

const KNOWN: readonly string[] = ["beat", "cover", "coverAfter", "character", "outfit", "setting"]

const TEXTS = ["character", "outfit", "setting"] as const

function shapeRefused(held: Readonly<Record<string, unknown>>, beats: number): string | null {
  const unknown = Object.keys(held).find((key) => !KNOWN.includes(key))
  if (unknown !== undefined)
    return `states \`${unknown}\`, and a picture states ${KNOWN.join(", ")}`
  const beat = held["beat"]
  if (typeof beat !== "number" || !Number.isInteger(beat) || beat < 1 || beat > beats) {
    return `names no beat from 1 to ${beats}`
  }
  const cover = held["cover"]
  if (typeof cover !== "string" || !cover.includes(PARTED))
    return "names no image page by its address"
  const after = held["coverAfter"]
  if (typeof after !== "string" || after.trim() === "")
    return "quotes no `coverAfter` from the prose"
  const wrong = TEXTS.find((key) => held[key] !== undefined && typeof held[key] !== "string")
  return wrong === undefined ? null : `states \`${wrong}\` as no text`
}

function pictureOf(held: Readonly<Record<string, unknown>>): Pictured {
  const picture: Record<string, unknown> = {
    beat: held["beat"],
    cover: held["cover"],
    coverAfter: String(held["coverAfter"]).trim(),
  }
  for (const key of TEXTS) if (typeof held[key] === "string") picture[key] = held[key]
  return picture as Pictured
}

export function picturedIn(lines: readonly string[], beats: number): readonly Pictured[] | Refused {
  const pictured: Pictured[] = []
  for (const [index, line] of lines.entries()) {
    const where = `picture ${index + 1}`
    const held = recordIn(line)
    if (held === null) return { refused: `${where} is no json object` }
    const wrong = shapeRefused(held, beats)
    if (wrong !== null) return { refused: `${where} ${wrong}` }
    pictured.push(pictureOf(held))
  }
  return pictured.toSorted((one, other) => one.beat - other.beat)
}
