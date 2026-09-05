import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { told as gitTold } from "@akasha/git/git-running"
import { indexNamed } from "@akasha/indexes"
import { rebuiltWhole } from "@akasha/indexes/indexing"
import type { Drift } from "@akasha/indexes/rebuilding"
import { counted } from "../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"
import { holding } from "../../command-system/holding/holding.module.code.ts"

export const REFRESH = "refresh"

export const DRY_RUN = "--dry-run"

const ACTS = [REFRESH]

const DOMAIN_AT = "akasha.domain.ts"

const SHOWN = 5

const UNCHANGED = "the index stands as it did, and nothing was put in its place"

const COMMITTING = new Map<string, string>([
  ["--message", "says what a commit is for, and a refresh makes none"],
  ["--message-file", "says what a commit is for, and a refresh makes none"],
  ["--break-the-glass", "says why no check runs, and a refresh runs none"],
])

export type Read =
  | { readonly act: string; readonly dryRun: boolean }
  | { readonly refused: readonly string[] }

function acts(): string {
  return ACTS.join("`, `")
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let act: string | null = null
  let dryRun = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === DRY_RUN) {
      dryRun = true
      continue
    }
    const why = COMMITTING.get(one)
    if (why !== undefined) {
      refusals.push(`${one} ${why}`)
      at += 1
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag this takes — it takes \`${DRY_RUN}\``)
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
  return { act, dryRun }
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

function refreshing(root: string, read: { dryRun: boolean }): Answer {
  const tree = root
  if (!existsSync(join(tree, DOMAIN_AT))) {
    return refusing([`${root} holds no \`${DOMAIN_AT}\`, so there is no index to build`], 2)
  }
  const head = gitTold(root, ["rev-parse", "HEAD"])?.trim() ?? null
  if (head === null) {
    return refusing([`no commit could be read from ${root}, so there is nothing to build over`], 3)
  }
  const said = rebuiltWhole(root, tree, !read.dryRun)
  const report = [
    `the index was built over ${root} as it stands, at ${head}`,
    `${counted(said.pages, "page")}, ${said.entries} entries, ${said.refused.length} refused`,
    driftSaid(said.drift),
  ]
  report.push(
    read.dryRun
      ? `nothing was put in place — ${DRY_RUN}`
      : `${indexNamed()} was repaired in place, entry by entry`
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
