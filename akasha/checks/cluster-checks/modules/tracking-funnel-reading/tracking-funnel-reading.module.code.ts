import { type Dirent, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  DAILY_TRACKING,
  SESSION_TRACKING,
} from "../../../../alan/tracking/daily/day-place/day-place.module.code.ts"

/**
 * The population: every TypeScript file in the repository outside `akasha/`.
 *
 * This was `tools/` and before that three folders. Both were the same defect at different sizes —
 * a tree named by hand is a tree that cannot tell you what it left out, and twice now the reach
 * that mattered was sitting in the part nobody had named. `readouts/surplus-reading.ts` reached
 * the store one hop away and was outside the scan; a lane repairing the points recompute found
 * `collections/exercises` reaching the wrong client for the same family, also outside it. A list
 * of trees re-creates that fault every time a tree is added, and says nothing when it does.
 *
 * So the population is derived rather than declared: walk the checkout, and name only what is NOT
 * in it. Widening was measured before it was taken. The same run over `tools/` alone, over
 * `tools readouts collections services shared`, and over the whole checkout outside `akasha/`
 * returns the same findings — 1801, 2110 and 7328 weighed, one finding in each of the wider two.
 * Nothing was manufactured by the width, which is the failure this could have had: `typecheck-repo`
 * reports 2660 errors of which 12 are real, purely because it gathered every file into one scope.
 * The width here costs 0.7s and no false positive, because the precision lives in the join below
 * rather than in the boundary.
 *
 * `akasha/` is left out for a reason that is structural rather than convenient: an akasha file
 * imports no file outside the akasha folder, so it cannot import the funnel at all. The remedy
 * every finding here names — ask through `tools/lib/tracking/day-place.ts` — is impossible there,
 * and a check that refuses with a fix nobody can take is a check that gets exempted into silence.
 * akasha's own gate governs akasha. Its files are still READ, because a name can travel out of
 * them into a file that is in the population; they are just never findings themselves.
 */
export const NOT_WEIGHED_TREES = ["akasha"] as const

export const POPULATION_SAID = "the checkout outside akasha/"

/**
 * The folders whose files may not spell a day page type at all, even where they touch no store.
 *
 * This is the older and stricter of the two rules, and it is kept exactly as it was. Widening it
 * to the tree would be worse than useless: the folder `tools/lib/daily-tracking` and its four
 * siblings are themselves named `daily-tracking`, one module holds `WRITER = "daily-tracking"` as
 * a git identity, and the reference key a session row carries to name its day is also spelled
 * `daily-tracking`. Roughly nine in ten of the literals under `tools/` are one of those. Inside
 * the funnel's own folders the literal means what the rule says it means; outside them the reach
 * rule below carries the weight, and it is precise because it asks what the file does as well.
 */
export const FUNNEL_DIRS = ["tools/lib/tracking", "tools/commands/tracking"] as const

/**
 * The files permitted to reach the page store while naming a day.
 *
 * `day-place.ts` is the funnel. `activities.ts` and `email-entry.ts` write pages that are not days,
 * so they reach the page store without deciding where a day is kept.
 *
 * These are also the nodes NEITHER closure travels through. Importing `day-place.ts` is the thing
 * every caller is supposed to do, so if the funnel counted as a road to the store then asking the
 * funnel would itself be the finding, and `tools/lib/wake-day.ts` — which asks `derivedDayOf`
 * exactly as it should — would be refused for it. The same holds of the name: the funnel spells
 * both page types, so a naming closure that travelled through it would make a namer of every
 * caller the funnel has, which is the whole point of having one.
 */
export const ALLOWED_TO_REACH = [] as const

/**
 * The scanner itself, which spells every verb and page type below as a literal.
 *
 * It used to be kept out of the population by living outside the three scanned folders. Now that
 * the population is the checkout it has to be named, or it is the first thing it refuses.
 *
 * One entry, because the command half moved into
 * `akasha/checks/cluster-checks/pages/tracking-funnel/`, and `akasha` is held out of the
 * population above. The path this list carried for it, `tools/commands/audit/tracking-funnel.ts`,
 * was on no disk: an exemption naming a file nobody has exempts nothing, and reads as coverage.
 */
export const THE_SCANNER = ["tools/lib/tracking-funnel.ts"] as const

/** Verbs of the page store that put something into it. */
export const WRITE_VERBS = [
  "pageLanding",
  "patchPage",
  "rowLanding",
  "rowsLanding",
  "removeRow",
  "writePage",
  "patchState",
  "writeFiles",
] as const

/**
 * Verbs of the page store that take something out of it.
 *
 * These were absent, and their absence is why the audit had never once reported a finding: it
 * looked only for writes, so every read of a day around the funnel was invisible to it. A read is
 * the same fault as a write. The query engine answers out of the markdown half; once a day moves,
 * an unfunnelled read answers that the day is empty and raises nothing — `tools/commands/tracking/
 * edit.ts` would report "session not found", which is a wrong statement rather than a refusal.
 */
export const READ_VERBS = ["askComposed", "askTaking", "askingFor", "readFiles"] as const

export const STORE_VERBS = [...WRITE_VERBS, ...READ_VERBS] as const

