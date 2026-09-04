import { join } from "node:path"
import {
  type ComputedNode,
  computeCoverage,
  formatScore,
  round2,
} from "@akasha/book-of-everything/coverage-fold"
import { coverageNodeOf, type Topic, topicTreeIn } from "@akasha/book-of-everything/topic-tree"
import { landingAsked, mistaking, textAt, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { listedAt } from "@akasha/indexes"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"

const INPUT = 1

const DATA = 2

const DRY_RUN = "--dry-run"

const JSON_SAID = "--json"

const TOPIC = "learn-everything-topic"

const RECORD = "book-record"

const DASHBOARD = "book-of-everything-coverage-dashboard"

const WRITING = "writing"

const MD = "md"

const COVERAGE = "coverage"

export type Folded = {
  readonly topic: Topic
  readonly was: number
  readonly now: number
}

export function foldedIn(tree: Topic): readonly Folded[] {
  const found: Folded[] = []
  const walk = (topic: Topic, held: ComputedNode): undefined => {
    found.push({ topic, was: topic.coverage, now: round2(held.c) })
    topic.children.forEach((child, at) => {
      const under = held.children[at]
      if (under !== undefined) walk(child, under)
    })
    return undefined
  }
  walk(tree, computeCoverage(coverageNodeOf(tree)))
  return found
}

export function dashboardOf(folded: readonly Folded[]): string {
  const byslug = new Map(folded.map((one) => [one.topic.slug, one]))
  const root = folded[0]
  const lines: string[] = []
  lines.push("# Book of Everything — Coverage Dashboard")
  lines.push("")
  lines.push("<!-- Kept by `akasha ali-fold`. Do not edit by hand. -->")
  lines.push("")
  lines.push(`**Root coverage (C): ${formatScore(root?.now ?? 0)} / 7**`)
  lines.push("")
  lines.push("How much of reality Alan's one conceptual model explains, and how well —")
  lines.push("the whole tree folded by C(parent) = ½·D + ½·mean(children C). All scores")
  lines.push("0–7 to two decimals.")
  lines.push("")
  lines.push("## By Part")
  lines.push("")
  lines.push("| # | Part | C |")
  lines.push("| --- | --- | --- |")
  const parts = root?.topic.children ?? []
  parts.forEach((part, at) => {
    lines.push(`| ${at + 1} | ${part.title} | ${formatScore(byslug.get(part.slug)?.now ?? 0)} |`)
  })
  lines.push("")
  lines.push("## By Division")
  lines.push("")
  lines.push("| Part | Division | C |")
  lines.push("| --- | --- | --- |")
  for (const part of parts) {
    for (const division of part.children) {
      lines.push(
        `| ${part.title} | ${division.title} | ${formatScore(byslug.get(division.slug)?.now ?? 0)} |`
      )
    }
  }
  lines.push("")
  return lines.join("\n")
}

function bytesOf(said: string): Uint8Array {
  return new TextEncoder().encode(said)
}

export function aliFold(argv: readonly string[], given: Given): Answer {
  const stray = argv.find((one) => one !== DRY_RUN && one !== JSON_SAID)
  if (stray !== undefined) return refused(`\`${stray}\` is nothing this takes`, INPUT)
  const json = argv.includes(JSON_SAID)
  const dryRun = argv.includes(DRY_RUN)

  let folded: readonly Folded[]
  try {
    folded = foldedIn(topicTreeIn(given.root))
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }

  const moved = folded.filter((one) => one.was !== one.now)
  const changes: FileEdit[] = []
  for (const one of moved) {
    const was = valueAt(one.topic.at, given.root)
    if (was === null) {
      return refused(`${one.topic.at} would not load, so what it holds is unknown`, DATA)
    }
    const values: Value = { ...was }
    values[COVERAGE] = one.now
    const composed = composedFor(given.root, {
      pageTypeSlug: TOPIC,
      slug: one.topic.slug,
      values,
    })
    if ("refused" in composed) return refused(composed.refused, DATA)
    changes.push({ path: composed.put.path, body: bytesOf(composed.put.content) })
  }

  const listed = listedAt(given.root, RECORD, DASHBOARD)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  if (at === undefined) return refused(`no ${RECORD} page is filed at \`${DASHBOARD}\``, DATA)
  const beside = besideAt(at, WRITING, MD)
  if (beside === null) return mistaking([`no \`${WRITING}\` file can sit beside ${at}`])
  const drawn = dashboardOf(folded)
  if (textAt(join(given.root, beside)) !== drawn) {
    changes.push({ path: beside, body: bytesOf(drawn) })
  }

  const said = json
    ? JSON.stringify({
        root: folded[0]?.now ?? 0,
        topics: folded.length,
        moved: moved.map((one) => ({ slug: one.topic.slug, was: one.was, now: one.now })),
      })
    : `folded ${folded.length} topics; root coverage ${formatScore(folded[0]?.now ?? 0)} / 7; ${moved.length} moved`

  if (changes.length === 0) return { report: [said], refusals: [], code: 0 }

  const answer = landingAsked(given, {
    changes,
    message: "fold the Book of Everything's coverage",
    dryRun,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer
  return { report: json ? [said] : [said, ...answer.report], refusals: [], code: 0 }
}
