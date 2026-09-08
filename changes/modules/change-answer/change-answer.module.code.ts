import type {
  Adding,
  Answer,
  Held,
  Moving,
  NotText,
  Removing,
  Replacing,
  Replayed,
  Said,
  Splice,
  Stated,
} from "./change-answer.module.types.ts"

const NOT_TEXT_SAID = "is not text, so no passage in it is changed"

export const NOT_TEXT: NotText = { notText: true }

export type BodyOf = (path: string) => Held | null

export function notText(held: Held | null): held is NotText {
  return held !== null && typeof held !== "string"
}

function holds(held: Held | null): boolean {
  return held !== null && held !== ""
}

export type Leaving = {
  readonly path: string
  readonly body: Held | null
  readonly from?: string
}

export type Expanded = { readonly left: Leaving } | { readonly refused: string }

export function refusing(why: string): Answer {
  return { edits: [], refused: why }
}

export function pathsOf(one: Stated): readonly string[] {
  return one.kind === "move" ? [one.pathFrom, one.pathTo] : [one.path]
}

export function pathsIn(said: Answer): readonly string[] {
  return said.edits.flatMap(pathsOf)
}

export function missing(key: string): string {
  return `\`${key}\` names what this change is handed, and the arguments hold no \`${key}\``
}

export function stating(edits: readonly Stated[]): Said {
  return { edits, refused: null }
}

export function written(path: string, was: string | null, body: string): readonly Stated[] {
  if (was === null || was === "") return [{ kind: "add", path, content: body }]
  if (was === body) return []
  return [{ kind: "replace", path, contentFrom: was, contentTo: body }]
}

function onlyOnce(text: string, passage: string): boolean {
  const first = text.indexOf(passage)
  return first >= 0 && text.indexOf(passage, first + 1) < 0
}

function opening(text: string, at: number): number {
  return text.lastIndexOf("\n", at - 1) + 1
}

function closing(text: string, at: number): number {
  const shut = text.indexOf("\n", at)
  return shut < 0 ? text.length : shut
}

export function windowed(text: string, from: number, to: number): readonly [number, number] {
  let start = opening(text, from)
  let shut = closing(text, to)
  while (!onlyOnce(text, text.slice(start, shut))) {
    if (start === 0 && shut === text.length) return [0, text.length]
    start = opening(text, start - 1)
    shut = closing(text, Math.min(shut + 1, text.length))
  }
  return [start, shut]
}

export function spliced(path: string, text: string, splice: Splice): readonly Stated[] {
  if (text.slice(splice.from, splice.to) === splice.put) return []
  const [start, shut] = windowed(text, splice.from, splice.to)
  return [
    {
      kind: "replace",
      path,
      contentFrom: text.slice(start, shut),
      contentTo: text.slice(start, splice.from) + splice.put + text.slice(splice.to, shut),
    },
  ]
}

function addedIn(one: Adding, textOf: BodyOf): Expanded {
  if (holds(textOf(one.path))) {
    return { refused: `\`${one.path}\` holds a body already, so nothing is added` }
  }
  return { left: { path: one.path, body: one.content } }
}

function replacedIn(one: Replacing, textOf: BodyOf): Expanded {
  if (one.contentFrom === "") {
    return { refused: "a passage of no characters names no place in a body" }
  }
  const text = textOf(one.path)
  if (text === null) {
    return { refused: `\`${one.path}\` holds no body, so no passage is changed` }
  }
  if (notText(text)) {
    return { refused: `\`${one.path}\` ${NOT_TEXT_SAID}` }
  }
  const first = text.indexOf(one.contentFrom)
  if (first < 0) {
    return { refused: `\`${one.path}\` holds no such passage, so nothing is changed` }
  }
  if (text.indexOf(one.contentFrom, first + 1) >= 0) {
    return { refused: `\`${one.path}\` holds that passage twice or more, and one change works one` }
  }
  const shut = first + one.contentFrom.length
  const body = `${text.slice(0, first)}${one.contentTo}${text.slice(shut)}`
  if (body === text) {
    return { refused: `\`${one.path}\` reads the same after this, so this change writes nothing` }
  }
  return { left: { path: one.path, body } }
}

function removedIn(one: Removing, textOf: BodyOf): Expanded {
  const text = textOf(one.path)
  if (text === null) {
    return { refused: `\`${one.path}\` holds no body, so nothing is taken away` }
  }
  return { left: { path: one.path, body: null } }
}

function movedIn(one: Moving, textOf: BodyOf): Expanded {
  const text = textOf(one.pathFrom)
  if (text === null) {
    return { refused: `\`${one.pathFrom}\` holds no body, so nothing is moved` }
  }
  if (holds(textOf(one.pathTo))) {
    return { refused: `\`${one.pathTo}\` holds a body already, so nothing is moved there` }
  }
  return { left: { path: one.pathTo, body: text, from: one.pathFrom } }
}

export function expanded(one: Stated, textOf: BodyOf): Expanded {
  if (one.kind === "add") return addedIn(one, textOf)
  if (one.kind === "replace") return replacedIn(one, textOf)
  if (one.kind === "remove") return removedIn(one, textOf)
  return movedIn(one, textOf)
}

export function replayed(said: Said, textOf: BodyOf): Replayed | { readonly refused: string } {
  const held = new Map<string, Held | null>()
  const over: BodyOf = (path) => (held.has(path) ? (held.get(path) ?? null) : textOf(path))
  for (const one of said.edits) {
    const grown = expanded(one, over)
    if ("refused" in grown) return grown
    if (grown.left.from !== undefined) held.set(grown.left.from, null)
    held.set(grown.left.path, grown.left.body)
  }
  return held
}

export function beyond(had: Answer, said: Answer): Answer {
  const held = new Set(had.edits)
  return { edits: said.edits.filter((one) => !held.has(one)), refused: said.refused }
}

export function gathered(answers: readonly Answer[]): Answer {
  const edits: Stated[] = []
  for (const one of answers) {
    if (one.refused !== null) return one
    edits.push(...one.edits)
  }
  return { edits, refused: null }
}
