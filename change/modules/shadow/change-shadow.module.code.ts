import {
  type Answer,
  type Bodies,
  type BodyOf,
  type FileChange,
  gathered,
  type Held,
  notText,
  pathsIn,
  type Replayed,
  refusing,
  replayed,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  type Naming,
  namesOver,
  treeTracked,
  treeUnder,
  treeUnentered,
} from "akasha/change/modules/shadow-tree/change-shadow-tree.module.code.ts"
import type { Changes as AgentChanges } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"
import type { Changes as MechanicalChanges } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.addressed.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  type Facing,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  forgotten,
  type Made,
  type Remembered,
  remembered,
  type Shadow,
  shadowAsked,
  shadowAt,
  shadowOnto,
} from "akasha/page/modules/shadow/shadow.module.code.ts"

const BYTES = new TextEncoder()

const TEXT = new TextDecoder()

const PAGE_TYPE = "page-type"

const PROPERTY = "-property"

const TYPE_STATED = /^\s*type: "([^"]*)"/m

const TYPE_SLUG_STATED = /^\s*pageTypeSlug: "([^"]*)"/m

export type Reaching = (world: World, at: string, given: unknown) => Promise<Answer>

export type World = {
  readonly root: string
  readonly index: Answering
  readonly textOf: (path: string) => string | null
  readonly bodyOf: BodyOf
  readonly under: (folder: string) => readonly string[]
  readonly unentered?: (folder: string) => readonly string[]
  readonly tracked?: (folder: string) => readonly string[] | null
  readonly names?: Naming
  readonly base: BodyOf
  readonly over: Answer
  readonly reaching?: Reaching
}

function facingIn(world: World): Facing {
  return {
    kindsUnder: (of) => world.index.kindsUnder(of),
    everyOfType: (kind) => world.index.everyOfType(kind),
    valueAt: (path) => world.index.pageByPath(path),
    carryingOf: (named) => world.index.carryingOf(named),
    root: world.root,
    holds: (path) => world.textOf(path) !== null,
  }
}

const FACING = new WeakMap<World, Facing>()

export function typeIn(text: string): string | null {
  const said = TYPE_STATED.exec(text) ?? TYPE_SLUG_STATED.exec(text)
  return said?.[1] ?? null
}

export function turnsGenerated(one: FileChange, was: string | null, now: string | null): boolean {
  if (one.kind !== "replace") return true
  const named = partedIn(one.path)
  if (named === null) return true
  if (named.pageType === PAGE_TYPE || named.pageType.endsWith(PROPERTY)) return true
  return was !== now
}

function typedIn(world: World, path: string): string | null {
  const text = world.textOf(path)
  return text === null ? null : typeIn(text)
}

export function facingHeld(world: World): Facing {
  const found = FACING.get(world)
  if (found !== undefined) return found
  const made = facingIn(world)
  FACING.set(world, made)
  return made
}

export const NOTHING_OVER: Answer = { edits: [], refused: null }

const REACHES_NOTHING: Reaching = (_world, at) =>
  Promise.resolve(refusing(`\`${at}\` is reached by no runner, so no change was run`))

export type Reaches = keyof AgentChanges | keyof MechanicalChanges

export type Reached = {
  readonly said: Answer
  readonly world: World
}

export function carrying(world: World, said: Answer): World {
  return isLedger(world) ? addedTo(world, said) : worldOver(world, said)
}

function tidied(world: World, path: string): World {
  const was = world.textOf(path)
  if (was === null) return world
  const now = TEXT.decode(formattedBody(world.root, path, BYTES.encode(was)).body)
  if (now === was) return world
  const said: Answer = {
    edits: [{ kind: "replace", path, contentFrom: was, contentTo: now }],
    refused: null,
  }
  return carrying(world, said)
}

function withheld(world: World, facing: Facing, said: Answer): Reached {
  const held: FileChange[] = []
  const sown: string[] = []
  for (const one of said.edits) {
    if (one.kind !== "replace" && one.kind !== "append") held.push(one)
    else if (generatedIn(facing, one.path)) sown.push(one.path)
    else held.push(one)
  }
  if (sown.length === 0) return { said, world }
  let seen = world
  for (const path of sown) seen = tidied(seen, path)
  return { said: { edits: held, refused: null }, world: seen }
}

export async function reach(world: World, at: Reaches, given: unknown): Promise<Reached> {
  const facing = facingHeld(world)
  const said = await (world.reaching ?? REACHES_NOTHING)(world, at, given)
  if (said.refused !== null) return { said, world }
  const was = new Map<string, string | null>()
  for (const one of said.edits) {
    if (one.kind === "replace") was.set(one.path, typedIn(world, one.path))
  }
  try {
    const over = carrying(world, said)
    const turns = said.edits.some((one) => {
      if (one.kind !== "replace") return true
      return turnsGenerated(one, was.get(one.path) ?? null, typedIn(over, one.path))
    })
    if (turns) FACING.delete(world)
    return withheld(over, turns ? facingHeld(over) : facing, said)
  } catch (cause) {
    return { said: refusing(cause instanceof Error ? cause.message : String(cause)), world }
  }
}

export function holdingIn(world: World): (path: string) => boolean {
  return (path) => world.textOf(path) !== null
}

function bytesOf(body: Held | null): Uint8Array | null {
  return body === null || notText(body) ? null : BYTES.encode(body)
}

function narrowed(bodyOf: BodyOf): (path: string) => string | null {
  return (path) => {
    const held = bodyOf(path)
    return held === null || notText(held) ? null : held
  }
}

function replayedOver(said: Answer, bodyOf: BodyOf): Replayed {
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
    under: (folder) => treeUnder(root, folder, index, NOTHING_OVER),
    unentered: (folder) => treeUnentered(root, folder, index, NOTHING_OVER),
    tracked: (folder) => treeTracked(root, folder, NOTHING_OVER),
    names: namesOver(root, NOTHING_OVER),
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
    under: (folder) => treeUnder(world.root, folder, index, over),
    unentered: (folder) => treeUnentered(world.root, folder, index, over),
    tracked: (folder) => treeTracked(world.root, folder, over),
    names: namesOver(world.root, over),
    base: world.base,
    over,
    reaching: world.reaching,
  }
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
  naming: Naming | null
  shadow: Shadow | null
}

export type Ledger = World & { readonly kept: Kept }

export function isLedger(world: World): world is Ledger {
  return "kept" in world
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
    naming: null,
    shadow: null,
  }
  const asked = (): Answering => {
    if (kept.index === null) kept.index = settledIn(kept)
    return kept.index
  }
  const naming = (): Naming => {
    if (kept.naming === null) kept.naming = namesOver(root, kept.over)
    return kept.naming
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
    under: (folder) => treeUnder(root, folder, asked(), kept.over),
    unentered: (folder) => treeUnentered(root, folder, asked(), kept.over),
    tracked: (folder) => treeTracked(root, folder, kept.over),
    names: (path) => naming()(path),
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
  const bodies = replayed(adding, ledger.bodyOf)
  if ("refused" in bodies) throw new Error(bodies.refused)
  for (const [path, body] of bodies) kept.bodies.set(path, body)
  forgotten(kept.remembered, bodies.keys())
  for (const one of fresh) kept.held.add(one)
  kept.over = over
  kept.fresh = settling
  kept.naming = null
  kept.shadow = null
  kept.index = null
  return ledger
}
