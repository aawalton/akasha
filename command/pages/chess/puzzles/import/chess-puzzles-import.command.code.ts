import type {
  Batch,
  IngestArgs,
  IngestCounts,
  ParsedPuzzle,
} from "akasha/alan/chess/modules/puzzle-lichess/chess-puzzle-lichess.module.code.ts"
import {
  ingestLichessPuzzles,
  puzzleToRow,
} from "akasha/alan/chess/modules/puzzle-lichess/chess-puzzle-lichess.module.code.ts"
import { lichess as set } from "akasha/alan/chess/puzzle-set/pages/lichess/lichess.chess-puzzle-set.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/command/argument/pages/limit.argument.ts"
import {
  answering,
  INPUT,
  keeping,
  keyedLines,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Writing,
  writingIn,
} from "akasha/command/pages/chess/modules/page-writing/chess-page-writing.module.code.ts"
import { chessPuzzlesImport as page } from "akasha/command/pages/chess/puzzles/import/chess-puzzles-import.command.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import {
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const NAMED = [json, limitArgument]

const PUZZLES = "puzzles"

export type Importing = {
  readonly ingest: (args: IngestArgs, batched: Batch) => Promise<IngestCounts>
  readonly mintId: () => string
  readonly writing: Writing
}

const LIVE: Omit<Importing, "writing"> = {
  ingest: ingestLichessPuzzles,
  mintId: uuidVersion7,
}

function rowFor(puzzle: ParsedPuzzle, id: string): Value {
  return { id, ...puzzleToRow(puzzle) }
}

function namedFor(rows: readonly Value[]): Naming {
  return {
    pageTypeSlug: slugOf(set.type),
    slug: set.slug,
    values: { title: set.title, [PUZZLES]: rows },
  }
}

function argsFor(limit: number | undefined): IngestArgs {
  return limit === undefined ? {} : { limit }
}

function limitRefused(limit: number): string {
  return (
    `\`${limitArgument.said}\` takes a whole number of one or more, and this call ` +
    `names \`${limit}\``
  )
}

function messageOf(counts: IngestCounts): string {
  return `bring ${counts.written} Lichess puzzles into the ${set.slug} set`
}

type ImportEnvelope = {
  readonly slug: string
  readonly read: number
  readonly skipped: number
  readonly matched: number
  readonly written: number
  readonly wrote: readonly string[]
}

function envelopeFor(counts: IngestCounts, wrote: readonly string[]): ImportEnvelope {
  return {
    slug: set.slug,
    read: counts.read,
    skipped: counts.skipped,
    matched: counts.matched,
    written: counts.written,
    wrote,
  }
}

function linesFor(counts: IngestCounts, wrote: readonly string[]): readonly string[] {
  return [
    ...keyedLines([
      ["read", counts.read],
      ["skipped", counts.skipped],
      ["matched", counts.matched],
      ["written", counts.written],
    ]),
    ...wrote.map((one) => `wrote ${one}`),
  ]
}

export async function importing(
  argv: readonly string[],
  ports: Importing,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  if (taken.limit !== undefined && taken.limit < 1) {
    return refused(limitRefused(taken.limit), INPUT)
  }
  return await answering(async (done) => {
    const rows: Value[] = []
    const counts = await ports.ingest(argsFor(taken.limit), (puzzles) => {
      for (const one of puzzles) rows.push(rowFor(one, ports.mintId()))
      return undefined
    })
    done.push(`${rows.length} puzzles were taken off the database`)
    const wrote = await ports.writing(done, namedFor(rows), messageOf(counts))
    if ("refused" in wrote) return keeping(done, refused(wrote.refused, wrote.code))
    if (wrote.wrong.length > 0) return keeping(done, refusedBy(wrote.wrong, OPERATIONAL))
    const said = taken.json
      ? [JSON.stringify(envelopeFor(counts, wrote.landed))]
      : linesFor(counts, wrote.landed)
    return told(said)
  })
}

export function chessPuzzlesImport(argv: readonly string[], given: Given): Promise<Answer> {
  return importing(argv, { ...LIVE, writing: writingIn(given.root) }, given.calledAs)
}
