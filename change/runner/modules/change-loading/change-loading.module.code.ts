import {
  type Answer,
  pathsIn,
  refusing,
  type Said,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { dropped } from "akasha/change/modules/edits-dropping/edits-dropping.module.code.ts"
import {
  changeOver,
  facingHeld,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  kindOf,
  pageKindOf,
} from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"
import {
  narrows,
  slugIn,
} from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import {
  type Held,
  heldOver,
  loadedOff,
} from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const CODE = "code"
const TS = "ts"
const RUN_CHANGE = "runChange"
const TAKES = "takes"
const PASSAGES = "passages"
const HELP_LINES = "help"
const SUBTYPE = "changeTargetSubtype"
const FILE = "file"
const PAGE = "page"
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

type Opening = (at: string) => Held

function openedOff(world: World): Opening {
  return (at) => loadedOff(world.root, sittingAt(world, at))
}

const CODE_PATH = /\.tsx?$/

function draftsCode(world: World): boolean {
  return pathsIn(world.over).some((one) => CODE_PATH.test(one))
}

function openedOver(world: World): Opening {
  const change = changeOver(world.root, world.over, world.base)
  return (at) => heldOver(change, sittingAt(world, at), null)
}

function namingNoPage(address: string): string {
  return `\`${address}\` names no page here, so no code is there to load`
}

export type Loaded = {
  readonly run: (world: World, given: unknown) => Said | Promise<Said>
  readonly takes?: readonly string[]
  readonly passages?: readonly string[]
  readonly help?: readonly string[]
}

const LOADED = new WeakMap<World, Map<string, Loaded>>()

function caught(at: string, loading: () => Loaded | string): Loaded | string {
  try {
    return loading()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return `\`${at}\` threw while its code loaded — ${why}`
  }
}

export async function loadedAt(world: World, at: string): Promise<Loaded | string> {
  return caught(at, () => loadingAt(world, at))
}

export async function loadedOver(world: World, at: string): Promise<Loaded | string> {
  if (!draftsCode(world)) return await loadedAt(world, at)
  return caught(at, () => loadingWith(world, at, openedOver(world)))
}

function loadingAt(world: World, at: string): Loaded | string {
  const held = LOADED.get(world)
  const before = held?.get(at)
  if (before !== undefined) return before
  const loaded = loadingWith(world, at, openedOff(world))
  if (typeof loaded === "string") return loaded
  if (held === undefined) LOADED.set(world, new Map([[at, loaded]]))
  else held.set(at, loaded)
  return loaded
}

function loadingWith(world: World, at: string, open: Opening): Loaded | string {
  const path = codeAt(world, at)
  if (path === null) return namingNoPage(at)
  const mod = open(path)
  const run = mod[RUN_CHANGE] ?? null
  if (typeof run !== "function") {
    return `\`${at}\` reaches no change exporting \`${RUN_CHANGE}\``
  }
  const stated = mod[TAKES] ?? null
  const takes = stated === null ? null : stringsIn(stated)
  const named = mod[PASSAGES] ?? null
  const passages = named === null ? null : stringsIn(named)
  const lines = stringsIn(mod[HELP_LINES] ?? null)
  return {
    run: run as (over: World, asked: unknown) => Said | Promise<Said>,
    ...(takes === null ? {} : { takes }),
    ...(passages === null ? {} : { passages }),
    ...(lines.length === 0 ? {} : { help: lines }),
  }
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
  loaded: Loaded
): readonly string[] {
  const named = `${calledAs} ${slug}`
  const head = definition === null ? [named, ""] : [named, "", definition, ""]
  const held = loaded.takes ?? []
  const taking = held.length === 0 ? [NO_TAKING] : [TAKING, "", ...held.map((one) => `  ${one}`)]
  const help = loaded.help ?? []
  return help.length === 0 ? [...head, ...taking] : [...head, ...taking, "", ...help]
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

type Judged = {
  readonly wanted: string
  readonly paged: boolean
}

const JUDGED = new WeakMap<World, Map<string, Judged | null>>()

function judgingOf(world: World, address: string): Judged | null {
  const wanted = subtypeIn(world, address)
  if (wanted === null) return null
  if (narrows(world, wanted, FILE)) return { wanted, paged: false }
  if (narrows(world, wanted, PAGE)) return { wanted, paged: true }
  return null
}

function judgedIn(world: World, address: string): Judged | null {
  const held = JUDGED.get(world)
  const before = held?.get(address)
  if (before !== undefined) return before
  const found = judgingOf(world, address)
  if (held === undefined) JUDGED.set(world, new Map([[address, found]]))
  else held.set(address, found)
  return found
}

export function targetRefusal(world: World, address: string, given: unknown): string | null {
  const judged = judgedIn(world, address)
  if (judged === null || judged.wanted === FILE) return null
  const at = targetIn(given)
  if (at === null) return null
  const kind = judged.paged ? pageKindOf(world, at) : kindOf(world, at)
  if (narrows(world, kind, judged.wanted)) return null
  return `\`${at}\` is a \`${kind}\`, and \`${address}\` acts on a \`${judged.wanted}\``
}

export async function runAt(world: World, at: string, given: unknown): Promise<Answer> {
  const loaded = await loadedAt(world, at)
  if (typeof loaded === "string") return refusing(loaded)
  const why = targetRefusal(world, at, given)
  if (why !== null) return refusing(why)
  return await ranBy(world, loaded, given, true)
}
