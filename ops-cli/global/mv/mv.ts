export const summary = "Move files, repoint everything that named them, and remove the orphans"

import { existsSync, readFileSync, statSync } from "node:fs"
import { anyRefused, render } from "../../../outcome/outcome.ts"
import type { Roots } from "../../../page/page.ts"
import { sidecarCarriedTo, sidecarsOf } from "../../../page/sidecar/sidecar.ts"
import { type Carry, land, type Landing, LandingRefused } from "../../../repo/land/land.ts"
import { canonicalize } from "../../../repo/path/path.ts"
import { rootsHere, targetRepo, targetRoot } from "../../../repo/roots/roots.ts"
import { escapedSpellings } from "../../../repoint/mention.ts"
import {
  importerReading,
  type Importers,
  type Moves,
  type Repointed,
  specifierReading,
  surveyImporters,
  surveyRename,
} from "../../../repoint/repoint.ts"
import { slugEdges } from "../../../repoint/reslug.ts"
import { decodeUtf8, leadingBytes } from "../../../utf8-body/utf8-body.ts"
import { applyPairs, type Pair as EditPair, parsePairs } from "../../../patches/edit-pairs.ts"
import { addressOf, type Addressed, defaultMessage, rejectUnknownFlags, relPathIn } from "../address.ts"
import {
  DESCRIPTION,
  DRY_RUN,
  EXITS,
  FLAGS,
  FROM,
  INPUT_FILE,
  MESSAGE,
  MESSAGE_FILE,
  REPO,
  TO,
} from "./mv-help.ts"
import { fail, payloadText, valueOf } from "../../../patches/patch.ts"

const VALUE_FLAGS = [FROM, TO, REPO, MESSAGE, MESSAGE_FILE, INPUT_FILE]

const BARE_FLAGS = [DRY_RUN, "--help", "-h"]

export const help = {
  description: `${summary}.\n\n${DESCRIPTION}`,
  flags: FLAGS,
  positionals: [],
  exits: EXITS,
}

export interface Pair {
  readonly from: string
  readonly to: string
}

export function statedPairs(argv: readonly string[]): readonly Pair[] {
  const pairs: Pair[] = []
  let pending: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token !== FROM && token !== TO) continue
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("-")) fail(`${token} needs a path`)
    at += 1
    if (token === FROM) {
      if (pending !== null) fail(`${FROM} ${pending} has no ${TO}; each pair names both sides`)
      pending = value
      continue
    }
    if (pending === null) fail(`${TO} ${value} has no ${FROM}; each pair names both sides`)
    pairs.push({ from: pending, to: value })
    pending = null
  }
  if (pending !== null) fail(`${FROM} ${pending} has no ${TO}; each pair names both sides`)
  return pairs
}

function withoutRepo(argv: readonly string[]): readonly string[] {
  const at = argv.indexOf(REPO)
  return at === -1 ? argv : [...argv.slice(0, at), ...argv.slice(at + 2)]
}

function sideOf(argv: readonly string[], paths: readonly string[], flag: string): Addressed {
  const at = addressOf(argv, paths)
  if (at === null) fail(`every ${flag} here stands inside no repository, and a move is a commit in one`)
  return at
}

