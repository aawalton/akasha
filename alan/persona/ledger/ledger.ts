import { DEFAULT_GREEN_DAY_POINTS } from "../../../readouts/ring/ladder/ladder.ts"
import { levelForGreenDays, percentProgressForGreenDays } from "../closeness/closeness.ts"

export const WALLPAPER_COST = 2 ** 22

const COMMIT_HEADER = /^commit [0-9a-f]/

export interface NetBytesAccumulator {
  pushLine: (line: string) => undefined
  total: () => number
}

export function createNetBytesAccumulator(): NetBytesAccumulator {
  let total = 0
  let added = 0
  let removed = 0
  let inCommit = false
  return {
    pushLine: (line: string): undefined => {
      if (COMMIT_HEADER.test(line)) {
        if (inCommit) total += Math.max(0, added - removed)
        added = 0
        removed = 0
        inCommit = true
        return undefined
      }
      if (line.startsWith("+") && !line.startsWith("+++")) {
        added += Buffer.byteLength(line, "utf8")
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        removed += Buffer.byteLength(line, "utf8")
      }
      return undefined
    },
    total: (): number => total + (inCommit ? Math.max(0, added - removed) : 0),
  }
}

export function parseNetBytes(diffText: string): number {
  const acc = createNetBytesAccumulator()
  for (const line of diffText.split("\n")) acc.pushLine(line)
  return acc.total()
}

export interface ComputeLedgerInput {
  readonly netBytes: number
  readonly wallpaperCount: number
  readonly greenDayPoints?: number
}

export interface Ledger {
  readonly netBytes: number
  readonly greenDayTotal: number
  readonly wallpaperCount: number
  readonly spent: number
  readonly balance: number
  readonly level: number
  readonly percentProgress: number
  readonly nextWallpaperDeficit: number
}

export function computeLedger(input: ComputeLedgerInput): Ledger {
  const { netBytes, wallpaperCount } = input
  const spent = WALLPAPER_COST * Math.max(0, wallpaperCount - 1)
  const balance = netBytes - spent
  const greenDayTotal = netBytes / (input.greenDayPoints ?? DEFAULT_GREEN_DAY_POINTS)
  const level = levelForGreenDays(greenDayTotal)
  const percentProgress = percentProgressForGreenDays(greenDayTotal)
  const nextWallpaperDeficit = Math.max(0, WALLPAPER_COST - balance)
  return {
    netBytes,
    greenDayTotal,
    wallpaperCount,
    spent,
    balance,
    level,
    percentProgress,
    nextWallpaperDeficit,
  }
}
