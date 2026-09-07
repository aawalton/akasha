import { join } from "node:path"
import { besideAt } from "@akasha/pages/page-file-name"
import { refusing, widened } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Said } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type { Guard } from "../../../modules/change-guarding/change-guarding.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import type { Changes } from "./change-running.change-runner.addressed.ts"

const CODE = "code"
const TS = "ts"
const GUARD_SLUGS = "guardSlugs"
const RUN_CHANGE = "runChange"
const RUN_GUARD = "runGuard"

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
  const moved = world.over.edits.find((one) => one.path === path && one.from !== undefined)
  return moved?.from ?? path
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
  const named = value === null ? null : value[GUARD_SLUGS]
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

export async function ranBy(world: World, loaded: Loaded, given: unknown): Promise<Answer> {
  const said = widened(await loaded.run(world, given), world.textOf)
  if (said.refused !== null) return said
  return guardedBy(world, said, loaded.guards)
}

export async function runAt(world: World, at: string, given: unknown): Promise<Answer> {
  const loaded = await loadedAt(world, at)
  if (typeof loaded === "string") return refusing(loaded)
  return await ranBy(world, loaded, given)
}

export async function runChange<K extends keyof Changes & string>(
  world: World,
  at: K,
  given: Changes[K]
): Promise<Answer> {
  return await runAt(world, at, given)
}
