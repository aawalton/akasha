import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import type { Addressed } from "../ops-cli/global/address.ts"
import { anyRefused, render } from "../outcome/outcome.ts"
import { carriesBytes } from "../page/file-kind/carries-bytes.ts"
import type { Roots } from "../page/page.ts"
import { pageOfSidecar, sidecarCarriedTo, sidecarsOf } from "../page/sidecar/sidecar.ts"
import { fail } from "../patches/patch.ts"
import { type Carry, land, type Landing, LandingRefused } from "../repo/land/land.ts"
import { canonicalize } from "../repo/path/path.ts"
import { isDirty, rootsHere, targetRepo, targetRoot } from "../repo/roots/roots.ts"
import { trackedIn, untrackedIn } from "../page/tracked/tracked.ts"
import { escapedSpellings } from "../repoint/mention.ts"
import {
  importerReading,
  type Importers,
  type Moves,
  type Repointed,
  runtimeReading,
  specifierReading,
  surveyImporters,
  surveyRename,
} from "../repoint/repoint.ts"
import { slugEdges } from "../repoint/reslug.ts"
import { decodeUtf8, leadingBytes } from "../utf8-body/utf8-body.ts"

const NUL = String.fromCharCode(0)

export interface Pair {
  readonly from: string
  readonly to: string
}

export interface Move {
  readonly moves: Moves
  readonly source: Addressed
  readonly destination: Addressed
  readonly message: string
  readonly dryRun: boolean
  readonly transform?: (relPath: string, body: string) => string
}

export interface Expanded {
  readonly pairs: readonly Pair[]
  readonly notes: readonly string[]
}

export function expandDirectories(
  pairs: readonly Pair[],
  source: Addressed,
  destination: Addressed
): Expanded {
  const refusals: string[] = []
  const made: Pair[] = []
  const notes: string[] = []
  for (const one of pairs) {
    const from = one.from.endsWith("/") ? one.from.slice(0, -1) : one.from
    const to = one.to.endsWith("/") ? one.to.slice(0, -1) : one.to
    const absolute = `${source.root}/${from}`
    if (!existsSync(absolute) || !statSync(absolute).isDirectory()) {
      made.push(one)
      continue
    }
    const standing = `${destination.root}/${to}`
    const occupied =
      existsSync(standing) &&
      (!statSync(standing).isDirectory() || readdirSync(standing).length > 0)
    if (occupied) {
      refusals.push(
        `${to} already exists and holds something, and ${from} is a directory — a directory names ` +
          "the path it becomes, never a parent to nest inside, so name the path it should land on"
      )
      continue
    }
    const loose = untrackedIn(source.root, from)
    if (loose.length > 0) {
      refusals.push(
        `${from} holds ${loose.length} file(s) git neither tracks nor ignores, and an expansion ` +
          `carries what is tracked — ${loose.join(", ")} would be left behind under a directory ` +
          "this call takes away. Track them, ignore them, or move the files by name"
      )
      continue
    }
    const held = trackedIn(source.root, from)
    const inside = new Set(held)
    let quarantined = 0
    let beside = 0
    for (const each of held) {
      if (isDirty(each)) {
        quarantined += 1
        continue
      }
      const page = pageOfSidecar(each)
      if (page !== null && inside.has(page)) {
        beside += 1
        continue
      }
      made.push({ from: each, to: `${to}${each.slice(from.length)}` })
    }
    const named = held.length - quarantined - beside
    if (named === 0) {
      refusals.push(
        `${from} names no file this would move — it tracks ${held.length} file(s), of which ` +
          `${quarantined} stand under \`dirty/\` and ${beside} go with a page already`
      )
      continue
    }
    notes.push(
      `${from} is a directory standing for ${named} tracked file(s), each landing at the same ` +
        `relative path under ${to}` +
        (beside === 0 ? "" : `; ${beside} file(s) beside a page go with it unnamed`) +
        (quarantined === 0 ? "" : `; ${quarantined} file(s) under \`dirty/\` were passed over`)
    )
  }
  if (refusals.length > 0) fail(refusals.join("\n       "))
  return { pairs: made, notes }
}