/**
 * Every module that is the page store, whatever name it answers to.
 *
 * The old scan knew one road, `page-query-client.ts`, and there are four. Two of the four have
 * since moved into `@akasha/markdown-pages` and are named here by the file each export resolves
 * to, which is what `isClientRoad` compares against.
 *
 * A barrel re-export is what a package entry defeats. `tools/lib/daily-tracking/
 * tracking-modules.ts` once handed out `askComposed` from `@shared/pages-query/ask` under the
 * same name the local client uses, and no search for that package named any of the six
 * permanently-refusing calls behind it; the same shape then hid two of the loudest reads of a day
 * from this audit. That re-export is gone, and `@shared/pages-query` named no installed package
 * and no import anywhere in the tree, so it came off the list below.
 */
export const CLIENT_ROADS = [
  "tools/lib/page-query-client.ts",
  "tools/lib/page-query-landing.ts",
  "akasha/markdown-pages/markdown-page-write/markdown-page-write.module.code.ts",
  "akasha/markdown-pages/markdown-page-rows-write/markdown-page-rows-write.module.code.ts",
] as const

export const CLIENT_PACKAGES = ["@akasha/pages-system-service"] as const

export const NAMES_THE_FUNNEL = "akasha/alan/tracking/daily/day-place/day-place.module.code.ts"

/** The names the funnel exports for the two day page types. */
export const DAY_CONSTANTS = ["DAILY_TRACKING", "SESSION_TRACKING"] as const

/**
 * Bindings that spell a day page type meaning something that is not a page type.
 *
 * This is the boundary the naming closure needs, and it was found by building the closure without
 * one. `tools/lib/daily-tracking/tracking-modules.ts` holds `export const WRITER = "daily-tracking"`
 * — the git author a points write is landed under, not a page type. It is a barrel that most of
 * `tools/lib/daily-tracking` imports, so travelling the name out of it made namers of 167 files
 * under `tools/` where the honest count is 21, and turned a 1-finding run into a 77-finding one.
 * Every one of the 76 was `WRITER`.
 *
 * A boundary this narrow is worth more than a weaker rule. The alternative — bounding the closure
 * by depth, or refusing to travel through barrels — throws away the two escapes this rule exists
 * to catch, both of which are exactly one hop through a barrel-shaped module.
 */
export const NOT_A_DAY_NAME = ["WRITER"] as const

const TS = [".ts", ".tsx"] as const

const TEST_TS = [".test.ts", ".test.tsx"] as const

const DECLARATION_TS = ".d.ts"

/**
 * `dist` and `build` hold compiled output of files already in the population, so weighing them
 * counts one reach twice and reports a finding at a path nobody can edit.
 */
const NOT_WALKED: ReadonlySet<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
])

/** `import { a, b } from "./x.ts"`, `export { a } from "./x.ts"`, and their `type` forms. */
const NAMED_IMPORT = /(?:import|export)\s+(type\s+)?\{([^}]*)\}\s*from\s*"([^"]+)"/g

/** `import * as x from "./y.ts"` — which bindings are taken cannot be read off it. */
const STAR_IMPORT = /(?:import|export)\s+(?:type\s+)?\*(?:\s+as\s+\w+)?\s*from\s*"([^"]+)"/g

/**
 * `await import("./x.ts")` — nor off this.
 *
 * `typeof import("./x.ts")` is held out, because it is a type and reaches nothing at run time.
 * Measured across the checkout: 78 such edges in 12 files, and 54 of them name a target the same
 * file never imports at run time, so counting them invents an edge that is there in no program.
 * Most are `.d.ts` declarations, which the graph reads even though nothing weighs them.
 *
 * An over-count here is not free: both halves of a finding are closures, so one wrong road travels
 * to everything importing the file it was invented in.
 */
const DYNAMIC_IMPORT = /(?<!\btypeof\s{1,8})\bimport\s*\(\s*"([^"]+)"\s*\)/g

/** `export const NAME = ...`, whose right-hand side is where a day page type is held. */
const EXPORTED_CONST = /export\s+const\s+(\w+)\s*(?::[^=\n]*)?=\s*([^\n]*)/g

/**
 * A backtick is not one of these on purpose.
 *
 * Every doc comment in this tree writes a code span in backticks, so `` `daily-tracking` `` in
 * prose is the commonest spelling of the slug there is. Counting it flagged
 * `tools/lib/tracking/akasha-day.ts:83` and `tools/lib/daily-tracking/value-points.ts:108`, both of
 * which only talk about a day. Every string literal in this tree is written with a double quote.
 */
const QUOTES = ['"', "'"] as const

/** The module a page type is handed to that does not query it, so passing through is no reach. */
export const NOT_A_DAY_ROAD = ["tools/lib/tracking/held-row.ts"] as const

export type BypassKind = "write" | "read" | "carried" | "opaque" | "names"

/** How a file comes to name a day page type, which is the half a reader has to adjudicate. */
export type NameHow = "spells" | "constant" | "carrier" | "delegate"

export interface Named {
  readonly how: NameHow
  /** The module the name came out of, or the file itself where it spells the literal. */
  readonly from: string
  readonly line: number
  /** How many imports away the day page type is: 0 where the file holds it itself. */
  readonly hops: number
}

export interface Bypass {
  readonly path: string
  readonly kind: BypassKind
  /** The line the reach is taken on — the import, or the literal. */
  readonly line: number
  /** The lines the verb is called on, where a verb was found to look for. */
  readonly at: readonly number[]
  /** The module the reach was taken from, and how many hops that is off the store. */
  readonly via: string
  readonly hops: number
  /** The other half of the join: how this file names a day at all. */
  readonly named: Named
  readonly reason: string
}

