import type { Change } from "../../../pages/change/change.module.code.ts"
import type { Answering } from "../../../pages/indexes/answering/index-answering.module.code.ts"
import {
  type Cast,
  shadowAsked,
  shadowAt,
  shadowFor,
} from "../../../pages/shadow/shadow.module.code.ts"
import { gathered, refusing } from "../change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../change-answer/change-answer.module.types.ts"

const BYTES = new TextEncoder()

export type Reaching = (world: World, at: string, given: unknown) => Promise<Answer>

export type World = {
  readonly root: string
  readonly index: Answering
  readonly textOf: (path: string) => string | null
  readonly over: Answer
  readonly reaching?: Reaching
}

export const NOTHING_OVER: Answer = { edits: [], refused: null }

const REACHES_NOTHING: Reaching = (_world, at) =>
  Promise.resolve(refusing(`\`${at}\` is reached by no runner, so no change was run`))

export type Reached = {
  readonly said: Answer
  readonly world: World
}

export async function reach(world: World, at: string, given: unknown): Promise<Reached> {
  const said = await (world.reaching ?? REACHES_NOTHING)(world, at, given)
  if (said.refused !== null) return { said, world }
  return { said, world: worldOver(world, said) }
}

export function bytesOf(body: string | null): Uint8Array | null {
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

function bodiesIn(said: Answer): ReadonlyMap<string, string | null> {
  const found = new Map<string, string | null>()
  for (const one of said.edits) {
    if (one.from !== undefined) found.set(one.from, null)
  }
  for (const one of said.edits) found.set(one.path, one.body)
  return found
}

export function worldAt(
  root: string,
  textOf: (path: string) => string | null,
  reaching: Reaching = REACHES_NOTHING
): World {
  return { root, index: shadowAt(root).index, textOf, over: NOTHING_OVER, reaching }
}

export function worldOver(world: World, said: Answer): World {
  const held = bodiesIn(said)
  const index = shadowAsked(changeOver(world.root, said)).index
  return {
    root: world.root,
    index,
    textOf: (path) => (held.has(path) ? (held.get(path) ?? null) : world.textOf(path)),
    over: gathered([world.over, said]),
    reaching: world.reaching,
  }
}