export function validatePairs(
  pairs: readonly Pair[],
  source: Addressed,
  destination: Addressed
): Moves {
  const refusals: string[] = []
  const here = (relPath: string): string => `${source.repo}:${relPath}`
  const there = (relPath: string): string => `${destination.repo}:${relPath}`
  const sources = new Set(pairs.map((one) => here(one.from)))
  const seen = new Set<string>()
  for (const { from, to } of pairs) {
    const absolute = `${source.root}/${from}`
    if (!existsSync(absolute)) refusals.push(`${from} does not exist — a move names what is there`)
    else if (!statSync(absolute).isFile()) {
      refusals.push(`${from} is not a file — name the files inside it`)
    } else if (!carriesBytes(from)) {
      const bytes = readFileSync(absolute)
      const body = decodeUtf8(bytes)
      if (body === null) {
        refusals.push(
          `${from} is not UTF-8 text and its extension names no file kind stating \`binary: true\`, ` +
            `so nothing here can read what names it or carry it — it begins ${leadingBytes(bytes)}`
        )
      } else if (body.includes(NUL)) {
        refusals.push(
          `${from} holds a NUL byte and its extension names no file kind stating \`binary: true\`, ` +
            "so the survey that reads what names a path passes over it, and its body would be taken " +
            "away without landing anywhere — take the NUL out of the source"
        )
      }
    }
    if (here(from) === there(to)) {
      refusals.push(`${from} names itself as its destination, so it asks for no move`)
    } else if (sources.has(there(to))) {
      refusals.push(`${to} is both a destination and a source — declare the chain as its final pairs`)
    } else if (existsSync(`${destination.root}/${to}`)) {
      refusals.push(`${to} already exists — a move never overwrites`)
    }
    for (const [side, shown] of [
      [here(from), from],
      [there(to), to],
    ] as const) {
      if (seen.has(side)) refusals.push(`${shown} is declared more than once`)
      seen.add(side)
    }
  }
  if (refusals.length > 0) fail(refusals.join("\n       "))
  return new Map(pairs.map((one): [string, string] => [one.from, one.to]))
}

function carriedFiles(moves: Moves, source: Addressed, destination: Addressed): readonly Carry[] {
  const carrying = [...moves].flatMap(([from, to]) =>
    sidecarsOf(source.root, from).map((one) => ({ from: one, to: sidecarCarriedTo(one, from, to) }))
  )
  const standing = carrying.filter((one) => existsSync(`${destination.root}/${one.to}`))
  if (standing.length > 0) {
    fail(
      [
        ...standing.map((one) => `${one.to} already exists — a move never overwrites`),
        "remove what stands at the destination, or land the page where nothing does",
      ].join("\n       ")
    )
  }
  if (carrying.length > 0) {
    process.stderr.write(
      "the files standing beside a page this call moves, which go with it\n" +
        carrying.map((one) => `      ${one.from} → ${one.to}\n`).join("")
    )
  }
  return carrying
}

function carriedBodies(moves: Moves): readonly Carry[] {
  return [...moves]
    .filter(([from]) => carriesBytes(from))
    .map(([from, to]): Carry => ({ from, to }))
}

function reportRepointed(named: string, entries: readonly Repointed[]): void {
  for (const entry of entries) {
    process.stderr.write(
      `${named}${entry.relPath}${entry.moved ? " (moved here)" : ""}\n` +
        entry.notes.map((note) => `      repointed ${note}\n`).join("")
    )
  }
}

function repointedBodies(found: readonly Importers[]): ReadonlyMap<string, string> {
  return new Map(
    found.flatMap((one) =>
      one.entries.map((entry): [string, string] => [
        canonicalize(`${targetRoot(one.roots)}/${entry.relPath}`),
        entry.body,
      ])
    )
  )
}

