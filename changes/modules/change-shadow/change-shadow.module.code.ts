import type { Change } from "../../../pages/change/change.module.code.ts"
import type { Answering } from "../../../pages/indexes/answering/index-answering.module.code.ts"
import {
  type Cast,
  shadowAsked,
  shadowAt,
  shadowFor,
} from "../../../pages/shadow/shadow.module.code.ts"
import { gathered } from "../change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../change-answer/change-answer.module.types.ts"

const BYTES = new TextEncoder()

/** The files and the index a change reads, as the answers before that change left both. */
export type World = {
  readonly root: string
  readonly index: Answering
  readonly textOf: (path: string) => string | null
  readonly over: Answer
}

export const NOTHING_OVER: Answer = { edits: [], refused: null }

function bytesOf(body: string | null): Uint8Array | null {
  return body === null ? null : BYTES.encode(body)
}

export function changeOver(root: string, said: Answer): Change {
  const held = new Map<string, Edit>()
  const left = new Map<string, Edit>()
  for (const one of said.edits) {
    held.set(one.path, one)
    if (one.from !== undefined) left.set(one.from, one)
  }
  const changed = [...new Set([...held.keys(), ...left.keys()])].sort()
  return {
    root,
    changed,
    before: (path) => {
      const moved = left.get(path)
      if (moved !== undefined) return bytesOf(moved.was)
      const one = held.get(path)
      return one === undefined || one.from !== undefined ? null : bytesOf(one.was)
    },
    after: (path) => {
      const one = held.get(path)
      return one === undefined ? null : bytesOf(one.body)
    },
  }
}

export function shadowOver(root: string, said: Answer): Cast {
  return shadowFor(changeOver(root, said))
}

/** A move empties the path it came from, and every other edit leaves its own path. */
function bodiesIn(said: Answer): ReadonlyMap<string, string | null> {
  const found = new Map<string, string | null>()
  for (const one of said.edits) {
    if (one.from !== undefined) found.set(one.from, null)
  }
  for (const one of said.edits) found.set(one.path, one.body)
  return found
}

export function worldAt(root: string, textOf: (path: string) => string | null): World {
  return { root, index: shadowAt(root).index, textOf, over: NOTHING_OVER }
}

export function worldOver(world: World, said: Answer): World {
  const held = bodiesIn(said)
  const index = shadowAsked(changeOver(world.root, said)).index
  return {
    root: world.root,
    index,
    textOf: (path) => (held.has(path) ? (held.get(path) ?? null) : world.textOf(path)),
    over: gathered([world.over, said]),
  }
}
