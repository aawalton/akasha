export const LICHESS_PUZZLE_URL = "https://database.lichess.org/lichess_db_puzzle.csv.zst"

export const DEFAULT_INGEST_LIMIT = 10000

export const PUZZLE_LICENSE = "CC0-1.0"

const BATCH_SIZE = 250

const EXIT_WAIT_MS = 30_000

export type SolverColor = "white" | "black"

export interface ParsedPuzzle {
  readonly puzzleId: string
  readonly fen: string
  readonly moves: readonly string[]
  readonly rating: number
  readonly ratingDeviation: number
  readonly popularity: number
  readonly nbPlays: number
  readonly themes: readonly string[]
  readonly gameUrl: string
  readonly openingTags: readonly string[]
}

export type IngestSource =
  | { readonly kind: "file"; readonly path: string }
  | { readonly kind: "url"; readonly url: string }

export interface IngestArgs {
  readonly source?: IngestSource
  readonly limit?: number
  readonly all?: boolean
  readonly minRating?: number
  readonly maxRating?: number
  readonly themes?: readonly string[]
}

export interface IngestCounts {
  readonly read: number
  readonly skipped: number
  readonly matched: number
  readonly written: number
}

export type Batch = (puzzles: readonly ParsedPuzzle[]) => undefined

export function parseHeader(line: string): readonly string[] {
  return line.split(",").map((c) => c.trim())
}

export function assembleRow(
  header: readonly string[],
  line: string
): Record<string, string> | null {
  const fields = line.split(",")
  if (fields.length !== header.length) return null
  const row: Record<string, string> = {}
  for (let i = 0; i < header.length; i += 1) {
    const key = header[i]
    if (key === undefined) return null
    row[key] = fields[i] ?? ""
  }
  return row
}

function splitTokens(field: string): readonly string[] {
  return field
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

function wholeNumber(row: Record<string, string>, column: string): number {
  const raw = (row[column] ?? "").trim()
  const one = Number(raw)
  if (raw === "" || !Number.isInteger(one)) {
    throw new Error(`column ${column} carries '${raw}', which is not a whole number`)
  }
  return one
}

function nonEmpty(row: Record<string, string>, column: string): string {
  const one = row[column] ?? ""
  if (one === "") throw new Error(`column ${column} carries nothing`)
  return one
}

export function parsePuzzleRow(row: Record<string, string>): ParsedPuzzle {
  return {
    puzzleId: nonEmpty(row, "PuzzleId"),
    fen: nonEmpty(row, "FEN"),
    moves: splitTokens(nonEmpty(row, "Moves")),
    rating: wholeNumber(row, "Rating"),
    ratingDeviation: wholeNumber(row, "RatingDeviation"),
    popularity: wholeNumber(row, "Popularity"),
    nbPlays: wholeNumber(row, "NbPlays"),
    themes: splitTokens(row["Themes"] ?? ""),
    gameUrl: row["GameUrl"] ?? "",
    openingTags: splitTokens(row["OpeningTags"] ?? ""),
  }
}

export function solverColorFromFen(fen: string): SolverColor | null {
  const active = fen.trim().split(/\s+/)[1]
  if (active === "w") return "black"
  if (active === "b") return "white"
  return null
}

export function puzzleToRow(puzzle: ParsedPuzzle): Record<string, unknown> {
  const row: Record<string, unknown> = {
    title: `Puzzle ${puzzle.puzzleId}`,
    puzzleId: puzzle.puzzleId,
    fen: puzzle.fen,
    moves: puzzle.moves.join(" "),
    rating: puzzle.rating,
    ratingDeviation: puzzle.ratingDeviation,
    popularity: puzzle.popularity,
    nbPlays: puzzle.nbPlays,
    themes: [...puzzle.themes],
    gameUrl: puzzle.gameUrl,
    license: PUZZLE_LICENSE,
  }
  if (puzzle.openingTags.length > 0) row["openingTags"] = [...puzzle.openingTags]
  const solverColor = solverColorFromFen(puzzle.fen)
  if (solverColor !== null) row["solverColor"] = solverColor
  return row
}

interface LineSource {
  readonly stream: ReadableStream<Uint8Array>
  readonly drained: () => Promise<void>
}

async function exitedCleanly(proc: Bun.Subprocess, what: string): Promise<void> {
  const timer = new Promise<"timeout">((resolve) =>
    setTimeout(() => resolve("timeout"), EXIT_WAIT_MS)
  )
  const outcome = await Promise.race([proc.exited, timer])
  if (outcome === "timeout") {
    proc.kill()
    throw new Error(
      `${what} had not exited ${EXIT_WAIT_MS / 1000}s after its output ended, so how much of the puzzle stream arrived is unknown`
    )
  }
  if (outcome !== 0) {
    throw new Error(
      `${what} exited ${outcome}, so the puzzle stream ended early and every count is of what arrived before it stopped`
    )
  }
}

function openLineStream(source: IngestSource): LineSource {
  if (source.kind === "file") {
    if (!source.path.endsWith(".zst")) {
      return { stream: Bun.file(source.path).stream(), drained: async () => {} }
    }
    const proc = Bun.spawn(["zstd", "-dc", source.path], { stdout: "pipe", stderr: "inherit" })
    return { stream: proc.stdout, drained: () => exitedCleanly(proc, `zstd -dc ${source.path}`) }
  }
  const proc = Bun.spawn(["zstd", "-dc"], { stdin: "pipe", stdout: "pipe", stderr: "inherit" })
  const pumped = (async (): Promise<void> => {
    const got = await fetch(source.url)
    if (!got.ok || got.body === null) {
      throw new Error(`${source.url} answered ${got.status} ${got.statusText}`)
    }
    const reader = got.body.getReader()
    for (;;) {
      const said = await reader.read()
      if (said.done) break
      proc.stdin.write(said.value)
    }
    await proc.stdin.end()
  })()
  pumped.catch(() => {})
  return {
    stream: proc.stdout,
    drained: async (): Promise<void> => {
      await pumped
      await exitedCleanly(proc, `zstd -dc <${source.url}`)
    },
  }
}

async function* readLines(stream: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let held = ""
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    held += decoder.decode(value, { stream: true })
    let at = held.indexOf("\n")
    while (at >= 0) {
      yield held.slice(0, at)
      held = held.slice(at + 1)
      at = held.indexOf("\n")
    }
  }
  if (held.length > 0) yield held
}