/** A file or folder the scanner named and could not read, so nothing about it is known. */
export interface Unread {
  readonly path: string
  readonly why: string
}

export interface Reading {
  readonly scanned: readonly string[]
  readonly weighed: readonly string[]
  /** Every file read to settle the question, weighed or not — the population plus what it imports. */
  readonly graph: readonly string[]
  /** Every file that can reach the page store, at any number of hops. */
  readonly reachers: readonly string[]
  /** Every file that names one of the two day page types, at any number of hops. */
  readonly namers: readonly string[]
  /** The same, weighed only, with how each one comes to name a day — the half to adjudicate. */
  readonly naming: readonly (Named & { readonly path: string })[]
  readonly bypasses: readonly Bypass[]
  readonly unread: readonly Unread[]
  readonly hops: number
  readonly coverage: "complete" | "truncated"
}

interface Taken {
  readonly spec: string
  readonly module: string
  /** The names as the module it comes from exports them — before any `as`. */
  readonly values: readonly string[]
  /** The names as this file sees them, and hands them on where this is a re-export. */
  readonly outward: readonly string[]
  readonly reexport: boolean
  readonly line: number
}

interface Opaque {
  readonly spec: string
  readonly module: string
  readonly line: number
}

interface Imports {
  readonly taken: readonly Taken[]
  readonly opaque: readonly Opaque[]
}

function lineOf(text: string, index: number): number {
  let line = 1
  for (let each = 0; each < index; each += 1) if (text[each] === "\n") line += 1
  return line
}

function isCode(name: string): boolean {
  return TS.some((one) => name.endsWith(one))
}

/**
 * Every code file in the population, and every folder that could not be listed.
 *
 * The folders it could not list used to be swallowed: `readdirSync` threw, the catch answered an
 * empty list, and a renamed folder took its files out of the population without taking anything
 * off the count or off the word `complete`. That is the fault this audit exists to catch, in the
 * audit itself.
 */
function filesUnder(at: string, prefix: string, unread: Unread[]): readonly string[] {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(at, { withFileTypes: true })
  } catch (thrown) {
    const named = prefix === "" ? "." : prefix
    unread.push({ path: named, why: `could not be listed: ${String(thrown)}` })
    return []
  }
  const found: string[] = []
  for (const entry of entries) {
    const relPath = prefix === "" ? entry.name : `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      if (NOT_WALKED.has(entry.name) || entry.name.startsWith(".")) continue
      if ((NOT_WEIGHED_TREES as readonly string[]).includes(relPath)) continue
      found.push(...filesUnder(join(at, entry.name), relPath, unread))
    } else if (isCode(entry.name)) found.push(relPath)
  }
  return found.sort()
}

export function funnelFilesIn(repoRoot: string, unread: Unread[] = []): readonly string[] {
  return filesUnder(repoRoot, "", unread)
}

/**
 * What the scanner reads and how it resolves a name — the checkout, or a fixture standing for one.
 *
 * The population and the graph are separated here on purpose. `files` is who can be a finding;
 * `read` and `holds` reach anywhere in the checkout, because a day page type travels out of files
 * that are not themselves governed. `readouts/surplus-reading.ts` named its day through
 * `@akasha/readout-system/upkeep-surplus`, whose literal sits in a file under `akasha/` that this
 * check must read and must never refuse.
 */
export interface Corpus {
  readonly files: readonly string[]
  readonly unread: readonly Unread[]
  readonly read: (relPath: string) => string
  readonly holds: (relPath: string) => boolean
  /** Workspace package specifier — `@akasha/readout-system/upkeep-surplus` — to the file it names. */
  readonly exports: ReadonlyMap<string, string>
}

function packageJsonsUnder(at: string, prefix: string, found: string[]): void {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(at, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const relPath = prefix === "" ? entry.name : `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      if (NOT_WALKED.has(entry.name) || entry.name.startsWith(".")) continue
      packageJsonsUnder(join(at, entry.name), relPath, found)
    } else if (entry.name === "package.json") found.push(relPath)
  }
}

function targetOf(target: unknown): string | null {
  if (typeof target === "string") return target
  if (target === null || typeof target !== "object") return null
  for (const key of ["bun", "import", "default", "types"]) {
    const held = (target as Record<string, unknown>)[key]
    if (typeof held === "string") return held
  }
  return null
}

/**
 * The export map of every workspace package, which is the only thing that turns a package
 * specifier into a file.
 *
 * `moduleOf` keeps `@akasha/readout-system/upkeep-surplus` whole, and nothing in that string says
 * which file holds the `"daily-tracking"` literal. Only `akasha/readout-system/package.json` says
 * it. Without this the naming closure stops at every package boundary, which is where the first of
 * the two known escapes went through.
 */
