export interface DayWindow {
  readonly from: string
  readonly to: string
}

export interface SleepBlockInput {
  readonly title: unknown
  readonly startTime: unknown
  readonly endTime: unknown
}

export const SLEEP_PAGE_TYPES = ["daily-tracking", "session-tracking"] as const

const NOTHING_ANSWERS = [
  `nothing here reads a \`${SLEEP_PAGE_TYPES.join("` or `")}\` page,`,
  "and no caller hands in the blocks a day held,",
  "so when Alan woke is read nowhere.",
].join(" ")

function isSleepTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().toLowerCase() === "sleep"
}

export function wakeInstantFromBlocks(
  blocks: readonly SleepBlockInput[],
  esoWindow: { readonly start: Date; readonly end: Date }
): Date | null {
  const startMs = esoWindow.start.getTime()
  const endMs = esoWindow.end.getTime()
  let earliest: number | null = null
  for (const block of blocks) {
    if (!isSleepTitle(block.title)) continue
    if (typeof block.startTime !== "string" || typeof block.endTime !== "string") continue
    const blockStartMs = Date.parse(block.startTime)
    const blockEndMs = Date.parse(block.endTime)
    if (Number.isNaN(blockStartMs) || Number.isNaN(blockEndMs)) continue
    if (blockEndMs <= blockStartMs) continue
    if (blockEndMs < startMs || blockEndMs >= endMs) continue
    if (earliest === null || blockEndMs < earliest) earliest = blockEndMs
  }
  return earliest === null ? null : new Date(earliest)
}

export async function getWakeDayWindow(dayStr: string): Promise<DayWindow> {
  throw new Error(`getWakeDayWindow: ${NOTHING_ANSWERS} ${dayStr} has no window`)
}