function carriesATheme(themes: readonly string[], wanted: readonly string[]): boolean {
  return wanted.length === 0 || wanted.some((one) => themes.includes(one))
}

export async function ingestLichessPuzzles(
  args: IngestArgs,
  batched: Batch
): Promise<IngestCounts> {
  const source: IngestSource = args.source ?? { kind: "url", url: LICHESS_PUZZLE_URL }
  const cap = args.all === true ? Number.POSITIVE_INFINITY : (args.limit ?? DEFAULT_INGEST_LIMIT)
  const wanted = args.themes ?? []

  let header: readonly string[] | null = null
  let read = 0
  let skipped = 0
  let matched = 0
  let written = 0
  let batch: ParsedPuzzle[] = []

  const flush = (): undefined => {
    if (batch.length === 0) return undefined
    batched(batch)
    written += batch.length
    batch = []
    return undefined
  }

  const lines = openLineStream(source)
  let stoppedAtCap = false
  for await (const line of readLines(lines.stream)) {
    if (line.length === 0) continue
    if (header === null) {
      header = parseHeader(line)
      continue
    }
    read += 1
    const row = assembleRow(header, line)
    if (row === null) {
      skipped += 1
      continue
    }
    let puzzle: ParsedPuzzle
    try {
      puzzle = parsePuzzleRow(row)
    } catch {
      skipped += 1
      continue
    }
    if (args.minRating !== undefined && puzzle.rating < args.minRating) continue
    if (args.maxRating !== undefined && puzzle.rating > args.maxRating) continue
    if (!carriesATheme(puzzle.themes, wanted)) continue
    matched += 1
    batch.push(puzzle)
    if (batch.length >= BATCH_SIZE) flush()
    if (written + batch.length >= cap) {
      stoppedAtCap = true
      break
    }
  }
  if (!stoppedAtCap) await lines.drained()
  flush()

  return { read, skipped, matched, written }
}