export function packageExportsIn(repoRoot: string): ReadonlyMap<string, string> {
  const found: string[] = []
  packageJsonsUnder(repoRoot, "", found)
  const map = new Map<string, string>()
  for (const relPath of found) {
    let json: Record<string, unknown>
    try {
      json = JSON.parse(readFileSync(join(repoRoot, relPath), "utf8")) as Record<string, unknown>
    } catch {
      continue
    }
    const name = json["name"]
    if (typeof name !== "string") continue
    const dir = dirname(relPath) === "." ? "" : dirname(relPath)
    const put = (sub: string, target: unknown): void => {
      const file = targetOf(target)
      if (file === null) return
      const clean = file.replace(/^\.\//, "")
      const spec = sub === "." ? name : `${name}/${sub.replace(/^\.\//, "")}`
      map.set(spec, dir === "" ? clean : `${dir}/${clean}`)
    }
    const exported = json["exports"]
    if (typeof exported === "string") put(".", exported)
    else if (exported !== null && typeof exported === "object") {
      for (const [sub, target] of Object.entries(exported)) put(sub, target)
    } else {
      const main = json["main"] ?? json["module"]
      if (typeof main === "string") put(".", main)
    }
  }
  return map
}

export function corpusOf(repoRoot: string): Corpus {
  const unread: Unread[] = []
  const files = funnelFilesIn(repoRoot, unread)
  const held = new Map<string, boolean>()
  return {
    files,
    unread,
    read: (relPath) => readFileSync(join(repoRoot, relPath), "utf8"),
    holds: (relPath) => {
      const known = held.get(relPath)
      if (known !== undefined) return known
      let is = false
      try {
        is = statSync(join(repoRoot, relPath)).isFile()
      } catch {
        is = false
      }
      held.set(relPath, is)
      return is
    },
    exports: packageExportsIn(repoRoot),
  }
}

/**
 * What a relative specifier names, as a path from the root of the checkout.
 *
 * These were paths from `tools/` while `tools/` was the population. They are paths from the
 * checkout now, because the population is more than one tree and two trees have files of the same
 * relative name.
 */
export function moduleOf(fromRel: string, specifier: string): string {
  if (!specifier.startsWith(".")) return specifier
  const parts = fromRel.split("/").slice(0, -1)
  for (const step of specifier.split("/")) {
    if (step === ".") continue
    if (step === "..") {
      parts.pop()
      continue
    }
    parts.push(step)
  }
  return parts.join("/")
}

interface Wildcard {
  readonly before: string
  readonly after: string
  readonly target: string
}

const WILDCARDS = new WeakMap<ReadonlyMap<string, string>, readonly Wildcard[]>()

/**
 * `"./*": "./*.ts"` is how most of these packages are written, `@collections/exercises` among
 * them — which is the tree a lane found reaching the wrong client for this same family. An exact
 * map alone resolves none of them, and an unresolved specifier is a place a name goes through.
 */
function wildcardsOf(exports: ReadonlyMap<string, string>): readonly Wildcard[] {
  const held = WILDCARDS.get(exports)
  if (held !== undefined) return held
  const made: Wildcard[] = []
  for (const [spec, target] of exports) {
    const at = spec.indexOf("*")
    if (at < 0 || !target.includes("*")) continue
    made.push({ before: spec.slice(0, at), after: spec.slice(at + 1), target })
  }
  WILDCARDS.set(exports, made)
  return made
}

function throughWildcard(exports: ReadonlyMap<string, string>, specifier: string): string | null {
  for (const one of wildcardsOf(exports)) {
    if (!specifier.startsWith(one.before) || !specifier.endsWith(one.after)) continue
    const filled = specifier.slice(one.before.length, specifier.length - one.after.length)
    if (filled === "") continue
    return one.target.replace("*", filled)
  }
  return null
}

/**
 * The file a specifier names, or null where it leaves the checkout.
 *
 * A relative specifier in this tree carries its extension, but an index import and a `.tsx` route
 * do not, so both are tried. A package specifier is only ever resolved through the workspace
 * export map: anything that is not a workspace package is a dependency, and no dependency spells
 * one of Alan's page types.
 */
export function fileOf(corpus: Corpus, fromRel: string, specifier: string): string | null {
  if (!specifier.startsWith(".")) {
    const mapped = corpus.exports.get(specifier) ?? throughWildcard(corpus.exports, specifier)
    if (mapped === null || mapped === undefined) return null
    if (corpus.holds(mapped) && isCode(mapped)) return mapped
    for (const tail of [".ts", ".tsx", "/index.ts"]) {
      if (corpus.holds(mapped + tail)) return mapped + tail
    }
    return null
  }
  const at = moduleOf(fromRel, specifier)
  if (isCode(at)) return corpus.holds(at) ? at : null
  for (const tail of [".ts", ".tsx", "/index.ts"]) {
    if (corpus.holds(at + tail)) return at + tail
  }
  return null
}

export function isClientRoad(taken: { spec: string; module: string }): boolean {
  if ((CLIENT_ROADS as readonly string[]).includes(taken.module)) return true
  return CLIENT_PACKAGES.some((one) => taken.spec === one || taken.spec.startsWith(`${one}/`))
}

function importsOf(corpus: Corpus, relPath: string, text: string): Imports {
  const taken: Taken[] = []
  const opaque: Opaque[] = []
  for (const found of text.matchAll(NAMED_IMPORT)) {
    const named = (found[2] as string)
      .split(",")
      .map((each) => each.trim())
      .filter((each) => each !== "" && !each.startsWith("type "))
    const values = found[1] === undefined ? named.map((each) => sideOf(each, 0)) : []
    const outward = found[1] === undefined ? named.map((each) => sideOf(each, 1)) : []
    const spec = found[3] as string
    taken.push({
      spec,
      module: fileOf(corpus, relPath, spec) ?? moduleOf(relPath, spec),
      values,
      outward,
      reexport: text.startsWith("export", found.index),
      line: lineOf(text, found.index),
    })
  }
  for (const found of [...text.matchAll(STAR_IMPORT), ...text.matchAll(DYNAMIC_IMPORT)]) {
    const spec = found[1] as string
    opaque.push({
      spec,
      module: fileOf(corpus, relPath, spec) ?? moduleOf(relPath, spec),
      line: lineOf(text, found.index),
    })
  }
  return { taken, opaque }
}

/** `DAILY_TRACKING as SLUG` — side 0 is what the module exports, side 1 what this file calls it. */
function sideOf(clause: string, side: 0 | 1): string {
  const parts = clause.split(/\s+as\s+/)
  return (parts[side] ?? parts[0] ?? clause) as string
}

function calledAt(text: string, verb: string): readonly number[] {
  const found: number[] = []
  for (const hit of text.matchAll(new RegExp(`\\b${verb}\\s*\\(`, "g"))) {
    found.push(lineOf(text, hit.index))
  }
  return found
}

/** Whether a day slug at this index is the value of a binding that means something else. */
function meansAnotherThing(text: string, index: number): boolean {
  const start = text.lastIndexOf("\n", index) + 1
  const before = text.slice(start, index)
  return NOT_A_DAY_NAME.some((one) => new RegExp(`\\b${one}\\b\\s*(?::[^=]*)?=\\s*$`).test(before))
}

/** Where a file spells one of the two day page types as a whole quoted literal, and on what line. */
export function spellsDayType(text: string): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const slug of [DAILY_TRACKING, SESSION_TRACKING]) {
    for (const quote of QUOTES) {
      for (const hit of text.matchAll(new RegExp(`${quote}${slug}${quote}`, "g"))) {
        if (meansAnotherThing(text, hit.index)) continue
        if (!found.has(slug)) found.set(slug, lineOf(text, hit.index))
      }
    }
  }
  return found
}

