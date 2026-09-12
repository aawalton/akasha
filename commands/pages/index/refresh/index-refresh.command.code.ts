import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { holding } from "akasha/commands/modules/holding/holding.module.code.ts"
import { told as gitTold } from "akasha/git/running/git-running.module.code.ts"
import type { Drift } from "akasha/pages/indexes/index-keeping/index-keeping.module.code.ts"
import { refreshedWhole } from "akasha/pages/indexes/indexing/indexing.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

export const DRY_RUN = "--dry-run"

const DOMAIN_AT = "akasha.domain.ts"

const SHOWN = 5

const PARTED_BY = "/"

const UNCHANGED = "the index stands as it did, and nothing was put in its place"

const PART_WAY = "the refresh may have written part of the index before it stopped — run it again"

const COMMITTING = new Map<string, string>([
  ["--message", "says what a commit is for, and a refresh makes none"],
  ["--message-file", "says what a commit is for, and a refresh makes none"],
  ["--break-the-glass", "says why no check runs, and a refresh runs none"],
])

export type Read = { readonly dryRun: boolean } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
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
    refusals.push(`\`${one}\` is no word this takes — it takes \`${DRY_RUN}\``)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { dryRun }
}

export function named(paths: readonly string[]): string {
  const shown = paths.slice(0, SHOWN).join(", ")
  return paths.length > SHOWN ? `${shown}, and ${paths.length - SHOWN} more` : shown
}

export function classed(paths: readonly string[]): string {
  const many = new Map<string, number>()
  for (const one of paths) {
    const cut = one.indexOf(PARTED_BY)
    const held = cut < 0 ? one : one.slice(0, cut)
    many.set(held, (many.get(held) ?? 0) + 1)
  }
  return [...many]
    .sort((first, next) => next[1] - first[1] || first[0].localeCompare(next[0]))
    .map(([held, count]) => `${held} ${count}`)
    .join(", ")
}

export function driftSaid(drift: Drift): readonly string[] {
  const many = drift.added.length + drift.changed.length + drift.went.length
  if (many === 0) return ["nothing in the index differed from what the pages say"]
  const said = [
    "the index differed from what the pages say — " +
      `${counted(drift.added.length, "file")} added, ` +
      `${counted(drift.changed.length, "file")} changed, ` +
      `${counted(drift.went.length, "file")} taken away`,
  ]
  if (drift.added.length > 0) {
    said.push(`added — ${classed(drift.added)} — ${named(drift.added)}`)
  }
  if (drift.changed.length > 0) {
    said.push(`changed — ${classed(drift.changed)} — ${named(drift.changed)}`)
  }
  if (drift.went.length > 0) {
    said.push(`taken away — ${classed(drift.went)} — ${named(drift.went)}`)
  }
  return said
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
  const said = refreshedWhole(root, tree, !read.dryRun)
  const report = [
    `the index was brought level with ${root} as it is, at ${head}`,
    `${counted(said.pages, "page")}, ${said.entries} entries, ${said.refused.length} refused`,
    ...driftSaid(said.drift),
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

export function indexRefresh(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const root = resolve(given.root)
  try {
    return holding(root, () => refreshing(root, read))
  } catch (thrown) {
    if (read.dryRun) return refusing([whyOf(thrown)], 3)
    return { report: [], refusals: [whyOf(thrown), PART_WAY], code: 3 }
  }
}