function rootsFor(at: Addressed): Roots {
  return { ...rootsHere(), target: at.repo }
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
    } else {
      const bytes = readFileSync(absolute)
      if (decodeUtf8(bytes) === null) {
        refusals.push(
          `${from} is not UTF-8 text, so nothing here can read what names it or carry it — ` +
            `it begins ${leadingBytes(bytes)}`
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

function readPayload(argv: readonly string[], named: string): string {
  const text = payloadText(argv, false)
  if (text === null) fail(`${named} could not be read`)
  return text
}

function changesIn(
  text: string,
  from: string,
  moves: Moves,
  destination: Addressed
): ReadonlyMap<string, readonly EditPair[]> {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch (thrown) {
    fail(`${from} is not JSON this can read: ${thrown instanceof Error ? thrown.message : thrown}`)
  }
  const many = Array.isArray(read)
  const list: readonly unknown[] = many ? (read as readonly unknown[]) : [read]
  if (list.length === 0) fail("the payload declares no file, so it asks for no change at all")
  const landing = new Set(moves.values())
  const changes = new Map<string, readonly EditPair[]>()
  for (const [at, one] of list.entries()) {
    const where = many ? `entry ${at + 1}` : "the payload"
    if (typeof one !== "object" || one === null || Array.isArray(one)) {
      fail(`${where} is not an object`)
    }
    const entry = one as Record<string, unknown>
    const filePath = entry["file_path"]
    if (typeof filePath !== "string") fail(`${where} has no \`file_path\` string`)
    const relPath = relPathIn(destination, filePath)
    if (!landing.has(relPath)) {
      fail(
        `${relPath} is not a destination this call declares — an edit names the path a body LANDS ` +
          `on, and this call lands ${[...landing].join(", ")}`
      )
    }
    if (changes.has(relPath)) fail(`${relPath} is declared more than once`)
    try {
      changes.set(relPath, parsePairs(entry, relPath))
    } catch (thrown) {
      fail(thrown instanceof Error ? thrown.message : String(thrown))
    }
  }
  return changes
}

function edited(
  changes: ReadonlyMap<string, readonly EditPair[]>
): (relPath: string, body: string) => string {
  return (relPath, body) => {
    const pairs = changes.get(relPath)
    if (pairs === undefined) return body
    const applied = applyPairs(body, pairs)
    if ("refusal" in applied) fail(`${relPath} ${applied.refusal}`)
    return applied.body
  }
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

export default async function mv(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const stated = statedPairs(argv)
  if (stated.length === 0) fail("name at least one pair to move")
  const source = sideOf(argv, stated.map((one) => one.from), FROM)
  const destination = sideOf(withoutRepo(argv), stated.map((one) => one.to), TO)
  const moves = validatePairs(
    stated.map((one) => ({
      from: relPathIn(source, one.from),
      to: relPathIn(destination, one.to),
    })),
    source,
    destination
  )

  const inputFile = valueOf(argv, INPUT_FILE)
  const change =
    inputFile === null
      ? null
      : edited(changesIn(readPayload(argv, inputFile), inputFile, moves, destination))

  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ??
        defaultMessage(source.repo, "rename", [...moves].map(([from, to]) => `${from} to ${to}`)))

  const dryRun = argv.includes(DRY_RUN)
  const roots = rootsFor(source)
  const landing = rootsFor(destination)
  const survey = surveyRename(moves, roots, landing)
  const entries =
    change === null
      ? survey.entries
      : survey.entries.map((one) =>
          one.moved ? { ...one, body: change(one.relPath, one.body) } : one
        )
  reportRepointed("", entries)
  const importers = surveyImporters(moves, roots, landing)
  const pending = repointedBodies(importers)
  for (const one of importers) reportRepointed(`${targetRepo(one.roots)}:`, one.entries)
  const carrying = carriedFiles(moves, source, destination)
  const outcomes = [
    slugEdges(moves, roots),
    escapedSpellings(survey.escaped),
    specifierReading(survey.reading),
    ...(importers.length === 0 ? [] : [importerReading(importers)]),
  ]
  process.stderr.write(
    `${render(outcomes).join("\n")}\n` +
      (survey.quarantined.length === 0
        ? ""
        : `  quarantine           advisory        ${survey.quarantined.length} reference(s) under \`dirty/\` name a moved path and were left as written\n` +
          survey.quarantined.map((one) => `      ${one}\n`).join(""))
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
  const sources = [...moves.keys()]
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

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write(
      "This is the mv command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops mv --help`.\n"
    )
  } else {
    await mv(own)
  }
}
