import { existsSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"
import { lc0Available, resolveLc0Path, runEngine } from "../engine/chess-engine.module.code.ts"
import { isBestMoveLine, parseSearch } from "../uci/chess-uci.module.code.ts"

export const MAIA_MIN_BAND = 1100
export const MAIA_MAX_BAND = 1900
const MAIA_BAND_STEP = 100

const WEIGHTS_DIR_SCHEMA = z.string().min(1).optional()

export function clampMaiaBand(elo: number): number {
  const rounded = Math.round(elo / MAIA_BAND_STEP) * MAIA_BAND_STEP
  return Math.min(MAIA_MAX_BAND, Math.max(MAIA_MIN_BAND, rounded))
}

export function maiaWeightsFilename(band: number): string {
  return `maia-${band}.pb.gz`
}

export function maiaOptions(weightsPath: string): readonly string[] {
  return [`setoption name WeightsFile value ${weightsPath}`]
}

export function maiaSearchCommands(fen: string): readonly string[] {
  return [`position fen ${fen}`, "go nodes 1"]
}

function maiaWeightsDir(): string {
  const override = WEIGHTS_DIR_SCHEMA.parse(process.env["CHESS_MAIA_WEIGHTS_DIR"])
  return override ?? join(homedir(), ".local", "share", "maia")
}

export function resolveMaiaWeights(band: number): string {
  const path = join(maiaWeightsDir(), maiaWeightsFilename(band))
  if (!existsSync(path)) {
    throw new OperationalError(
      `Maia weights not found at ${path} — download ${maiaWeightsFilename(band)} from ` +
        "https://github.com/CSSLab/maia-chess/tree/master/maia_weights into that dir " +
        "(fetch the raw .pb.gz so it stays gzipped), or set CHESS_MAIA_WEIGHTS_DIR"
    )
  }
  return path
}

export function maiaAvailable(band: number): boolean {
  if (!lc0Available()) {
    return false
  }
  return existsSync(join(maiaWeightsDir(), maiaWeightsFilename(clampMaiaBand(band))))
}

export async function playMaiaMove(fen: string, band: number): Promise<string | null> {
  const weights = resolveMaiaWeights(clampMaiaBand(band))
  const lines = await runEngine({
    bin: resolveLc0Path(),
    options: maiaOptions(weights),
    commands: maiaSearchCommands(fen),
    until: isBestMoveLine,
  })
  return parseSearch(lines).bestMove
}
