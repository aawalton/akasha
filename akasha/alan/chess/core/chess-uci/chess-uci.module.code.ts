import { InputError } from "@akasha/errors-core/exit-code"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const UCI_MOVE = /^[a-h][1-8][a-h][1-8][qrbn]?$/
const PERFT_LINE = /^([a-h][1-8][a-h][1-8][qrbn]?): \d+$/
const PERFT_CAPTURE_SCHEMA = z.tuple([z.string()])

export function parseUciMove(raw: string): string {
  const move = raw.trim().toLowerCase()
  if (!UCI_MOVE.test(move)) {
    throw new InputError(
      `invalid move "${raw}": expected UCI long algebraic (e.g. e2e4, e7e8q), got something else`
    )
  }
  return move
}

export function parseFen(raw: string): string {
  const fen = raw.trim()
  const fields = fen.split(/\s+/)
  if (fields.length < 2) {
    throw new InputError(
      `invalid FEN "${raw}": expected at least a piece-placement field and a side-to-move`
    )
  }
  const placement = fields[0] ?? ""
  const side = fields[1] ?? ""
  const ranks = placement.split("/")
  if (ranks.length !== 8) {
    throw new InputError(`invalid FEN "${raw}": piece placement must have 8 ranks separated by "/"`)
  }
  for (const rank of ranks) {
    let count = 0
    for (const ch of rank) {
      if (/[1-8]/.test(ch)) {
        count += Number(ch)
      } else if (/[pnbrqkPNBRQK]/.test(ch)) {
        count += 1
      } else {
        throw new InputError(
          `invalid FEN "${raw}": unexpected character "${ch}" in piece placement`
        )
      }
    }
    if (count !== 8) {
      throw new InputError(
        `invalid FEN "${raw}": rank "${rank}" describes ${count} squares, expected 8`
      )
    }
  }
  if (side !== "w" && side !== "b") {
    throw new InputError(`invalid FEN "${raw}": side-to-move must be "w" or "b", got "${side}"`)
  }
  return fen
}

export function fenSideToMove(fen: string): "w" | "b" {
  return (fen.trim().split(/\s+/)[1] ?? "w") === "b" ? "b" : "w"
}

export function parsePerftMoves(lines: readonly string[]): readonly string[] {
  const moves: string[] = []
  for (const line of lines) {
    const t = line.trim()
    if (!PERFT_LINE.test(t)) {
      continue
    }
    const [move] = requireMatchPositional(PERFT_LINE, PERFT_CAPTURE_SCHEMA, t)
    moves.push(move)
  }
  return [...moves].sort()
}

export function parseDisplayedFen(lines: readonly string[]): string | null {
  for (const line of lines) {
    const t = line.trim()
    if (t.startsWith("Fen:")) {
      return t.slice("Fen:".length).trim()
    }
  }
  return null
}

export function parseCheckers(lines: readonly string[]): readonly string[] {
  for (const line of lines) {
    const t = line.trim()
    if (t.startsWith("Checkers:")) {
      return t
        .slice("Checkers:".length)
        .trim()
        .split(/\s+/)
        .filter((s) => s.length > 0)
    }
  }
  return []
}

export function isBestMoveLine(line: string): boolean {
  return line.trim().startsWith("bestmove")
}

export type ScoreKind = "cp" | "mate"

export interface ScoreInfo {
  readonly kind: ScoreKind
  readonly value: number
  readonly depth: number
  readonly pv: readonly string[]
  readonly bestMove: string | null
}

export function parseSearch(lines: readonly string[]): ScoreInfo {
  let kind: ScoreKind = "cp"
  let value = 0
  let depth = 0
  let pv: readonly string[] = []
  let sawScore = false
  let bestMove: string | null = null

  for (const line of lines) {
    const t = line.trim()
    if (t.startsWith("info ") && t.includes(" score ")) {
      const tokens = t.split(/\s+/)
      const depthIdx = tokens.indexOf("depth")
      if (depthIdx !== -1 && tokens[depthIdx + 1] !== undefined) {
        depth = Number(tokens[depthIdx + 1])
      }
      const scoreIdx = tokens.indexOf("score")
      const sk = tokens[scoreIdx + 1]
      const sv = tokens[scoreIdx + 2]
      if ((sk === "cp" || sk === "mate") && sv !== undefined) {
        kind = sk
        value = Number(sv)
        sawScore = true
      }
      const pvIdx = tokens.indexOf("pv")
      if (pvIdx !== -1) {
        pv = tokens.slice(pvIdx + 1)
      }
    } else if (isBestMoveLine(t)) {
      const mv = t.split(/\s+/)[1]
      bestMove = mv === undefined || mv === "(none)" ? null : mv
    }
  }

  if (!sawScore && bestMove === null) {
    return { kind: "mate", value: 0, depth, pv, bestMove: null }
  }
  return { kind, value, depth, pv, bestMove }
}
