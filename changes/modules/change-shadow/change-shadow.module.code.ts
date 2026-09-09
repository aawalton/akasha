import { existsSync } from "node:fs"
import { join, relative } from "node:path"
import type { Change } from "../../../pages/change/change.module.code.ts"
import type { Answering } from "../../../pages/indexes/answering/index-answering.module.code.ts"
import type { Reading } from "../../../pages/indexes/shape/index-shape.module.code.ts"
import { walkedUnder } from "../../../pages/indexes/tree-reading/tree-reading.module.code.ts"
import {
  type Cast,
  forgotten,
  type Made,
  type Remembered,
  remembered,
  type Shadow,
  shadowAsked,
  shadowAt,
  shadowFor,
  shadowOnto,
} from "../../../pages/shadow/shadow.module.code.ts"
import type { Changes as AgentChanges } from "../../runners/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"
import type { Changes as MechanicalChanges } from "../../runners/pages/mechanical-change-running/mechanical-change-running.change-runner.addressed.ts"

import {
  type BodyOf,
  beyond,
  gathered,
  notText,
  pathsIn,
  refusing,
  replayed,
} from "../answer/change-answer.module.code.ts"
import type {
  Answer,
  Bodies,
  FileChange,
  Held,
  Replayed,
} from "../answer/change-answer.module.types.ts"

const BYTES = new TextEncoder()

const OUTSIDE = ".."

export type Reaching = (world: World, at: string, given: unknown) => Promise<Answer>

export type World = {
  readonly root: string
  readonly index: Answering
  readonly textOf: (path: string) => string | null
  readonly bodyOf: BodyOf
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

export function narrowed(bodyOf: BodyOf): (path: string) => string | null {
  return (path) => {
    const held = bodyOf(path)
    return held === null || notText(held) ? null : held
  }
}

export function replayedOver(said: Answer, bodyOf: BodyOf): Replayed {
  const held = replayed(said, bodyOf)
  if ("refused" in held) throw new Error(held.refused)
  return held
}

export function bodiesIn(said: Answer, textOf: BodyOf): Bodies {
  const found = new Map<string, string | null>()
  for (const [path, body] of replayedOver(said, textOf)) {
    found.set(path, notText(body) ? null : body)
  }
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
  bodyOf: BodyOf,
  reaching: Reaching = REACHES_NOTHING,
  textOf: (path: string) => string | null = narrowed(bodyOf)
): World {
  const index = shadowAt(root).index
  return {
    root,
    index,
    textOf,
    bodyOf,
    under: (folder) => treeUnder(root, folder, index),
    base: bodyOf,
    over: NOTHING_OVER,
    reaching,
  }
}

export function worldOver(world: World, said: Answer): World {
  const held = replayedOver(said, world.bodyOf)
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
    bodyOf: (path) => (held.has(path) ? (held.get(path) ?? null) : world.bodyOf(path)),
    under: (folder) => underOver(world.under(folder), said, folder),
    base: world.base,
    over,
    reaching: world.reaching,
  }
}

export type Peeked = {
  readonly said: Answer
  readonly was: Answer
  readonly reading: Reading | null
  readonly made: Made
}

export type Kept = {
  readonly root: string
  readonly base: BodyOf
  readonly bodies: Map<string, Held | null>
  readonly held: Set<FileChange>
  readonly settled: Map<string, Held | null>
  readonly remembered: Remembered
  fresh: Answer
  reading: Reading | null
  over: Answer
  index: Answering | null
  shadow: Shadow | null
  peeked: Peeked | null
}

export type Ledger = World & { readonly kept: Kept }

export function isLedger(world: World): world is Ledger {
  return "kept" in world
}

export function worldBefore(world: World): World {
  if (!isLedger(world)) return world
  const kept = world.kept
  const bodies = new Map(kept.bodies)
  const index = world.index
  const bodyOf: BodyOf = (path) => (bodies.has(path) ? (bodies.get(path) ?? null) : kept.base(path))
  return {
    root: world.root,
    index,
    textOf: narrowed(bodyOf),
    bodyOf,
    under: world.under,
    base: kept.base,
    over: kept.over,
    reaching: world.reaching,
  }
}

function beforeIn(kept: Kept): BodyOf {
  return (path) => (kept.settled.has(path) ? (kept.settled.get(path) ?? null) : kept.base(path))
}

function landedIn(kept: Kept, fresh: Answer, made: Made): Shadow {
  kept.reading = made.reading
  kept.fresh = NOTHING_OVER
  for (const path of pathsIn(fresh)) {
    if (kept.bodies.has(path)) kept.settled.set(path, kept.bodies.get(path) ?? null)
  }
  forgotten(kept.remembered, pathsIn(fresh))
  kept.shadow = made.shadow
  return made.shadow
}