function under(relPath: string, dir: string): boolean {
  return relPath.startsWith(`${dir}/`)
}

function inTheFunnelDirs(relPath: string): boolean {
  for (const dir of FUNNEL_DIRS) if (under(relPath, dir)) return true
  return false
}

function exempt(relPath: string): boolean {
  return (
    (ALLOWED_TO_REACH as readonly string[]).includes(relPath) ||
    (THE_SCANNER as readonly string[]).includes(relPath)
  )
}

export interface Reach {
  /** The module the store was taken from, which is the store itself at one hop. */
  readonly via: string
  readonly names: readonly string[]
  readonly line: number
  readonly hops: number
}

/**
 * Every file that can reach the page store, and by which module.
 *
 * This is a closure rather than one hop, because the command layer is three modules off the store:
 * `tools/commands/tracking/edit.ts` takes `pagesAccess` from `tools/lib/tracking-capability.ts`,
 * which takes `getPage` from `tools/lib/tracking/pages.ts`, which takes `askComposed` from
 * `page-query-client.ts`. Nothing in `edit.ts` names the client, so no scan of direct imports could
 * ever have seen it.
 *
 * The closure does not travel through the files in `ALLOWED_TO_REACH`. Taking `dayPlaceOf` off the
 * funnel is what every caller is supposed to do; if the funnel were a road then asking it would be
 * the finding.
 */
export function reachersIn(
  importsFor: (relPath: string) => Imports,
  files: readonly string[]
): { readonly found: ReadonlyMap<string, Reach>; readonly hops: number } {
  const found = new Map<string, Reach>()
  let hops = 0
  for (let round = 1; ; round += 1) {
    let moved = false
    for (const relPath of files) {
      if (found.has(relPath) || exempt(relPath)) continue
      const reach = reachOf(importsFor(relPath), found, round)
      if (reach === null) continue
      found.set(relPath, reach)
      hops = Math.max(hops, reach.hops)
      moved = true
    }
    if (!moved) return { found, hops }
  }
}

/**
 * An opaque import is a reach too, and leaving it out of this closure was a hole.
 *
 * `readingOf` already reports a file that takes a client road as `import *` or `await import(...)`
 * — that is the `opaque` bypass below. What it did not do is let the closure TRAVEL through one.
 * A module reaching the store by a dynamic import was no reacher, so every file importing that
 * module was no reacher either, however plainly it named a day. The blindness was inbound and
 * unbounded, which is the direction that reads as a clean run.
 *
 * Which names come across cannot be read off an opaque import, so `names` is empty here. That is
 * the same thing the `opaque` bypass says, and it is why such a reach is counted rather than
 * cleared.
 */
function reachOf(imports: Imports, found: ReadonlyMap<string, Reach>, round: number): Reach | null {
  for (const one of imports.taken) {
    if (one.values.length === 0) continue
    if (isClientRoad(one)) {
      return { via: one.spec, names: one.values, line: one.line, hops: 1 }
    }
  }
  for (const one of imports.opaque) {
    if (isClientRoad(one)) {
      return { via: one.spec, names: [], line: one.line, hops: 1 }
    }
  }
  if (round === 1) return null
  for (const one of imports.taken) {
    if (one.values.length === 0) continue
    const behind = found.get(one.module)
    if (behind === undefined) continue
    return { via: one.module, names: one.values, line: one.line, hops: behind.hops + 1 }
  }
  for (const one of imports.opaque) {
    const behind = found.get(one.module)
    if (behind === undefined) continue
    return { via: one.module, names: [], line: one.line, hops: behind.hops + 1 }
  }
  return null
}

