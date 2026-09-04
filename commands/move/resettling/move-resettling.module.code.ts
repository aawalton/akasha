import type { Dirent } from "node:fs"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { counted } from "../../../command-system/asking/asking.module.code.ts"
import type { Placed } from "../../../command-system/outside-naming/outside-naming.module.code.ts"
import {
  boundedAt,
  splicedOver,
} from "../../../command-system/outside-naming/outside-naming.module.code.ts"

export const STEM = "agent-settings-"

export const TAIL = ".json"

const FLAG = "--settings"

const JOINED = `${FLAG}=`

const PROC = "/proc"

const CMDLINE = "cmdline"

const NUMBERED = /^\d+$/

const PARTED_BY = "/"

const HOME_SPELT = ["$HOME", "${HOME}", "~"] as const

export const SETTLING_SPELLING =
  "a settings document is rewritten where it spells a path that moved under a spelling of this " +
  "repository's root, and is looked for in the folder a live seat's own command line names one in"

export type Unwritten = { readonly path: string; readonly why: string }

export type Resettled = {
  readonly rewritten: readonly string[]
  readonly unchanged: readonly string[]
  readonly unwritten: readonly Unwritten[]
}

export function settlingNamed(path: string): boolean {
  const name = basename(path)
  return name.startsWith(STEM) && name.endsWith(TAIL) && name.length > STEM.length + TAIL.length
}

export function rootSpelt(root: string, home: string | undefined): readonly string[] {
  const spelt = [root]
  if (home !== undefined && home !== "" && root.startsWith(`${home}${PARTED_BY}`)) {
    const under = root.slice(home.length + 1)
    for (const said of HOME_SPELT) spelt.push(`${said}${PARTED_BY}${under}`)
  }
  return [...new Set(spelt)]
}

export function namedUnder(
  text: string,
  spelt: readonly string[],
  moved: ReadonlyMap<string, string>
): readonly Placed[] {
  const found: Placed[] = []
  for (const one of spelt) {
    for (const [from, to] of moved) {
      const was = `${one}${PARTED_BY}${from}`
      const now = `${one}${PARTED_BY}${to}`
      for (let at = text.indexOf(was); at >= 0; at = text.indexOf(was, at + 1)) {
        if (boundedAt(text, at, was)) found.push({ at, was, now })
      }
    }
  }
  return found
}

export function resettledText(
  text: string,
  spelt: readonly string[],
  moved: ReadonlyMap<string, string>
): string {
  return splicedOver(text, namedUnder(text, spelt, moved))
}

export function settlingIn(argv: readonly string[]): string | null {
  const at = argv.indexOf(FLAG)
  const after = at === -1 ? undefined : argv[at + 1]
  if (after !== undefined && after !== "") return after
  const joined = argv.find((one) => one.startsWith(JOINED) && one.length > JOINED.length)
  return joined === undefined ? null : joined.slice(JOINED.length)
}

export function settlingsHeld(proc: string = PROC): readonly string[] {
  const found = new Set<string>()
  let held: readonly string[]
  try {
    held = readdirSync(proc)
  } catch {
    return []
  }
  for (const one of held) {
    if (!NUMBERED.test(one)) continue
    let argv: readonly string[]
    try {
      argv = readFileSync(join(proc, one, CMDLINE), "utf8").split("\0")
    } catch {
      continue
    }
    const named = settlingIn(argv)
    if (named !== null && settlingNamed(named)) found.add(named)
  }
  return [...found].sort()
}

export function foldersOf(held: readonly string[]): readonly string[] {
  return [...new Set(held.map(dirname))].sort()
}

export function settlingsUnder(under: string): readonly string[] {
  let held: readonly Dirent[]
  try {
    held = readdirSync(under, { withFileTypes: true })
  } catch {
    return []
  }
  return held
    .filter((one) => one.isFile() && settlingNamed(one.name))
    .map((one) => join(under, one.name))
    .sort()
}

function whyOf(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause)
}

export function resettleOver(
  root: string,
  moved: ReadonlyMap<string, string>,
  writing: boolean,
  opts?: { readonly held?: readonly string[]; readonly home?: string }
): Resettled {
  const spelt = rootSpelt(root, opts?.home ?? process.env.HOME)
  const rewritten: string[] = []
  const unchanged: string[] = []
  const unwritten: Unwritten[] = []
  const looked = foldersOf(opts?.held ?? settlingsHeld()).flatMap(settlingsUnder)
  for (const path of [...new Set(looked)].sort()) {
    let was: string
    try {
      was = readFileSync(path, "utf8")
    } catch (cause) {
      unwritten.push({ path, why: whyOf(cause) })
      continue
    }
    const text = resettledText(was, spelt, moved)
    if (text === was) {
      unchanged.push(path)
      continue
    }
    if (!writing) {
      rewritten.push(path)
      continue
    }
    try {
      writeFileSync(path, text)
    } catch (cause) {
      unwritten.push({ path, why: whyOf(cause) })
      continue
    }
    rewritten.push(path)
  }
  return { rewritten, unchanged, unwritten }
}

export function resettledSaid(
  resettled: Resettled,
  held: readonly string[],
  dry: boolean
): readonly string[] {
  const said: string[] = []
  if (resettled.rewritten.length === 0) {
    said.push("no agent settings document named what moved")
  } else {
    const live = resettled.rewritten.filter((one) => held.includes(one))
    said.push(
      `${counted(resettled.rewritten.length, "agent settings document")} named what moved and ` +
        `${dry ? "would be" : "was"} rewritten — ${resettled.rewritten.join(", ")}`
    )
    said.push(
      live.length === 0
        ? "no running process names any of them, so no seat is watching one"
        : `${counted(live.length, "of them")} named by a running process — ${live.join(", ")}`
    )
  }
  for (const one of resettled.unwritten) {
    said.push(
      `${one.path} is an agent settings document this could not rewrite, so a seat watching it ` +
        `keeps the paths it had and needs relaunching — ${one.why}`
    )
  }
  said.push(SETTLING_SPELLING)
  return said
}

export function resettlingSaid(
  root: string,
  moved: ReadonlyMap<string, string>,
  writing: boolean
): readonly string[] {
  const held = settlingsHeld()
  return resettledSaid(resettleOver(root, moved, writing, { held }), held, !writing)
}
