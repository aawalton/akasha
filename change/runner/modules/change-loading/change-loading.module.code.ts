import { join } from "node:path"
import {
  type Answer,
  refusing,
  type Said,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { dropped } from "akasha/change/modules/edits-dropping/edits-dropping.module.code.ts"
import { facingHeld, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { kindOf } from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"
import {
  narrows,
  slugIn,
} from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const CODE = "code"
const TS = "ts"
const RUN_CHANGE = "runChange"
const TAKES = "takes"
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

async function exportedFrom(world: World, at: string, named: string): Promise<unknown> {
  const held = (await import(join(world.root, sittingAt(world, at)))) as Record<string, unknown>
  return held[named] ?? null
}

function namingNoPage(address: string): string {
  return `\`${address}\` names no page here, so no code is there to load`
}

export type Loaded = {
  readonly run: (world: World, given: unknown) => Said | Promise<Said>
  readonly takes?: readonly string[]
}

const LOADED = new WeakMap<World, Map<string, Loaded>>()

export async function loadedAt(world: World, at: string): Promise<Loaded | string> {
  const held = LOADED.get(world)
  const before = held?.get(at)
  if (before !== undefined) return before
  const path = codeAt(world, at)
  if (path === null) return namingNoPage(at)
  const run = await exportedFrom(world, path, RUN_CHANGE)
  if (typeof run !== "function") {
    return `\`${at}\` reaches no change exporting \`${RUN_CHANGE}\``
  }
  const stated = await exportedFrom(world, path, TAKES)
  const takes = stated === null ? null : stringsIn(stated)
  const loaded: Loaded = {
    run: run as (over: World, asked: unknown) => Said | Promise<Said>,
    ...(takes === null ? {} : { takes }),
  }
  if (held === undefined) LOADED.set(world, new Map([[at, loaded]]))
  else held.set(at, loaded)
  return loaded
}

function untakenIn(given: unknown, takes: readonly string[] | undefined): string | null {
  if (takes === undefined || typeof given !== "object" || given === null) return null
  const said = Object.keys(given).find((key) => !takes.includes(key))
  return said === undefined ? null : untaken(said, takes)
}

const HELP = "--help"

const HELP_SHORT = "-h"

const TAKING = "It takes these arguments, piped in:"

const NO_TAKING = "It takes no argument."

export function helpAsked(said: string): boolean {
  const one = said.trim()
  return one === HELP || one === HELP_SHORT
}

export function takesSaid(slug: string, takes: readonly string[] | undefined): string {
  if (takes === undefined || takes.length === 0) return ""
  return ` — \`${slug}\` takes \`${takes.join("`, `")}\``
}

export function helpOfChange(
  calledAs: string,
  slug: string,
  definition: string | null,
  takes: readonly string[] | undefined
): readonly string[] {
  const named = `${calledAs} ${slug}`
  const head = definition === null ? [named, ""] : [named, "", definition, ""]
  const held = takes ?? []
  if (held.length === 0) return [...head, NO_TAKING]
  return [...head, TAKING, "", ...held.map((one) => `  ${one}`)]
}

export async function ranBy(
  world: World,
  loaded: Loaded,
  given: unknown,
  nested = false
): Promise<Answer> {
  if (nested) {
    return dropped(facingHeld(world), await loaded.run(world, given))
  }
  const untook = untakenIn(given, loaded.takes)
  if (untook !== null) return refusing(untook)
  const ran = await loaded.run(world, given)
  if (ran.refused !== null) return ran
  return dropped(facingHeld(world), ran)
}

function targetIn(given: unknown): string | null {
  if (typeof given !== "object" || given === null) return null
  const held = (given as Record<string, unknown>)[AT] ?? (given as Record<string, unknown>)[FROM]
  return typeof held === "string" ? held : null
}

function subtypeIn(world: World, address: string): string | null {
  const parts = partsOf(address)
  if (parts === null) return null
  const value = world.index.pageAt(parts[0], parts[1])
  if (value === null) return null
  const named = value[SUBTYPE]
  return typeof named === "string" ? slugIn(named) : null
}

const JUDGED = new WeakMap<World, Map<string, string | null>>()

function judgedIn(world: World, address: string): string | null {
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
  if (wanted === null || wanted === FILE) return null
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