/**
 * The bindings a module hands out that ARE a day page type.
 *
 * This is the closure the naming half was missing. It was a text search of the one file: the
 * quoted literal, or `DAILY_TRACKING` taken under that exact name. Both known escapes went straight
 * past it. `tools/lib/daily-tracking/value-points.ts` took the page type as
 * `DAILY_TRACKING_PAGE_TYPE_SLUG` from `daily-row.ts` and read the store on a tenth reach nobody
 * had seen; it surfaced only because a lane deleted the file it was hiding behind.
 *
 * A binding carries a day page type when it is assigned the literal, or one of the funnel's two
 * constants, or another binding that carries one — and a re-export carries whatever the module
 * behind it carries, under whatever name it is re-exported as. That last clause is what makes this
 * survive a barrel, and a barrel is what both escapes were behind.
 */
function carriersIn(
  importsFor: (relPath: string) => Imports,
  textFor: (relPath: string) => string,
  files: readonly string[]
): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, Set<string>>()
  for (const relPath of files) found.set(relPath, new Set<string>())
  for (;;) {
    let moved = false
    for (const relPath of files) {
      if (exempt(relPath)) continue
      const holding = found.get(relPath) as Set<string>
      const before = holding.size
      const imports = importsFor(relPath)
      const local = localCarriersOf(imports, found)
      for (const one of imports.taken) {
        if (!one.reexport) continue
        const behind = found.get(one.module)
        if (behind === undefined) continue
        for (let each = 0; each < one.values.length; each += 1) {
          const outward = one.outward[each] as string
          if (!behind.has(one.values[each] as string)) continue
          if ((NOT_A_DAY_NAME as readonly string[]).includes(outward)) continue
          holding.add(outward)
        }
      }
      for (const [name, held] of assignedCarriersOf(textFor(relPath), local)) {
        if (held) holding.add(name)
      }
      if (holding.size !== before) moved = true
    }
    if (!moved) return found
  }
}

/** The names this file knows locally that are a day page type, whatever they were called before. */
function localCarriersOf(
  imports: Imports,
  found: ReadonlyMap<string, ReadonlySet<string>>
): ReadonlySet<string> {
  const local = new Set<string>()
  for (const one of imports.taken) {
    const behind = found.get(one.module)
    for (let each = 0; each < one.values.length; each += 1) {
      const value = one.values[each] as string
      const outward = one.outward[each] as string
      if ((NOT_A_DAY_NAME as readonly string[]).includes(outward)) continue
      if ((DAY_CONSTANTS as readonly string[]).includes(value)) local.add(outward)
      else if (behind?.has(value) === true) local.add(outward)
    }
  }
  return local
}

function assignedCarriersOf(
  text: string,
  local: ReadonlySet<string>
): ReadonlyMap<string, boolean> {
  const found = new Map<string, boolean>()
  for (const hit of text.matchAll(EXPORTED_CONST)) {
    const name = hit[1] as string
    if ((NOT_A_DAY_NAME as readonly string[]).includes(name)) continue
    const rhs = hit[2] as string
    const spellsIt = QUOTES.some(
      (quote) =>
        rhs.includes(`${quote}${DAILY_TRACKING}${quote}`) ||
        rhs.includes(`${quote}${SESSION_TRACKING}${quote}`)
    )
    const fromConstant = (DAY_CONSTANTS as readonly string[]).some((one) =>
      new RegExp(`\\b${one}\\b`).test(rhs)
    )
    const fromLocal = [...local].some((one) => new RegExp(`\\b${one}\\b`).test(rhs))
    found.set(name, spellsIt || fromConstant || fromLocal)
  }
  return found
}

/**
 * Every file that names a day page type, and how it comes to.
 *
 * Four ways, and the last two are the closure the reach half always had and this half never did:
 *
 *   `spells`   — the quoted literal is in the file.
 *   `constant` — it takes `DAILY_TRACKING` or `SESSION_TRACKING` off the funnel by that name.
 *   `carrier`  — it takes a binding that IS a day page type, however renamed, however far. This is
 *                unbounded, because renaming across a barrel is unbounded.
 *   `delegate` — it hands work to a module that spells a day page type, ONE hop and no further.
 *                `readouts/surplus-reading.ts` held `askComposed` and passed it to
 *                `fetchSurplusHours`, which composed its own `daily-tracking` query out of sight of
 *                the funnel. The caller never wrote the slug and was doing day work all the same.
 *
 * The one hop on `delegate` is the boundary, and it was measured rather than guessed. Unbounded,
 * it makes a namer of anything that transitively touches a module that mentions a day, which under
 * `tools/` alone is 167 files against an honest 21 — the shape `typecheck-repo` failed in. At one
 * hop it adds five namers and one finding, and every one of the six is a file about a day.
 */
