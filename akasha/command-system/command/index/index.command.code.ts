import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { indexIn } from "../../../pages-system/indexes/index-reading.module.code.ts"
import {
  headOf,
  stampIn,
  unlandedIn,
} from "../../../pages-system/indexes/index-stamp.module.code.ts"
import { rebuiltFrom } from "../../../pages-system/indexes/indexing.module.code.ts"
import { counted } from "../../asking.module.code.ts"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"
import { holding } from "../../holding.module.code.ts"
import { oneLine } from "../../landing.module.code.ts"

export const REFRESH = "refresh"

export const DRY_RUN = "--dry-run"

export const UNLANDED = "--unlanded"

const ACTS = [REFRESH]

const AKASHA = "akasha"

const ASIDE = "refreshing"

const GONE = "replaced"

const SHOWN = 5

const STANDS = "the index stands as it did, and nothing was put in its place"

const COMMITTING = new Map<string, string>([
  ["--message", "says what a commit is for, and a refresh makes none"],
  ["--message-file", "says what a commit is for, and a refresh makes none"],
  ["--break-the-glass", "says why no check runs, and a refresh runs none"],
])

export const surface: Surface = {
  taking: [
    { said: REFRESH, takes: "build the index over `akasha/` as it stands and put it in place" },
    { said: DRY_RUN, takes: "say what the rebuild would change and put nothing in place" },
    { said: UNLANDED, takes: "build over paths standing apart from HEAD" },
  ],
  notes: [
    `${REFRESH} is the act it carries, and one call names one act.`,
    "a refresh makes no commit, so it takes no message and runs no check.",
  ],
}

export type Read =
  | { readonly act: string; readonly dryRun: boolean; readonly unlanded: boolean }
  | { readonly refused: readonly string[] }

export type Drift = {
  readonly added: readonly string[]
  readonly changed: readonly string[]
  readonly went: readonly string[]
}

function acts(): string {
  return ACTS.join("`, `")
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let act: string | null = null
  let dryRun = false
  let unlanded = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === DRY_RUN) {
      dryRun = true
      continue
    }
    if (one === UNLANDED) {
      unlanded = true
      continue
    }
    const why = COMMITTING.get(one)
    if (why !== undefined) {
      refusals.push(`${one} ${why}`)
      at += 1
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${DRY_RUN}\` and \`${UNLANDED}\``
      )
      continue
    }
    if (act !== null) {
      refusals.push(`\`${one}\` follows the act \`${act}\`, and one call names one act`)
      continue
    }
    act = one
  }
  if (act === null) {
    return { refused: [...refusals, `this names no act — it carries \`${acts()}\``] }
  }
  if (!ACTS.includes(act)) {
    refusals.push(`\`${act}\` is no act this carries — it carries \`${acts()}\``)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act, dryRun, unlanded }
}

function filesUnder(at: string): readonly string[] {
  if (!existsSync(at)) return []
  const found: string[] = []
  const walk = (here: string, said: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const named = `${said}${one.name}`
      if (one.isDirectory()) walk(join(here, one.name), `${named}/`)
      else found.push(named)
    }
  }
  walk(at, "")
  return found.sort()
}

export function driftBetween(was: string, now: string): Drift {
  const before = new Set(filesUnder(was))
  const added: string[] = []
  const changed: string[] = []
  for (const one of filesUnder(now)) {
    if (!before.has(one)) {
      added.push(one)
      continue
    }
    before.delete(one)
    if (readFileSync(join(was, one), "utf8") !== readFileSync(join(now, one), "utf8")) {
      changed.push(one)
    }
  }
  return { added, changed, went: [...before].sort() }
}

function swapped(at: string, aside: string): void {
  const gone = `${at}.${GONE}.${process.pid}`
  rmSync(gone, { recursive: true, force: true })
  if (existsSync(at)) renameSync(at, gone)
  mkdirSync(dirname(at), { recursive: true })
  renameSync(aside, at)
  rmSync(gone, { recursive: true, force: true })
}

export function named(paths: readonly string[]): string {
  const shown = paths.slice(0, SHOWN).join(", ")
  return paths.length > SHOWN ? `${shown}, and ${paths.length - SHOWN} more` : shown
}

export function driftSaid(drift: Drift): string {
  const many = drift.added.length + drift.changed.length + drift.went.length
  if (many === 0) return "nothing in the index differed from what the pages say"
  return (
    "the index differed from what the pages say — " +
    `${counted(drift.added.length, "file")} added, ` +
    `${counted(drift.changed.length, "file")} changed, ` +
    `${counted(drift.went.length, "file")} taken away`
  )
}

function refusing(said: readonly string[], code: number): Answer {
  return { report: [], refusals: [...said, STANDS], code }
}

function stampSaid(at: string): string {
  const held = stampIn(at)
  if (held === null) return "nothing stamped it — the index names no commit it was built from"
  return `stamped with ${held.commit}, over \`${held.tree}\`, naming ${counted(held.settled.length, "unlanded path")}`
}

function refreshing(root: string, read: { dryRun: boolean; unlanded: boolean }): Answer {
  const at = indexIn(root)
  const tree = join(root, AKASHA)
  if (!existsSync(tree)) {
    return refusing([`no \`${AKASHA}/\` stands under ${root}, so there is no index to build`], 2)
  }
  const head = headOf(root)
  if (head === null) {
    return refusing([`no commit could be read from ${root}, so nothing could stamp the index`], 3)
  }
  const apart = unlandedIn(root, AKASHA)
  if (apart.length > 0 && !read.unlanded) {
    return refusing(
      [
        `\`${AKASHA}/\` stands apart from HEAD in ${counted(apart.length, "path")} — ${named(apart)}`,
        `a rebuild takes those bodies as they stand — land them, or say \`${UNLANDED}\` to build over them`,
      ],
      2
    )
  }
  const aside = `${at}.${ASIDE}.${process.pid}`
  try {
    rmSync(aside, { recursive: true, force: true })
    mkdirSync(aside, { recursive: true })
    const said = rebuiltFrom(tree, aside, root)
    const report = [
      `the index was built over \`${AKASHA}/\` as it stands, at ${head}`,
      `${counted(said.pages, "page")}, ${said.entries} entries, ${said.refused.length} refused`,
      stampSaid(aside),
      driftSaid(driftBetween(at, aside)),
    ]
    if (apart.length > 0) {
      report.push(
        `${counted(apart.length, "path")} stand apart from HEAD and the stamp names them — ${named(apart)}`
      )
    }
    report.push(
      read.dryRun
        ? `nothing was put in place — ${DRY_RUN}`
        : `${relative(root, at)} was replaced whole`
    )
    if (!read.dryRun) swapped(at, aside)
    return {
      report,
      refusals: said.refused.map((one) => `the index took less than the whole of it — ${one}`),
      code: said.refused.length > 0 ? 2 : 0,
    }
  } finally {
    rmSync(aside, { recursive: true, force: true })
  }
}

export function index(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const root = resolve(given.root)
  try {
    return holding(root, () => refreshing(root, read))
  } catch (thrown) {
    return refusing([oneLine(thrown instanceof Error ? thrown.message : String(thrown))], 3)
  }
}
