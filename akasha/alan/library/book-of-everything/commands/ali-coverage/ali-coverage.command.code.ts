import {
  buildCoverageReport,
  type CoverageReport,
  coveragePercent,
  type MeasuredCount,
} from "@akasha/book-of-everything/coverage-status"
import { statusNodeOf, topicTreeIn } from "@akasha/book-of-everything/topic-tree"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const INPUT = 1

const DATA = 2

const JSON_SAID = "--json"

function pct(count: MeasuredCount): string {
  return `${coveragePercent(count).toFixed(2)}%`
}

function frac(count: MeasuredCount): string {
  return `${count.measured} / ${count.total}`
}

export function saidOf(report: CoverageReport): readonly string[] {
  const lines: string[] = []
  lines.push("Book of Everything — how much has been opened at all")
  lines.push("")
  lines.push(
    `Sections (steady): ${frac(report.sectionHeadline)} opened = ${pct(report.sectionHeadline)}`
  )
  lines.push("  held against the sections the outline names, so this only climbs.")
  lines.push(
    `Topics (live):     ${frac(report.materializedDetail)} opened = ${pct(report.materializedDetail)}`
  )
  lines.push("  held against every topic that stands, so opening a topic up can drop this.")
  lines.push("")
  lines.push("By part:")
  lines.push("| # | Part | Sections | Topics |")
  lines.push("| --- | --- | --- | --- |")
  report.parts.forEach((part, at) => {
    lines.push(
      `| ${at + 1} | ${part.title} | ${frac(part.sections)} (${pct(part.sections)}) | ` +
        `${frac(part.materialized)} (${pct(part.materialized)}) |`
    )
  })
  lines.push("")
  lines.push("By division:")
  lines.push("| Part | Division | Sections | Topics |")
  lines.push("| --- | --- | --- | --- |")
  for (const division of report.divisions) {
    lines.push(
      `| ${division.partTitle} | ${division.title} | ` +
        `${frac(division.sections)} (${pct(division.sections)}) | ` +
        `${frac(division.materialized)} (${pct(division.materialized)}) |`
    )
  }
  return lines
}

export function aliCoverage(argv: readonly string[], given: Given): Answer {
  const stray = argv.find((one) => one !== JSON_SAID)
  if (stray !== undefined) return refused(`\`${stray}\` is nothing this takes`, INPUT)
  let report: CoverageReport
  try {
    report = buildCoverageReport(statusNodeOf(topicTreeIn(given.root)))
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }
  return {
    report: argv.includes(JSON_SAID) ? [JSON.stringify(report)] : [...saidOf(report)],
    refusals: [],
    code: 0,
  }
}
