import { join } from "node:path"
import { besideAt } from "@akasha/pages/page-file-name"
import { refusing } from "../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Said } from "../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../modules/change-guarding/change-guarding.module.code.ts"
import type { Guard } from "../../modules/change-guarding/change-guarding.module.types.ts"
import { type World, worldBefore } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { kindOf } from "../../modules/target-kinding/target-kinding.module.code.ts"
import { narrows, slugIn } from "../../modules/target-narrowing/target-narrowing.module.code.ts"

const CODE = "code"
const TS = "ts"
const GUARDS = "guards"
const RUN_CHANGE = "runChange"
const RUN_GUARD = "runGuard"
const SUBTYPE = "changeTargetSubtype"
const FILE = "file"
const AT = "at"
const FROM = "from"

export function partsOf(address: string): readonly [string, string] | null {
  const cut = address.indexOf("/")
  if (cut < 1 || cut === address.length - 1) return null
  return [address.slice(0, cut), address.slice(cut + 1)]
}

export function codeAt(world: World, address: string): string | null {
  const parts = partsOf(address)
  if (parts === null) return null
  const listed = world.index.listedAt(parts[0], parts[1])[0]
  if (listed === undefined) return null
  return besideAt(sittingAt(world, listed.path), CODE, TS)
}

export function sittingAt(world: World, path: string): string {
  for (const one of world.over.edits) {
    if (one.kind === "move" && one.pathTo === path) return one.pathFrom
  }
  return path
}

async function exportedAt(world: World, address: string, named: string): Promise<unknown> {
  const at = codeAt(world, address)
  if (at === null) return null
  const held = (await import(join(world.root, sittingAt(world, at)))) as Record<string, unknown>
  return held[named] ?? null
}

export function guardSlugsIn(world: World, address: string): readonly string[] {
  const parts = partsOf(address)
  if (parts === null) return []
  const value = world.index.pageAt(parts[0], parts[1])
  if (value === null) return []
  const named = value[GUARDS]
  return Array.isArray(named) ? named.filter((one) => typeof one === "string") : []
}

async function guardsIn(world: World, address: string): Promise<readonly Guard[] | string> {
  const found: Guard[] = []
  for (const slug of guardSlugsIn(world, address)) {
    const held = await exportedAt(world, slug, RUN_GUARD)
    if (typeof held !== "function") {
      return `\`${slug}\` names no guard exporting \`${RUN_GUARD}\`, so the change is not run`
    }
    found.push(held as Guard)
  }
  return found
}

export type Loaded = {
  readonly run: (world: World, given: unknown) => Said | Promise<Said>
  readonly guards: readonly Guard[]
}

const LOADED = new WeakMap<World, Map<string, Loaded>>()

export async function loadedAt(world: World, at: string): Promise<Loaded | string> {
  const held = LOADED.get(world)
  const before = held?.get(at)
  if (before !== undefined) return before
  const run = await exportedAt(world, at, RUN_CHANGE)
  if (typeof run !== "function") {
    return `\`${at}\` reaches no change exporting \`${RUN_CHANGE}\``
  }
  const guards = await guardsIn(world, at)
  if (typeof guards === "string") return guards
  const loaded: Loaded = {
    run: run as (over: World, asked: unknown) => Said | Promise<Said>,
    guards,
  }
  if (held === undefined) LOADED.set(world, new Map([[at, loaded]]))
  else held.set(at, loaded)
  return loaded
}

const REACHED = new WeakMap<World, Guard[]>()

function reachedBy(world: World, guards: readonly Guard[]): undefined {
  if (guards.length === 0) return undefined
  const held = REACHED.get(world)
  if (held === undefined) REACHED.set(world, [...guards])
  else held.push(...guards)
}

export function guardsOver(world: World, guards: readonly Guard[]): readonly Guard[] {
  return [...new Set([...guards, ...(REACHED.get(world) ?? [])])]
}

export async function ranBy(
  world: World,
  loaded: Loaded,
  given: unknown,
  nested = false
): Promise<Answer> {
  if (nested) {
    reachedBy(world, loaded.guards)
    return await loaded.run(world, given)
  }
  const before = worldBefore(world)
  const said = await loaded.run(world, given)
  if (said.refused !== null) return said
  return guardedBy(world, said, guardsOver(world, loaded.guards), before)
}

export function targetIn(given: unknown): string | null {
  if (typeof given !== "object" || given === null) return null
  const held = (given as Record<string, unknown>)[AT] ?? (given as Record<string, unknown>)[FROM]
  return typeof held === "string" ? held : null
}

export function subtypeIn(world: World, address: string): string | null {
  const parts = partsOf(address)
  if (parts === null) return null
  const value = world.index.pageAt(parts[0], parts[1])
  if (value === null) return null
  const named = value[SUBTYPE]
  return typeof named === "string" ? slugIn(named) : null
}

const JUDGED = new WeakMap<World, Map<string, string | null>>()

export function judgedIn(world: World, address: string): string | null {
  const held = JUDGED.get(world)
  const before = held?.get(address)
  if (before !== undefined) return before
  const wanted = subtypeIn(world, address)
  const found = wanted !== null && narrows(world, wanted, FILE) ? wanted : null
  if (held === undefined) JUDGED.set(world, new Map([[address, found]]))
  else held.set(address, found)
  return found
}

export function targetRefusal(world: World, address: string, given: unknown): string | null {
  const wanted = judgedIn(world, address)
  if (wanted === null) return null
  const at = targetIn(given)
  if (at === null) return null
  const kind = kindOf(world, at)
  if (narrows(world, kind, wanted)) return null
  return `\`${at}\` is a \`${kind}\`, and \`${address}\` acts on a \`${wanted}\``
}

export async function runAt(world: World, at: string, given: unknown): Promise<Answer> {
  const loaded = await loadedAt(world, at)
  if (typeof loaded === "string") return refusing(loaded)
  const why = targetRefusal(world, at, given)
  if (why !== null) return refusing(why)
  return await ranBy(world, loaded, given, true)
}
