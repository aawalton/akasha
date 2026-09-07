import type { Change } from "../../../pages/change/change.module.code.ts"
import type { Answering } from "../../../pages/indexes/answering/index-answering.module.code.ts"
import type { Reading } from "../../../pages/indexes/shape/index-shape.module.code.ts"
import {
  type Cast,
  shadowAsked,
  shadowAt,
  shadowFor,
  shadowOnto,
} from "../../../pages/shadow/shadow.module.code.ts"
import type { Changes } from "../../runners/pages/change-running/change-running.change-runner.addressed.ts"
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

export function holding(world: World, said: Answer): World {
  return isLedger(world) ? addedTo(world, said) : worldOver(world, said)
}

export async function reach(world: World, at: keyof Changes, given: unknown): Promise<Reached> {
  const said = await (world.reaching ?? REACHES_NOTHING)(world, at, given)
  if (said.refused !== null) return { said, world }
  return { said, world: holding(world, said) }
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
  const over = gathered([world.over, said])
  if (over.refused !== null) throw new Error(over.refused)
  return {
    root: world.root,
    index,
    textOf: (path) => (held.has(path) ? (held.get(path) ?? null) : world.textOf(path)),
    over,
    reaching: world.reaching,
  }
}

export type Kept = {
  readonly root: string
  readonly base: (path: string) => string | null
  readonly bodies: Map<string, string | null>
  readonly stated: Map<string, Edit[]>
  fresh: Answer
  reading: Reading | null
  over: Answer
  index: Answering | null
}

export type Ledger = World & { readonly kept: Kept }

export function isLedger(world: World): world is Ledger {
  return "kept" in world
}

function settledIn(kept: Kept): Answering {
  if (kept.reading === null && kept.fresh.edits.length === 0) return shadowAt(kept.root).index
  const cast = shadowOnto(kept.reading, changeOver(kept.root, kept.fresh))
  if ("refused" in cast) throw new Error(cast.refused)
  kept.reading = cast.reading
  kept.fresh = NOTHING_OVER
  return cast.shadow.index
}

export function ledgerAt(
  root: string,
  textOf: (path: string) => string | null,
  reaching: Reaching = REACHES_NOTHING
): Ledger {
  const kept: Kept = {
    root,
    base: textOf,
    bodies: new Map<string, string | null>(),
    stated: new Map<string, Edit[]>(),
    fresh: NOTHING_OVER,
    reading: null,
    over: NOTHING_OVER,
    index: null,
  }
  return {
    kept,
    root,
    reaching,
    get index(): Answering {
      if (kept.index === null) kept.index = settledIn(kept)
      return kept.index
    },
    get over(): Answer {
      return kept.over
    },
    textOf: (path) => {
      const held = kept.bodies.get(path)
      return held === undefined ? kept.base(path) : held
    },
  }
}

export function statedIn(kept: Kept, edit: Edit): boolean {
  const before = kept.stated.get(edit.path)
  if (before === undefined) return false
  return before.some(
    (one) => one.was === edit.was && one.body === edit.body && one.from === edit.from
  )
}

export function addedTo(ledger: Ledger, said: Answer): Ledger {
  const kept = ledger.kept
  const fresh = said.edits.filter((one) => !statedIn(kept, one))
  if (fresh.length === 0) return ledger
  const held = { edits: fresh, refused: null }
  const over = gathered([kept.over, held])
  if (over.refused !== null) throw new Error(over.refused)
  const settling = gathered([kept.fresh, held])
  if (settling.refused !== null) throw new Error(settling.refused)
  for (const one of fresh) {
    const before = kept.stated.get(one.path)
    if (before === undefined) kept.stated.set(one.path, [one])
    else before.push(one)
    if (one.from !== undefined) kept.bodies.set(one.from, null)
  }
  for (const one of fresh) kept.bodies.set(one.path, one.body)
  kept.over = over
  kept.fresh = settling
  kept.index = null
  return ledger
}
