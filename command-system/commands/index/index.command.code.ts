import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { indexNamed } from "@akasha/indexes"
import { type Drift, rebuiltWhole } from "@akasha/indexes/rebuilding"
import { headOf, type Stamp, unlandedIn } from "@akasha/indexes/stamp"
import { counted } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"
import { holding } from "../../holding/holding.module.code.ts"

export const REFRESH = "refresh"

export const DRY_RUN = "--dry-run"

export const UNLANDED = "--unlanded"

const ACTS = [REFRESH]

const DOMAIN_AT = "akasha.domain.ts"

const HERE = "."

const SHOWN = 5

const UNCHANGED = "the index stands as it did, and nothing was put in its place"

const COMMITTING = new Map<string, string>([
  ["--message", "says what a commit is for, and a refresh makes none"],
  ["--message-file", "says what a commit is for, and a refresh makes none"],
  ["--break-the-glass", "says why no check runs, and a refresh runs none"],
])

export type Read =
  | { readonly act: string; readonly dryRun: boolean; readonly unlanded: boolean }
  | { readonly refused: readonly string[] }

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
  return { report: [], refusals: [...said, UNCHANGED], code }
}

function stampSaid(held: Stamp | null): string {
  if (held === null) return "nothing stamped it — the index names no commit it was built from"
  return `stamped with ${held.commit}, over \`${held.tree}\`, naming ${counted(held.settled.length, "unlanded path")}`
}

function refreshing(root: string, read: { dryRun: boolean; unlanded: boolean }): Answer {
  const tree = root
  if (!existsSync(join(tree, DOMAIN_AT))) {
    return refusing([`${root} holds no \`${DOMAIN_AT}\`, so there is no index to build`], 2)
  }
  const head = headOf(root)
  if (head === null) {
    return refusing([`no commit could be read from ${root}, so nothing could stamp the index`], 3)
  }
  const apart = unlandedIn(root, HERE)
  if (apart.length > 0 && !read.unlanded) {
    return refusing(
      [
        `${root} stands apart from HEAD in ${counted(apart.length, "path")} — ${named(apart)}`,
        `a rebuild takes those bodies as they stand — land them, or say \`${UNLANDED}\` to build over them`,
      ],
      2
    )
  }
  const said = rebuiltWhole(root, tree, !read.dryRun)
  const report = [
    `the index was built over ${root} as it stands, at ${head}`,
    `${counted(said.pages, "page")}, ${said.entries} entries, ${said.refused.length} refused`,
    stampSaid(said.stamp),
    driftSaid(said.drift),
  ]
  if (apart.length > 0) {
    report.push(
      `${counted(apart.length, "path")} stand apart from HEAD and the stamp names them — ${named(apart)}`
    )
  }
  report.push(
    read.dryRun ? `nothing was put in place — ${DRY_RUN}` : `${indexNamed()} was replaced whole`
  )
  return {
    report,
    refusals: said.refused.map((one) => `the index took less than the whole of it — ${one}`),
    code: said.refused.length > 0 ? 2 : 0,
  }
}

export function index(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const root = resolve(given.root)
  try {
    return holding(root, () => refreshing(root, read))
  } catch (thrown) {
    return refusing([whyOf(thrown)], 3)
  }
}
