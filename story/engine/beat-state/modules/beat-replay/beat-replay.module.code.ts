export type BeatScene = {
  readonly beat: number
  readonly at?: string
  readonly place?: string
  readonly present?: readonly string[]
  readonly arrive?: readonly string[]
  readonly leave?: readonly string[]
}

export type Scene = {
  readonly at: string | null
  readonly place: string | null
  readonly present: readonly string[]
  readonly placeOf: Readonly<Record<string, string>>
}

export type Played = {
  readonly turn: string
  readonly beats: readonly string[]
  readonly scenes: readonly BeatScene[]
  readonly endsAt?: string | null
}

export type Planned = {
  readonly beats: readonly string[]
  readonly scenes: readonly BeatScene[]
}

type Refused = { readonly refused: string }

export const OPENING: Scene = { at: null, place: null, present: [], placeOf: {} }

const LISTS = ["present", "arrive", "leave"] as const

const TEXTS = ["at", "place"] as const

const EVENT = "event"

const KNOWN: readonly string[] = [EVENT, ...TEXTS, ...LISTS]

const OPENS_RECORD = "{"

function instantOf(said: string): number | null {
  const at = Date.parse(said)
  return Number.isNaN(at) ? null : at
}

function clockRefused(before: string | null, said: string, where: string): string | null {
  const now = instantOf(said)
  if (now === null) return `${where} states its time as \`${said}\`, which is no time`
  const then = before === null ? null : instantOf(before)
  if (then === null || now >= then) return null
  return `${where} sets the clock to ${said}, before ${before}, and a clock never runs back`
}

function castRefused(present: readonly string[], scene: BeatScene, where: string): string | null {
  const arrive = scene.arrive ?? []
  const leave = scene.leave ?? []
  const both = arrive.find((one) => leave.includes(one))
  if (both !== undefined) return `${where} has \`${both}\` arrive and leave at once`
  const there = arrive.find((one) => present.includes(one))
  if (there !== undefined) return `${where} has \`${there}\` arrive, who is there already`
  const away = leave.find((one) => !present.includes(one))
  if (away !== undefined) return `${where} has \`${away}\` leave, who is not there`
  return null
}

export function stepped(state: Scene, scene: BeatScene, where: string): Scene | Refused {
  const clock = scene.at === undefined ? null : clockRefused(state.at, scene.at, where)
  if (clock !== null) return { refused: clock }
  const before = scene.present ?? state.present
  const cast = castRefused(before, scene, where)
  if (cast !== null) return { refused: cast }
  const leave = scene.leave ?? []
  const present = [...before.filter((one) => !leave.includes(one)), ...(scene.arrive ?? [])]
  const place = scene.place ?? state.place
  const first = present[0]
  if (place === null && first !== undefined) {
    return { refused: `${where} puts \`${first}\` somewhere, and no beat has named the place yet` }
  }
  const placeOf: Record<string, string> = { ...state.placeOf }
  if (place !== null) for (const one of present) placeOf[one] = place
  return { at: scene.at ?? state.at, place, present, placeOf }
}

export function scenesRefused(beats: number, scenes: readonly BeatScene[]): string | null {
  let last = 0
  for (const one of scenes) {
    if (!Number.isInteger(one.beat) || one.beat < 1 || one.beat > beats) {
      return `a scene names beat ${one.beat}, and the beats run 1 to ${beats}`
    }
    if (one.beat <= last) return `the scene of beat ${one.beat} comes after beat ${last}'s`
    last = one.beat
  }
  return null
}

export function replayed(opening: Scene, turns: readonly Played[]): Scene | Refused {
  let state = opening
  for (const turn of turns) {
    const wrong = scenesRefused(turn.beats.length, turn.scenes)
    if (wrong !== null) return { refused: `\`${turn.turn}\`: ${wrong}` }
    for (const scene of turn.scenes) {
      const next = stepped(state, scene, `beat ${scene.beat} of \`${turn.turn}\``)
      if ("refused" in next) return next
      state = next
    }
    const timed = turn.scenes.some((one) => one.at !== undefined)
    if (!timed && typeof turn.endsAt === "string") state = { ...state, at: turn.endsAt }
  }
  return state
}

function listIn(value: unknown): readonly string[] | null {
  if (!Array.isArray(value)) return null
  return value.every((one) => typeof one === "string") ? value : null
}

export function sceneOf(beat: number, held: Readonly<Record<string, unknown>>): BeatScene | string {
  const scene: Record<string, unknown> = { beat }
  for (const key of TEXTS) {
    const value = held[key]
    if (value === undefined) continue
    if (typeof value !== "string") return `beat ${beat} states \`${key}\` as no text`
    scene[key] = value
  }
  for (const key of LISTS) {
    if (held[key] === undefined) continue
    const value = listIn(held[key])
    if (value === null) return `beat ${beat} states \`${key}\` as no list of addresses`
    scene[key] = value
  }
  if (typeof scene["at"] !== "string") return scene as BeatScene
  const at = instantOf(scene["at"])
  if (at === null) return `beat ${beat} states its time as \`${scene["at"]}\`, which is no time`
  return { ...scene, at: new Date(at).toISOString() } as BeatScene
}

export function scenesIn(value: unknown): readonly BeatScene[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((one): readonly BeatScene[] => {
    if (typeof one !== "object" || one === null) return []
    const held = one as Readonly<Record<string, unknown>>
    const scene = typeof held["beat"] === "number" ? sceneOf(held["beat"], held) : null
    return scene === null || typeof scene === "string" ? [] : [scene]
  })
}

function recordIn(line: string, beat: number): Readonly<Record<string, unknown>> | string {
  try {
    const held: unknown = JSON.parse(line)
    if (typeof held === "object" && held !== null && !Array.isArray(held)) {
      return held as Readonly<Record<string, unknown>>
    }
  } catch {}
  return `beat ${beat} opens as a record and is no json object`
}

export function plannedIn(lines: readonly string[]): Planned | Refused {
  const beats: string[] = []
  const scenes: BeatScene[] = []
  for (const [at, line] of lines.entries()) {
    const beat = at + 1
    if (!line.startsWith(OPENS_RECORD)) {
      beats.push(line)
      continue
    }
    const held = recordIn(line, beat)
    if (typeof held === "string") return { refused: held }
    const unknown = Object.keys(held).find((key) => !KNOWN.includes(key))
    if (unknown !== undefined) {
      return {
        refused: `beat ${beat} states \`${unknown}\`, and a beat states ${KNOWN.join(", ")}`,
      }
    }
    const event = held[EVENT]
    if (typeof event !== "string" || event.trim() === "") {
      return { refused: `beat ${beat} states no \`${EVENT}\`` }
    }
    beats.push(event.trim())
    const scene = sceneOf(beat, held)
    if (typeof scene === "string") return { refused: scene }
    if (Object.keys(scene).length > 1) scenes.push(scene)
  }
  return { beats, scenes }
}

export function unnamedIn(
  scenes: readonly BeatScene[],
  character: (address: string) => boolean,
  place: (address: string) => boolean
): string | null {
  for (const one of scenes) {
    if (one.place !== undefined && !place(one.place)) {
      return `beat ${one.beat} names \`${one.place}\` as its place, and no place page is that`
    }
    const cast = LISTS.flatMap((key) => one[key] ?? [])
    const stray = cast.find((address) => !character(address))
    if (stray !== undefined) {
      return `beat ${one.beat} names \`${stray}\`, and no character page is that`
    }
  }
  return null
}