function settledIn(kept: Kept): Answering {
  if (kept.reading === null && kept.fresh.edits.length === 0) {
    kept.shadow = shadowAt(kept.root)
    return kept.shadow.index
  }
  const fresh = kept.fresh
  const cast = shadowOnto(
    kept.reading,
    changeOver(kept.root, fresh, beforeIn(kept)),
    kept.remembered
  )
  if ("refused" in cast) throw new Error(cast.refused)
  return landedIn(kept, fresh, cast).index
}

export function ledgerAt(
  root: string,
  bodyOf: BodyOf,
  reaching: Reaching = REACHES_NOTHING,
  textOf: (path: string) => string | null = narrowed(bodyOf)
): Ledger {
  const kept: Kept = {
    root,
    base: bodyOf,
    bodies: new Map<string, Held | null>(),
    held: new Set<FileChange>(),
    settled: new Map<string, Held | null>(),
    remembered: remembered(),
    fresh: NOTHING_OVER,
    reading: null,
    over: NOTHING_OVER,
    index: null,
    shadow: null,
    peeked: null,
  }
  const asked = (): Answering => {
    if (kept.index === null) kept.index = settledIn(kept)
    return kept.index
  }
  return {
    kept,
    root,
    reaching,
    base: bodyOf,
    get index(): Answering {
      return asked()
    },
    get over(): Answer {
      return kept.over
    },
    textOf: (path) => {
      const held = kept.bodies.get(path)
      if (held === undefined) return textOf(path)
      return notText(held) ? null : held
    },
    bodyOf: (path) => {
      const held = kept.bodies.get(path)
      return held === undefined ? kept.base(path) : held
    },
    under: (folder) => underOver(treeUnder(root, folder, asked()), kept.over, folder),
  }
}

function alreadyPeeked(kept: Kept, said: Answer): Made | null {
  const peeked = kept.peeked
  if (peeked === null || peeked.said !== said) return null
  if (peeked.was !== kept.fresh || peeked.reading !== kept.reading) return null
  return peeked.made
}

export function addedTo(ledger: Ledger, said: Answer): Ledger {
  const kept = ledger.kept
  const landing = alreadyPeeked(kept, said)
  kept.peeked = null
  const fresh = said.edits.filter((one) => !kept.held.has(one))
  if (fresh.length === 0) {
    if (landing !== null) kept.index = landedIn(kept, kept.fresh, landing).index
    return ledger
  }
  const adding: Answer = { edits: fresh, refused: null }
  const over = gathered([kept.over, adding])
  if (over.refused !== null) throw new Error(over.refused)
  const settling = gathered([kept.fresh, adding])
  if (settling.refused !== null) throw new Error(settling.refused)
  const bodies = replayed(adding, ledger.bodyOf)
  if ("refused" in bodies) throw new Error(bodies.refused)
  for (const [path, body] of bodies) kept.bodies.set(path, body)
  forgotten(kept.remembered, bodies.keys())
  for (const one of fresh) kept.held.add(one)
  kept.over = over
  kept.fresh = settling
  kept.shadow = null
  kept.index = landing === null ? null : landedIn(kept, settling, landing).index
  return ledger
}

export type Casting = {
  readonly whole: Answer
  readonly base: BodyOf
  readonly cast: () => Shadow | { readonly refused: string }
}

function peekedOn(kept: Kept, said: Answer, whole: Answer): Shadow | { readonly refused: string } {
  const shadow = kept.shadow
  if (whole.edits.length === 0 && kept.index !== null && shadow !== null) return shadow
  const made = shadowOnto(
    kept.reading,
    changeOver(kept.root, whole, beforeIn(kept)),
    kept.remembered
  )
  if ("refused" in made) return made
  kept.peeked = { said, was: kept.fresh, reading: kept.reading, made }
  return made.shadow
}

export function castingOn(world: World, said: Answer): Casting {
  if (isLedger(world)) {
    const kept = world.kept
    const whole = gathered([kept.fresh, beyond(kept.over, said)])
    return { whole, base: beforeIn(kept), cast: () => peekedOn(kept, said, whole) }
  }
  const whole = gathered([world.over, beyond(world.over, said)])
  const cast = (): Shadow | { readonly refused: string } => {
    const made = shadowOver(world.root, whole, world.base)
    return "refused" in made ? made : made.shadow
  }
  return { whole, base: world.base, cast }
}
