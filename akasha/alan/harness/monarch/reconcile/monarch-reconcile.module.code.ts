import type { MonarchTransaction } from "../client/monarch-client.module.code.ts"
import { monthOf, monthSlugs, readMonths } from "../files/monarch-files.module.code.ts"
import { landTransactionFiles } from "../land-files/monarch-land-files.module.code.ts"

export interface FetchedWindow {
  readonly startDate: string
  readonly endDate: string
}

export interface MirroredRow {
  readonly monarchId: string
  readonly updatedAt: string | null
}

function monthsOver(
  window: FetchedWindow | undefined,
  slugs: readonly string[]
): readonly string[] {
  if (window === undefined) return slugs
  return slugs.filter(
    (slug) => slug >= monthOf(window.startDate) && slug <= monthOf(window.endDate)
  )
}

export async function mirroredWindow(window?: FetchedWindow): Promise<readonly MirroredRow[]> {
  const rows: MirroredRow[] = []
  for (const month of await readMonths(monthsOver(window, await monthSlugs()))) {
    for (const line of month.transactions) {
      if (
        window !== undefined &&
        (line.transactionDay < window.startDate || line.transactionDay > window.endDate)
      ) {
        continue
      }
      rows.push({ monarchId: line.monarchId, updatedAt: line.monarchUpdatedAt ?? null })
    }
  }
  return rows
}

export async function pendingIds(): Promise<readonly string[]> {
  const held: string[] = []
  for (const month of await readMonths()) {
    for (const line of month.transactions) {
      if (line.pending === true) held.push(line.monarchId)
    }
  }
  return held
}

const RETIRE_CEILING = 0.05

export function vanished(
  fetchedIds: ReadonlySet<string>,
  mirrored: readonly string[]
): {
  readonly gone: readonly string[]
  readonly pastCeiling: boolean
} {
  const gone = mirrored.filter((monarchId) => !fetchedIds.has(monarchId))
  return { gone, pastCeiling: gone.length > mirrored.length * RETIRE_CEILING }
}

async function retireAbsentIds(
  fetchedIds: ReadonlySet<string>,
  mirrored: readonly string[],
  scope: string
): Promise<readonly string[]> {
  const { gone, pastCeiling } = vanished(fetchedIds, mirrored)
  if (pastCeiling) {
    throw new Error(
      `reconciling ${scope} against ${fetchedIds.size} fetched transaction(s) would retire ` +
        `${gone.length} of ${mirrored.length} mirrored transaction(s), past the ` +
        `${RETIRE_CEILING * 100}% ceiling. That is the shape of a fetch that did not finish ` +
        "rather than of a deletion, so nothing was retired."
    )
  }
  if (gone.length > 0) await landTransactionFiles([], gone)
  return gone
}

async function retireAbsent(
  fetched: readonly MonarchTransaction[],
  mirrored: readonly string[],
  scope: string
): Promise<readonly string[]> {
  return retireAbsentIds(new Set(fetched.map((t) => t.id)), mirrored, scope)
}

function ids(rows: readonly MirroredRow[]): readonly string[] {
  return rows.map((row) => row.monarchId)
}

export async function clearStalePending(
  fetched: readonly MonarchTransaction[]
): Promise<readonly string[]> {
  const live = new Set(fetched.map((t) => t.id))
  const stale = (await pendingIds()).filter((monarchId) => !live.has(monarchId))
  if (stale.length > 0) await landTransactionFiles([], stale)
  return stale
}

export async function clearVanishedIdsAmong(
  fetchedIds: ReadonlySet<string>,
  rows: readonly MirroredRow[],
  scope: string
): Promise<readonly string[]> {
  return retireAbsentIds(fetchedIds, ids(rows), scope)
}

export async function clearVanishedInWindow(
  fetched: readonly MonarchTransaction[],
  window: FetchedWindow
): Promise<readonly string[]> {
  return retireAbsent(
    fetched,
    ids(await mirroredWindow(window)),
    `${window.startDate} to ${window.endDate}`
  )
}

export async function clearVanishedAgainstFullFetch(
  fetched: readonly MonarchTransaction[]
): Promise<readonly string[]> {
  return retireAbsent(fetched, ids(await mirroredWindow()), "the whole mirror")
}
