export const summary =
  "Every file in the checkout outside `akasha/` that reaches one of Alan's tracking days or session rows around `dayPlaceOf` — by NAMING a day page type and then TAKING a page-store verb, read or write. Both halves are closures, following renames, barrels and package export maps, so a namer one hop away is still a namer and a reacher three hops off the store is still a reacher. The population is derived rather than listed, because a listed tree cannot say what it left out. REFUSES on a finding: while the migration is partly done one day is markdown and the next is akasha, so a reach that decides for itself writes a new day to the old place after that day has moved, and a read that decides for itself answers that a moved day is empty. Refuses where it could not look — no file found, or a folder it could not list, or a file it could not read — because a run that read nothing must not print like a run that found no bypass"

import { resolve } from "node:path"
import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import { codeRoot } from "@akasha/pages-system/code-root"
import type { AuditReading } from "@tools/lib/audit-reading"
import { renderAuditReading, summarizeAudit } from "@tools/lib/audit-reading"
import { parseArgs } from "@tools/lib/parse-args"
import {
  ALLOWED_TO_REACH,
  type Bypass,
  corpusOf,
  NAMES_THE_FUNNEL,
  NOT_WEIGHED_TREES,
  POPULATION_SAID,
  READ_VERBS,
  type Reading,
  readingOf,
  WRITE_VERBS,
} from "@tools/lib/tracking-funnel"
import type { CommandHelp } from "@tools/ops/surface"

const SUBJECT = "reaches around the day-place funnel anywhere outside akasha/"

const MAX_REPORTED = 40

export const help: CommandHelp = {
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description: "Which checkout to weigh; defaults to $CODE_ROOT, else this repository",
    },
    {
      name: "--json",
      description: "Emit the reading as single-line JSON instead of the human report",
    },
  ],
  exits: [
    {
      code: 0,
      meaning: "every reach of a day or a session row outside `akasha/` goes through `dayPlaceOf`",
    },
    {
      code: 2,
      meaning:
        "one or more files reach around the funnel — a read or a write of a day that decides for itself where that day is kept",
    },
    {
      code: 3,
      meaning:
        "operational error — no file was found, or a folder could not be listed, or a file could not be read, so the population is short by an amount nobody knows and no coverage can be reported",
    },
  ],
}

export default function trackingFunnel(args: readonly string[]): void {
  const parsed = parseArgs(help, args)

  const stated = parsed.string("--repo-root")
  const repoRoot = stated === undefined ? codeRoot() : resolve(stated)

  const reading = readingOf(corpusOf(repoRoot))

  if (reading.scanned.length === 0) {
    throw new OperationalError(
      `no TypeScript file was found in ${POPULATION_SAID} at ${repoRoot}, so nothing was weighed ` +
        "and a reach around the funnel could not have been seen. This is not a clean run. Name " +
        "the checkout with --repo-root."
    )
  }

  if (reading.unread.length > 0) {
    throw new OperationalError(
      `${String(reading.unread.length)} path(s) were named and could not be read, so the ` +
        "population is short by an amount nobody knows and the count of reaches below it is a " +
        "floor rather than a census:\n" +
        reading.unread.map((one) => `    ${one.path} — ${one.why}`).join("\n") +
        "\nA scan that cannot see a folder must not report coverage over it. Make these readable, " +
        "or take them out of the tree."
    )
  }

  const audit = {
    reading: summarizeAudit({
      scanned: reading.scanned.length,
      compared: reading.weighed.length,
      findings: reading.bypasses.length,
      coverage: reading.coverage,
    }),
    repoRoot,
    population: POPULATION_SAID,
    notWeighed: NOT_WEIGHED_TREES,
    allowed: ALLOWED_TO_REACH,
    readVerbs: READ_VERBS,
    writeVerbs: WRITE_VERBS,
    scanned: reading.scanned.length,
    weighed: reading.weighed.length,
    graph: reading.graph.length,
    namers: reading.naming.length,
    namersInGraph: reading.namers.length,
    naming: reading.naming,
    reachers: reading.reachers.length,
    hops: reading.hops,
    unread: reading.unread,
    coverage: reading.coverage,
    bypasses: reading.bypasses,
    observedAtMs: Date.now(),
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(audit)}\n`)
  } else {
    process.stdout.write(`${lined(reading, audit.reading).join("\n")}\n`)
  }

  if (reading.bypasses.length === 0) return

  throw new DataError(
    `${String(placesOf(reading.bypasses).length)} file(s) reach around ` +
      `${NAMES_THE_FUNNEL}, the one thing that says where a day is kept. Land the write or ` +
      "ask the read through it, or say here why this reach is one the funnel does not govern by " +
      "naming the file in `ALLOWED_TO_REACH` in tools/lib/tracking-funnel.ts."
  )
}

function placesOf(bypasses: readonly Bypass[]): readonly string[] {
  return [...new Set(bypasses.map((one) => one.path))].sort()
}

function at(one: Bypass): string {
  return one.at.length === 0 ? String(one.line) : one.at.join(",")
}

function hopsSaid(hops: number): string {
  return hops === 1 ? "one hop" : `${String(hops)} hops`
}

function lined(reading: Reading, said: AuditReading): readonly string[] {
  const scanned = reading.scanned.length
  const weighed = reading.weighed.length
  const lines = [...renderAuditReading(SUBJECT, said)]
  lines.push(
    `  POPULATION: ${String(scanned)} TypeScript file(s) in ${POPULATION_SAID}, walked rather ` +
      `than listed, holding out ${NOT_WEIGHED_TREES.join(", ")}/ — whose files import nothing ` +
      "outside themselves and so cannot take the funnel at all."
  )
  lines.push(
    `  DENOMINATOR: ${String(weighed)} weighed, after ${String(scanned - weighed)} test and ` +
      "declaration file(s) set aside, which state the rule rather than being bound by it."
  )
  lines.push(
    `  GRAPH: ${String(reading.graph.length)} file(s) read in all — the population and everything ` +
      "it imports, including under the trees held out, because a day page type travels out of " +
      "files that are not themselves governed."
  )
  lines.push(
    `  THE JOIN: ${String(reading.naming.length)} weighed file(s) name a day page type — by ` +
      `spelling it, by taking ` +
      `the funnel's constant, by taking a binding that IS one however renamed, or by handing work ` +
      `one hop to a module that spells it — and ${String(reading.reachers.length)} can reach the ` +
      `page store, by one of its four roads or through a module that took one, ` +
      `${hopsSaid(reading.hops)} deep at the furthest. Both halves are closures. Both are needed ` +
      "for a finding, so the reaches below are counted against the first of those numbers."
  )
  if (reading.bypasses.length === 0) {
    lines.push(
      `    Every reach of a day goes through ${NAMES_THE_FUNNEL}, and no file in ` +
        `${POPULATION_SAID} that touches the page store names a day page type of its own.`
    )
    return lines
  }
  const places = placesOf(reading.bypasses)
  lines.push(
    `  AROUND THE FUNNEL: ${String(places.length)} file(s) of the ${String(reading.naming.length)} ` +
      `that name a day, carrying ${String(reading.bypasses.length)} reach(es).`
  )
  for (const one of reading.bypasses.slice(0, MAX_REPORTED)) {
    lines.push(`    [${one.kind}/${one.named.how}] ${one.path}:${at(one)} — ${one.reason}`)
  }
  if (reading.bypasses.length > MAX_REPORTED) {
    const rest = reading.bypasses.length - MAX_REPORTED
    lines.push(`    and ${String(rest)} more, not listed; --json carries every one`)
  }
  return lines
}
