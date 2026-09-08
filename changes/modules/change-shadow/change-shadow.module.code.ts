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
import {
  type BodyOf,
  gathered,
  refusing,
  replayed,
} from "../change-answer/change-answer.module.code.ts"
import type { Answer, Stated } from "../change-answer/change-answer.module.types.ts"

const BYTES = new TextEncoder()

export type Reaching = (world: World, at: string, given: unknown) => Promise<Answer>

export type World = {
  readonly root: string
  readonly index: Answering
  readonly textOf: (path: string) => string | null
  readonly base: BodyOf
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

export async function reach(world: World, at: keyof Changes, given: unknown): Promise<Reached> {
  const said = await (world.reaching ?? REACHES_NOTHING)(world, at, given)
  if (said.refused !== null) return { said, world }
  return { said, world: isLedger(world) ? addedTo(world, said) : worldOver(world, said) }
}

export function bytesOf(body: string | null): Uint8Array | null {
  return body === null ? null : BYTES.encode(body)
}

export function bodiesIn(said: Answer, textOf: BodyOf): ReadonlyMap<string, string | null> {
  const held = replayed(said, textOf)
  if ("refused" in held) throw new Error(held.refused)
  return held
}

export function changeOver(root: string, said: Answer, textOf: BodyOf): Change {
  const held = bodiesIn(said, textOf)
  return {
    root,
    changed: [...held.keys()].sort(),
    before: (path) => bytesOf(textOf(path)),
    after: (path) => bytesOf(held.has(path) ? (held.get(path) ?? null) : textOf(path)),
  }
}

export function shadowOver(root: string, said: Answer, textOf: BodyOf): Cast {
  return shadowFor(changeOver(root, said, textOf))
}

export function worldAt(
  root: string,
  textOf: (path: string) => string | null,
  reaching: Reaching = REACHES_NOTHING
): World {
  return { root, index: shadowAt(root).index, textOf, base: textOf, over: NOTHING_OVER, reaching }
}

export function worldOver(world: World, said: Answer): World {
  const held = bodiesIn(said, world.textOf)
  const index = shadowAsked(changeOver(world.root, said, world.textOf)).index
  const over = gathered([world.over, said])
  if (over.refused !== null) throw new Error(over.refused)
  return {
    root: world.root,
    index,
    textOf: (path) => (held.has(path) ? (held.get(path) ?? null) : world.textOf(path)),
    base: world.base,
    over,
    reaching: world.reaching,
  }
}

export type Kept = {
  readonly root: string
  readonly base: (path: string) => string | null
  readonly bodies: Map<string, string | null>
  readonly held: Set<Stated>
  readonly settled: Map<string, string | null>
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
  const was: BodyOf = (path) =>
    kept.settled.has(path) ? (kept.settled.get(path) ?? null) : kept.base(path)
  const cast = shadowOnto(kept.reading, changeOver(kept.root, kept.fresh, was))
  if ("refused" in cast) throw new Error(cast.refused)
  kept.reading = cast.reading
  kept.fresh = NOTHING_OVER
  for (const [path, body] of kept.bodies) kept.settled.set(path, body)
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
    held: new Set<Stated>(),
    settled: new Map<string, string | null>(),
    fresh: NOTHING_OVER,
    reading: null,
    over: NOTHING_OVER,
    index: null,
  }
  return {
    kept,
    root,
    reaching,
    base: textOf,
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

export function addedTo(ledger: Ledger, said: Answer): Ledger {
  const kept = ledger.kept
  const fresh = said.edits.filter((one) => !kept.held.has(one))
  if (fresh.length === 0) return ledger
  const adding: Answer = { edits: fresh, refused: null }
  const over = gathered([kept.over, adding])
  if (over.refused !== null) throw new Error(over.refused)
  const settling = gathered([kept.fresh, adding])
  if (settling.refused !== null) throw new Error(settling.refused)
  const bodies = replayed(adding, ledger.textOf)
  if ("refused" in bodies) throw new Error(bodies.refused)
  for (const [path, body] of bodies) kept.bodies.set(path, body)
  for (const one of fresh) kept.held.add(one)
  kept.over = over
  kept.fresh = settling
  kept.index = null
  return ledger
}
