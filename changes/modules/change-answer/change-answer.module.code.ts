import type {
  Adding,
  Answer,
  Bodies,
  Edit,
  Moving,
  Reading,
  Removing,
  Replacing,
  Said,
  Stated,
} from "./change-answer.module.types.ts"

export type BodyOf = (path: string) => string | null

export type Expanded = { readonly edit: Edit } | { readonly refused: string }

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

export function answered(edits: readonly Edit[]): Answer {
  return { edits: edits.flatMap(narrowed), refused: null }
}

export function stating(edits: readonly Stated[]): Said {
  return { edits, refused: null }
}

export function writing(path: string, was: string | null, body: string): Edit {
  return { path, was, body }
}

export function taking(path: string, was: string): Edit {
  return { path, was, body: null }
}

export function moving(from: string, to: string, was: string, body: string): Edit {
  return { path: to, was, body, from }
}

function readingIn(one: Reading): Reading {
  const held: { readersOweReading?: boolean; writerOwesReading?: boolean } = {}
  if (one.readersOweReading !== undefined) held.readersOweReading = one.readersOweReading
  if (one.writerOwesReading !== undefined) held.writerOwesReading = one.writerOwesReading
  return held
}

function addedIn(one: Adding, textOf: BodyOf): Expanded {
  const held = textOf(one.path)
  if (held !== null && held !== "") {
    return { refused: `\`${one.path}\` holds a body already, so nothing is added` }
  }
  return { edit: { ...readingIn(one), path: one.path, was: held, body: one.content } }
}

function replacedIn(one: Replacing, textOf: BodyOf): Expanded {
  if (one.contentFrom === "") {
    return { refused: "a passage of no characters names no place in a body" }
  }
  const text = textOf(one.path)
  if (text === null) {
    return { refused: `\`${one.path}\` holds no body, so no passage is changed` }
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
  return { edit: { ...readingIn(one), path: one.path, was: text, body } }
}

function removedIn(one: Removing, textOf: BodyOf): Expanded {
  const text = textOf(one.path)
  if (text === null) {
    return { refused: `\`${one.path}\` holds no body, so nothing is taken away` }
  }
  return { edit: { ...readingIn(one), path: one.path, was: text, body: null } }
}

function movedIn(one: Moving, textOf: BodyOf): Expanded {
  const text = textOf(one.pathFrom)
  if (text === null) {
    return { refused: `\`${one.pathFrom}\` holds no body, so nothing is moved` }
  }
  const there = textOf(one.pathTo)
  if (there !== null && there !== "") {
    return { refused: `\`${one.pathTo}\` holds a body already, so nothing is moved there` }
  }
  const came = one.pathFrom
  return { edit: { ...readingIn(one), path: one.pathTo, was: text, body: text, from: came } }
}

export function expanded(one: Stated, textOf: BodyOf): Expanded {
  if (one.kind === "add") return addedIn(one, textOf)
  if (one.kind === "replace") return replacedIn(one, textOf)
  if (one.kind === "remove") return removedIn(one, textOf)
  return movedIn(one, textOf)
}

export function narrowed(one: Edit): readonly Stated[] {
  const reading = readingIn(one)
  const came = one.from === one.path ? undefined : one.from
  const body = one.body
  if (one.was === null) {
    if (body === null) return []
    return [{ ...reading, kind: "add", path: one.path, content: body }]
  }
  if (body === null) return [{ ...reading, kind: "remove", path: came ?? one.path }]
  const fresh = one.was === ""
  if (came === undefined) {
    if (one.was === body) return []
    if (fresh) return [{ ...reading, kind: "add", path: one.path, content: body }]
    return [{ ...reading, kind: "replace", path: one.path, contentFrom: one.was, contentTo: body }]
  }
  const moved: Stated = { ...reading, kind: "move", pathFrom: came, pathTo: one.path }
  if (one.was === body) return [moved]
  if (fresh) return [moved, { kind: "add", path: one.path, content: body }]
  return [moved, { kind: "replace", path: one.path, contentFrom: one.was, contentTo: body }]
}

export function replayed(said: Said, textOf: BodyOf): Bodies | { readonly refused: string } {
  const held = new Map<string, string | null>()
  const over: BodyOf = (path) => (held.has(path) ? (held.get(path) ?? null) : textOf(path))
  for (const one of said.edits) {
    const grown = expanded(one, over)
    if ("refused" in grown) return grown
    if (grown.edit.from !== undefined) held.set(grown.edit.from, null)
    held.set(grown.edit.path, grown.edit.body)
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
