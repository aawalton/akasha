export const summary = "Move files, repoint everything that named them, and remove the orphans"

import { readFileSync } from "node:fs"
import { landMoves, type Pair, validatePairs } from "../../../move/move.ts"
import { applyPairs, type Pair as EditPair, parsePairs } from "../../../patches/edit-pairs.ts"
import { carriesBytes } from "../../../page/file-kind/carries-bytes.ts"
import { fail, payloadText, valueOf } from "../../../patches/patch.ts"
import type { Moves } from "../../../repoint/repoint.ts"
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

const VALUE_FLAGS = [FROM, TO, REPO, MESSAGE, MESSAGE_FILE, INPUT_FILE]

const BARE_FLAGS = [DRY_RUN, "--help", "-h"]

export const help = {
  description: `${summary}.\n\n${DESCRIPTION}`,
  flags: FLAGS,
  positionals: [],
  exits: EXITS,
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
    if (carriesBytes(relPath)) {
      fail(
        `${relPath} is of a file kind stating \`binary: true\`, and an edit names text — its bytes ` +
          "land at the new path exactly as they left"
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

  landMoves({
    moves,
    source,
    destination,
    message,
    dryRun: argv.includes(DRY_RUN),
    ...(change === null ? {} : { transform: change }),
  })
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