export function namersIn(
  importsFor: (relPath: string) => Imports,
  textFor: (relPath: string) => string,
  files: readonly string[]
): ReadonlyMap<string, Named> {
  const found = new Map<string, Named>()
  const spelling = new Map<string, ReadonlyMap<string, number>>()
  for (const relPath of files) {
    const spelled = spellsDayType(textFor(relPath))
    spelling.set(relPath, spelled)
    const first = [...spelled.values()][0]
    if (first !== undefined) {
      found.set(relPath, { how: "spells", from: relPath, line: first, hops: 0 })
      continue
    }
    for (const one of importsFor(relPath).taken) {
      const at = one.values.findIndex((each) => (DAY_CONSTANTS as readonly string[]).includes(each))
      if (at < 0) continue
      found.set(relPath, { how: "constant", from: one.spec, line: one.line, hops: 1 })
      break
    }
  }

  const carriers = carriersIn(importsFor, textFor, files)
  for (const relPath of files) {
    if (found.has(relPath) || exempt(relPath)) continue
    for (const one of importsFor(relPath).taken) {
      if (exempt(one.module)) continue
      const behind = carriers.get(one.module)
      if (behind === undefined) continue
      const at = one.values.findIndex((each) => behind.has(each))
      if (at < 0) continue
      found.set(relPath, { how: "carrier", from: one.module, line: one.line, hops: 1 })
      break
    }
  }

  for (const relPath of files) {
    if (found.has(relPath) || exempt(relPath)) continue
    for (const one of importsFor(relPath).taken) {
      if (one.values.length === 0 || exempt(one.module)) continue
      const behind = found.get(one.module)
      if (behind === undefined || behind.how !== "spells") continue
      found.set(relPath, { how: "delegate", from: one.module, line: one.line, hops: 1 })
      break
    }
  }
  return found
}

function kindOf(verb: string): BypassKind {
  return (WRITE_VERBS as readonly string[]).includes(verb) ? "write" : "read"
}

function farOff(hops: number): string {
  return hops <= 1
    ? ""
    : ` — ${String(hops)} hops off the store, so no search for the client names this file`
}

function namedSaid(named: Named): string {
  if (named.how === "spells") return `spells a day page type at line ${String(named.line)}`
  if (named.how === "constant") {
    return `takes a day page type off \`${named.from}\` by name at line ${String(named.line)}`
  }
  if (named.how === "carrier") {
    return (
      `takes a binding that IS a day page type from \`${named.from}\` at line ` +
      `${String(named.line)}, under whatever name that module hands it out as`
    )
  }
  return (
    `hands work to \`${named.from}\` at line ${String(named.line)}, which spells a day page type ` +
    "and so composes the day query out of sight of the funnel"
  )
}

function verbReason(
  verb: string,
  via: string,
  hops: number,
  kind: BypassKind,
  named: Named
): string {
  const how =
    kind === "write"
      ? "writes the page store around the funnel; land the write through"
      : "reads the page store around the funnel, so it answers out of the markdown half " +
        "whatever `dayPlaceOf` says about the day; ask through"
  return (
    `${namedSaid(named)}, and takes \`${verb}\` from \`${via}\`, which ${how} ` +
    `\`${NAMES_THE_FUNNEL}\` instead${farOff(hops)}`
  )
}

function carriedReason(via: string, hops: number, named: Named): string {
  return (
    `${namedSaid(named)}, and hands it into \`${via}\`, which reaches the page store; which verb ` +
    "it ends at cannot be read off this file, so the reach is counted rather than cleared. Ask " +
    `through \`${NAMES_THE_FUNNEL}\` instead${farOff(hops)}`
  )
}

/** The lines a file names a day page type on, which is where a carried reach hands it over. */
function namedAt(text: string, imports: Imports): readonly number[] {
  const taken = new Set(imports.taken.map((one) => one.line))
  const found = new Set<number>()
  for (const slug of [DAILY_TRACKING, SESSION_TRACKING]) {
    for (const quote of QUOTES) {
      for (const hit of text.matchAll(new RegExp(`${quote}${slug}${quote}`, "g"))) {
        if (meansAnotherThing(text, hit.index)) continue
        found.add(lineOf(text, hit.index))
      }
    }
  }
  for (const name of DAY_CONSTANTS) {
    for (const hit of text.matchAll(new RegExp(`\\b${name}\\b`, "g"))) {
      const line = lineOf(text, hit.index)
      if (!taken.has(line)) found.add(line)
    }
  }
  return [...found].sort((one, two) => one - two)
}

function isTest(relPath: string): boolean {
  return TEST_TS.some((one) => relPath.endsWith(one)) || relPath.endsWith(DECLARATION_TS)
}