function landOrRefuse(
  where: Addressed,
  entries: readonly Landing[],
  message: string,
  dryRun: boolean,
  removing: readonly string[],
  carrying: readonly Carry[],
  goneElsewhere: readonly string[],
  repointedElsewhere: ReadonlyMap<string, string>
): void {
  try {
    land(where, entries, message, dryRun, removing, carrying, true, goneElsewhere, repointedElsewhere)
  } catch (thrown) {
    if (thrown instanceof LandingRefused) {
      process.stderr.write(`error: ${thrown.message}\n`)
      process.exit(3)
    }
    throw thrown
  }
}

function rootsFor(at: Addressed): Roots {
  return { ...rootsHere(), target: at.repo }
}

function generatedFate(source: Addressed, destination: Addressed): string {
  return source.repo === destination.repo
    ? "; what wrote them will write the moved path itself when it next runs"
    : "; regenerating them will not repair the paths, because what they name has left the repository"
}

export function landMoves(move: Move): void {
  const { moves, source, destination, message, dryRun } = move
  const roots = rootsFor(source)
  const landing = rootsFor(destination)
  const survey = surveyRename(moves, roots, landing)
  const change = move.transform
  const entries =
    change === undefined
      ? survey.entries
      : survey.entries.map((one) =>
          one.moved ? { ...one, body: change(one.relPath, one.body) } : one
        )
  reportRepointed("", entries)
  const importers = surveyImporters(moves, roots, landing)
  const pending = repointedBodies(importers)
  for (const one of importers) reportRepointed(`${targetRepo(one.roots)}:`, one.entries)
  const carrying = [...carriedBodies(moves), ...carriedFiles(moves, source, destination)]
  const outcomes = [
    slugEdges(moves, roots),
    escapedSpellings(survey.escaped),
    specifierReading(survey.reading),
    runtimeReading(survey.runtime),
    ...(importers.length === 0 ? [] : [importerReading(importers)]),
  ]
  process.stderr.write(
    `${render(outcomes).join("\n")}\n` +
      (survey.quarantined.length === 0
        ? ""
        : `  quarantine           advisory        ${survey.quarantined.length} reference(s) under \`dirty/\` name a moved path and were left as written\n` +
          survey.quarantined.map((one) => `      ${one}\n`).join("")) +
      (survey.generated.length === 0
        ? ""
        : `  generated            advisory        ${survey.generated.length} generated file(s) name a moved path and were left as written${generatedFate(source, destination)}\n`)
  )
  if (anyRefused(outcomes)) {
    process.stderr.write("nothing was moved\n")
    process.exit(1)
  }

  for (const one of importers) {
    const at = { repo: targetRepo(one.roots), root: targetRoot(one.roots) }
    process.stdout.write(`repo:   ${at.repo}, which imports them from outside\n`)
    landOrRefuse(at, one.entries, message, dryRun, [], [], [], new Map())
  }
  const sources = [...moves.keys()].filter((one) => !carriesBytes(one))
  if (source.repo === destination.repo) {
    if (importers.length > 0) {
      process.stdout.write(`repo:   ${source.repo}, which the bodies move within\n`)
    }
    landOrRefuse(source, entries, message, dryRun, sources, carrying, [], pending)
    return
  }
  const going = [...sources, ...carrying.map((one) => one.from)]
  const beside = carrying.map((one) => ({
    relPath: one.to,
    body: readFileSync(`${source.root}/${one.from}`),
  }))
  process.stdout.write(`repo:   ${destination.repo}, which the bodies land in\n`)
  landOrRefuse(
    destination,
    [...entries.filter((one) => one.moved), ...beside],
    message,
    dryRun,
    [],
    [],
    going.map((one) => `${source.root}/${one}`),
    pending
  )
  process.stdout.write(`repo:   ${source.repo}, which gives them up\n`)
  landOrRefuse(source, entries.filter((one) => !one.moved), message, dryRun, going, [], [], pending)
}
