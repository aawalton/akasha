import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { plan as planArgument } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answeredWith,
  DATA,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { heldBack } from "akasha/command/modules/ignored-pathing/ignored-pathing.module.code.ts"
import { diskAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { indexRefresh as page } from "akasha/command/pages/index/refresh/index-refresh.command.ts"
import { committed } from "akasha/git/modules/committing/committing.module.code.ts"
import { holding } from "akasha/git/modules/holding/holding.module.code.ts"
import { told as gitTold } from "akasha/git/modules/running/git-running.module.code.ts"
import { turnedWhole } from "akasha/page/index/modules/generator-turning/generator-turning.module.code.ts"
import {
  type Refreshed,
  refreshedWhole,
} from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import {
  type Drift,
  filedUnder,
} from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const DOMAIN_AT = "akasha.domain.ts"

const SHOWN = 5

const UNCHANGED = "the index stands as it did, and nothing was put in its place"

const PART_WAY = "the refresh wrote part of the index before it stopped — run it again"

const BY_THEN = "what it wrote by then:"

const WROTE = "the index is brought level with the pages"

const NOTHING_HELD = "nothing git holds of what was written differed, so no commit was made"

const WEIGHED = "what every change generator writes was weighed against the pages —"

const UNWEIGHED = "a generated file was left unweighed —"

const COMMITTING = new Map<string, string>([
  ["--message", "says what a commit is for, and a refresh writes its own"],
  ["--message-file", "says what a commit is for, and a refresh writes its own"],
  ["--break-the-glass", "says why no check runs, and a refresh runs none"],
])

function committing(refused: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const [one, why] of COMMITTING) {
    if (refused.some((each) => each.includes(`\`${one}\``))) said.push(`\`${one}\` ${why}`)
  }
  return said
}

function named(paths: readonly string[]): string {
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

function driftSaid(drift: Drift): readonly string[] {
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

function pathOf(at: string, beside: ReadonlySet<string>): string {
  if (beside.has(at) || referencesFiled(at)) return at
  return join(indexNamed(), at)
}

const UNHELD = ["ls-files", "--others", "--exclude-standard", "-z", "--"]

const APART = "\0"

function unheldUnder(root: string, folder: string): readonly string[] {
  const said = gitTold(root, [...UNHELD, folder])
  return said === null ? [] : said.split(APART).filter((one) => one !== "")
}

function landed(root: string, said: Refreshed, beside: ReadonlySet<string>): string | null {
  const drift = said.drift
  const took = new Set(drift.went.map((one) => pathOf(one, beside)))
  const wrote = new Set([...drift.added, ...drift.changed].map((one) => pathOf(one, beside)))
  for (const one of said.beside) wrote.add(one)
  for (const one of unheldUnder(root, indexNamed())) wrote.add(one)
  const split = heldBack(
    root,
    [...wrote, ...took].map((path) => ({ path, body: null }))
  )
  const bodies = new Map<string, Uint8Array>()
  const taken: string[] = []
  for (const one of split.committing) {
    if (took.has(one.path)) {
      taken.push(one.path)
      continue
    }
    const body = diskAt(root, one.path)
    if (body !== null) bodies.set(one.path, body)
  }
  if (bodies.size === 0 && taken.length === 0) return null
  return committed(root, bodies, taken, WROTE, null)
}

function refreshing(root: string, read: { plan: boolean }, done: string[]): Answer {
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
  const whole = refreshedWhole(root, tree, !read.plan, done)
  const turned = turnedWhole(root, !read.plan)
  const derived = new Set([...turned.added, ...turned.changed])
  const said: Refreshed = {
    ...whole,
    drift: {
      added: [...whole.drift.added, ...turned.added],
      changed: [...whole.drift.changed, ...turned.changed],
      went: whole.drift.went,
    },
    beside: [...whole.beside, ...derived],
  }
  const refused = [
    ...said.refused.map((one) => `the index took less than the whole of it — ${one}`),
    ...turned.refused.map((one) => `${UNWEIGHED} ${one}`),
  ]
  const commit = read.plan ? null : landed(root, said, derived)
  const report = [
    `the index was brought level with ${root} as it is, at ${head}`,
    `${counted(said.pages, "page")}, ${said.entries} entries, ${refused.length} refused`,
    `${WEIGHED} ${counted(turned.weighed, "change generator")}`,
    ...driftSaid(said.drift),
  ]
  report.push(
    read.plan
      ? `nothing was put in place — ${planArgument.said}`
      : `${indexNamed()} was repaired in place, entry by entry`
  )
  if (!read.plan) {
    report.push(commit === null ? NOTHING_HELD : `what git holds of it was committed at ${commit}`)
  }
  return answeredWith(report, refused, refused.length > 0 ? DATA : OK)
}

export function indexRefresh(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [planArgument])
  if ("refused" in read) return mistaking([...committing(read.refused), ...read.refused])
  const taken = read.taken
  const root = resolve(given.root)
  const done: string[] = []
  try {
    return holding(root, () => refreshing(root, taken, done))
  } catch (thrown) {
    if (taken.plan || done.length === 0) return refusing([whyOf(thrown)], OPERATIONAL)
    return refusedBy([whyOf(thrown), PART_WAY, `${BY_THEN} ${done.join("; ")}`], OPERATIONAL)
  }
}