export function readingOf(corpus: Corpus): Reading {
  const unread: Unread[] = [...corpus.unread]
  const scanned = corpus.files

  const text = new Map<string, string>()
  const weighed: string[] = []
  for (const relPath of scanned) {
    if (isTest(relPath)) continue
    try {
      text.set(relPath, corpus.read(relPath))
      weighed.push(relPath)
    } catch (thrown) {
      unread.push({ path: relPath, why: `could not be read: ${String(thrown)}` })
    }
  }

  const parsed = new Map<string, Imports>()
  const textFor = (relPath: string): string => text.get(relPath) ?? ""
  const importsFor = (relPath: string): Imports => {
    const held = parsed.get(relPath)
    if (held !== undefined) return held
    const made = importsOf(corpus, relPath, textFor(relPath))
    parsed.set(relPath, made)
    return made
  }

  // The graph is the population plus everything it imports, read for its names and its imports and
  // never weighed. A file outside the population that cannot be read is still an `unread`: the
  // question it would have answered is one nobody knows the answer to.
  const graph: string[] = [...weighed]
  const seen = new Set<string>(weighed)
  for (let each = 0; each < graph.length; each += 1) {
    const relPath = graph[each] as string
    const imports = importsFor(relPath)
    for (const one of [...imports.taken, ...imports.opaque]) {
      if (seen.has(one.module) || !isCode(one.module) || !corpus.holds(one.module)) continue
      seen.add(one.module)
      try {
        text.set(one.module, corpus.read(one.module))
        graph.push(one.module)
      } catch (thrown) {
        unread.push({ path: one.module, why: `could not be read: ${String(thrown)}` })
      }
    }
  }

  const { found: reaches, hops } = reachersIn(importsFor, graph)
  const names = namersIn(importsFor, textFor, graph)

  // How many hops off the store this import is, or null where it is no road at all. It takes the
  // whole import rather than the module because two of the four roads are packages, whose evidence
  // is the specifier: the file behind `@shared/pages-query/ask` is the store, and the store does
  // not itself reach the store, so asking `reaches` about it answers no.
  const road = (one: { readonly spec: string; readonly module: string }): number | null => {
    if (isClientRoad(one)) return 1
    const behind = reaches.get(one.module)
    return behind === undefined ? null : behind.hops + 1
  }

  const bypasses: Bypass[] = []
  for (const relPath of weighed) {
    const named = names.get(relPath)
    if (named === undefined || exempt(relPath)) continue
    const body = textFor(relPath)
    const imports = importsFor(relPath)

    const took = verbsTaken(imports, road)
    for (const one of took) {
      const kind = kindOf(one.verb)
      bypasses.push({
        path: relPath,
        kind,
        line: one.line,
        at: calledAt(body, one.verb),
        via: one.via,
        hops: one.hops,
        named,
        reason: verbReason(one.verb, one.via, one.hops, kind, named),
      })
    }
    if (took.length === 0) {
      const carried = carriedBy(imports, road, names)
      if (carried !== null) {
        bypasses.push({
          path: relPath,
          kind: "carried",
          line: carried.line,
          at: namedAt(body, imports),
          via: carried.via,
          hops: carried.hops,
          named,
          reason: carriedReason(carried.via, carried.hops, named),
        })
      }
    }
    if (relPath !== NAMES_THE_FUNNEL && inTheFunnelDirs(relPath) && named.how === "spells") {
      bypasses.push(...namesTheDayTypes(relPath, spellsDayType(body), named))
    }
    for (const one of imports.opaque) {
      if (!isClientRoad(one)) continue
      bypasses.push({
        path: relPath,
        kind: "opaque",
        line: one.line,
        at: [],
        via: one.spec,
        hops: 1,
        named,
        reason:
          `${namedSaid(named)}, and takes \`${one.spec}\` whole, so which verbs it reaches with ` +
          "cannot be read off the file; this reach is counted rather than cleared",
      })
    }
  }

  const coverage = unread.length === 0 ? "complete" : "truncated"
  return {
    scanned,
    weighed,
    graph,
    reachers: [...reaches.keys()].sort(),
    namers: [...names.keys()].sort(),
    naming: weighed
      .filter((one) => names.has(one))
      .map((one) => ({ path: one, ...(names.get(one) as Named) })),
    bypasses,
    unread,
    hops,
    coverage,
  }
}

/** How far off the store an import lands, or null where it is no road to it. */
type Road = (one: { readonly spec: string; readonly module: string }) => number | null

interface Took {
  readonly verb: string
  readonly via: string
  readonly hops: number
  readonly line: number
}

/**
 * Every store verb the file takes by name, from the store or from anything that re-exports it.
 *
 * The name is the evidence, so this holds however far off the store the module is:
 * `tools/lib/daily-tracking/breathing-sets.ts` takes `askComposed` from a barrel two hops away,
 * and it is the same `askComposed`.
 */
function verbsTaken(imports: Imports, road: Road): readonly Took[] {
  const found: Took[] = []
  for (const one of imports.taken) {
    const hops = road(one)
    if (hops === null) continue
    for (const verb of one.values) {
      if (!(STORE_VERBS as readonly string[]).includes(verb)) continue
      found.push({ verb, via: one.spec, hops, line: one.line })
    }
  }
  return found
}

/**
 * The one module a file hands a day page type into without naming a verb.
 *
 * This is how the command layer reaches a session row: `tools/commands/tracking/edit.ts` takes
 * `pagesAccess` off a barrel, which hands out `getPage`, which fills `page-type` from whatever its
 * caller passed. Nothing in `edit.ts` names a store verb, so the tier above cannot see it.
 *
 * It does not travel through a module that itself names a day, because that module is already a
 * finding of its own and the fix belongs there rather than at everyone who calls it — otherwise
 * a file that asks `askDayByDate` exactly as it should is refused for what it calls. One per file, because a barrel hands out a dozen names and the file
 * reaches the store once.
 */
function carriedBy(imports: Imports, road: Road, namers: ReadonlyMap<string, Named>): Took | null {
  for (const one of imports.taken) {
    if (one.values.length === 0) continue
    if (namers.has(one.module)) continue
    if ((NOT_A_DAY_ROAD as readonly string[]).includes(one.module)) continue
    const hops = road(one)
    if (hops === null) continue
    return { verb: one.values[0] as string, via: one.module, hops, line: one.line }
  }
  return null
}

function namesTheDayTypes(
  relPath: string,
  spelled: ReadonlyMap<string, number>,
  named: Named
): readonly Bypass[] {
  const found: Bypass[] = []
  for (const [slug, line] of spelled) {
    found.push({
      path: relPath,
      kind: "names",
      line,
      at: [],
      via: relPath,
      hops: 0,
      named,
      reason:
        `spells the page type \`${slug}\`, so it decides for itself where a day is kept; take ` +
        `the page type from \`${NAMES_THE_FUNNEL}\` instead`,
    })
  }
  return found
}
