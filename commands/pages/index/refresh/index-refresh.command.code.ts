import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { dryRun as dryRunArgument } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import {
  answeredWith,
  DATA,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { indexRefresh as page } from "akasha/commands/pages/index/refresh/index-refresh.command.ts"
import { holding } from "akasha/git/holding/holding.module.code.ts"
import { told as gitTold } from "akasha/git/running/git-running.module.code.ts"
import {
  type Drift,
  filedUnder,
} from "akasha/pages/indexes/index-keeping/index-keeping.module.code.ts"
import { refreshedWhole } from "akasha/pages/indexes/indexing/indexing.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

const DOMAIN_AT = "akasha.domain.ts"

const SHOWN = 5

const UNCHANGED = "the index stands as it did, and nothing was put in its place"

const PART_WAY = "the refresh wrote part of the index before it stopped — run it again"

const BY_THEN = "what it wrote by then:"

const COMMITTING = new Map<string, string>([
  ["--message", "says what a commit is for, and a refresh makes none"],
  ["--message-file", "says what a commit is for, and a refresh makes none"],
  ["--break-the-glass", "says why no check runs, and a refresh runs none"],
])

export function committing(refused: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const [one, why] of COMMITTING) {
    if (refused.some((each) => each.includes(`\`${one}\``))) said.push(`\`${one}\` ${why}`)
  }
  return said
}

export function named(paths: readonly string[]): string {
  const shown = paths.slice(0, SHOWN).join(", ")
  return paths.length > SHOWN ? `${shown}, and ${paths.length - SHOWN} more` : shown
}

export function classed(paths: readonly string[]): string {
  const many = new Map<string, number>()
  for (const one of paths) {
    const held = filedUnder(one)
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
  return refusedBy([...said, UNCHANGED], code)
}

function refreshing(root: string, read: { dryRun: boolean }, done: string[]): Answer {
  const tree = root
  if (!existsSync(join(tree, DOMAIN_AT))) {
    return refusing([`${root} holds no \`${DOMAIN_AT}\`, so there is no index to build`], DATA)
  }
  const head = gitTold(root, ["rev-parse", "HEAD"])?.trim() ?? null
  if (head === null) {
    return refusing(
      [`no commit could be read from ${root}, so there is nothing to build over`],
      OPERATIONAL
    )
  }
  const said = refreshedWhole(root, tree, !read.dryRun, done)
  const report = [
    `the index was brought level with ${root} as it is, at ${head}`,
    `${counted(said.pages, "page")}, ${said.entries} entries, ${said.refused.length} refused`,
    ...driftSaid(said.drift),
  ]
  report.push(
    read.dryRun
      ? `nothing was put in place — ${dryRunArgument.said}`
      : `${indexNamed()} was repaired in place, entry by entry`
  )
  return answeredWith(
    report,
    said.refused.map((one) => `the index took less than the whole of it — ${one}`),
    said.refused.length > 0 ? DATA : OK
  )
}

export function indexRefresh(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [dryRunArgument])
  if ("refused" in read) return mistaking([...committing(read.refused), ...read.refused])
  const taken = read.taken
  const root = resolve(given.root)
  const done: string[] = []
  try {
    return holding(root, () => refreshing(root, taken, done))
  } catch (thrown) {
    if (taken.dryRun || done.length === 0) return refusing([whyOf(thrown)], OPERATIONAL)
    return refusedBy([whyOf(thrown), PART_WAY, `${BY_THEN} ${done.join("; ")}`], OPERATIONAL)
  }
}
