import { existsSync } from "node:fs"
import { join, relative } from "node:path"
import type { Change } from "../../../pages/change/change.module.code.ts"
import type { Answering } from "../../../pages/indexes/answering/index-answering.module.code.ts"
import type { Reading } from "../../../pages/indexes/shape/index-shape.module.code.ts"
import { walkedUnder } from "../../../pages/indexes/tree-reading/tree-reading.module.code.ts"
import {
  type Cast,
  shadowAsked,
  shadowAt,
  shadowFor,
  shadowOnto,
} from "../../../pages/shadow/shadow.module.code.ts"
import type { Changes as AgentChanges } from "../../runners/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"
import type { Changes as MechanicalChanges } from "../../runners/pages/mechanical-change-running/mechanical-change-running.change-runner.addressed.ts"

import {
  type BodyOf,
  gathered,
  notText,
  pathsIn,
  refusing,
  replayed,
} from "../change-answer/change-answer.module.code.ts"
import type { Answer, Bodies, Held, Stated } from "../change-answer/change-answer.module.types.ts"

const BYTES = new TextEncoder()

const OUTSIDE = ".."

export type Reaching = (world: World, at: string, given: unknown) => Promise<Answer>

export type World = {
  readonly root: string
  readonly index: Answering
  readonly textOf: (path: string) => string | null
  readonly under: (folder: string) => readonly string[]
  readonly base: BodyOf
  readonly over: Answer
  readonly reaching?: Reaching
}

function treeUnder(root: string, folder: string, index: Answering): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  const entering = (path: string): boolean => index.listedByPath(relative(root, path)).length === 0
  return walkedUnder(at, () => true, entering)
    .map((one) => relative(root, one))
    .sort()
}

function beneath(folder: string, path: string): boolean {
  const held = relative(folder, path)
  return held !== "" && !held.startsWith(OUTSIDE)
}

function underOver(had: readonly string[], said: Answer, folder: string): readonly string[] {
  const found = new Set(had)
  for (const one of said.edits) {
    if (one.kind === "remove") found.delete(one.path)
    else if (one.kind === "move") {
      found.delete(one.pathFrom)
      found.add(one.pathTo)
    } else found.add(one.path)
  }
  return [...found].filter((one) => beneath(folder, one)).sort()
}

export const NOTHING_OVER: Answer = { edits: [], refused: null }

const REACHES_NOTHING: Reaching = (_world, at) =>
  Promise.resolve(refusing(`\`${at}\` is reached by no runner, so no change was run`))

export type Reaches = keyof AgentChanges | keyof MechanicalChanges

export type Reached = {
  readonly said: Answer
  readonly world: World
}

export async function reach(world: World, at: Reaches, given: unknown): Promise<Reached> {
  const said = await (world.reaching ?? REACHES_NOTHING)(world, at, given)
  if (said.refused !== null) return { said, world }
  try {
    return { said, world: isLedger(world) ? addedTo(world, said) : worldOver(world, said) }
  } catch (cause) {
    return { said: refusing(cause instanceof Error ? cause.message : String(cause)), world }
  }
}

export function bytesOf(body: Held | null): Uint8Array | null {
  return body === null || notText(body) ? null : BYTES.encode(body)
}

export function bodiesIn(said: Answer, textOf: BodyOf): Bodies {
  const held = replayed(said, textOf)
  if ("refused" in held) throw new Error(held.refused)
  const found = new Map<string, string | null>()
  for (const [path, body] of held) found.set(path, notText(body) ? null : body)
  return found
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
  const index = shadowAt(root).index
  return {
    root,
    index,
    textOf,
    under: (folder) => treeUnder(root, folder, index),
    base: textOf,
    over: NOTHING_OVER,
    reaching,
  }
}

export function worldOver(world: World, said: Answer): World {
  const held = bodiesIn(said, world.textOf)
  const over = gathered([world.over, said])
  if (over.refused !== null) throw new Error(over.refused)
  const index = shadowAsked(changeOver(world.root, over, world.base)).index
  return {
    root: world.root,
    index,
    textOf: (path) => {
      const found = held.has(path) ? (held.get(path) ?? null) : world.textOf(path)
      return notText(found) ? null : found
    },
    under: (folder) => underOver(world.under(folder), said, folder),
    base: world.base,
    over,
    reaching: world.reaching,
  }
}

export type Kept = {
  readonly root: string
  readonly base: (path: string) => string | null
  readonly bodies: Map<string, Held | null>
  readonly held: Set<Stated>
  readonly settled: Map<string, Held | null>
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
  const fresh = kept.fresh
  const cast = shadowOnto(kept.reading, changeOver(kept.root, fresh, was))
  if ("refused" in cast) throw new Error(cast.refused)
  kept.reading = cast.reading
  kept.fresh = NOTHING_OVER
  for (const path of pathsIn(fresh)) {
    if (kept.bodies.has(path)) kept.settled.set(path, kept.bodies.get(path) ?? null)
  }
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
    bodies: new Map<string, Held | null>(),
    held: new Set<Stated>(),
    settled: new Map<string, Held | null>(),
    fresh: NOTHING_OVER,
    reading: null,
    over: NOTHING_OVER,
    index: null,
  }
  const asked = (): Answering => {
    if (kept.index === null) kept.index = settledIn(kept)
    return kept.index
  }
  return {
    kept,
    root,
    reaching,
    base: textOf,
    get index(): Answering {
      return asked()
    },
    get over(): Answer {
      return kept.over
    },
    textOf: (path) => {
      const held = kept.bodies.get(path)
      const found = held === undefined ? kept.base(path) : held
      return notText(found) ? null : found
    },
    under: (folder) => underOver(treeUnder(root, folder, asked()), kept.over, folder),
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
