const STATUS_CODES = new Set([" ", "M", "A", "D", "R", "C", "U", "T", "?", "!"])

export interface PorcelainEntry {
  readonly index: string
  readonly worktree: string
  readonly path: string
  readonly origPath: string | undefined
}

export type PorcelainParse =
  | { readonly ok: true; readonly entries: readonly PorcelainEntry[] }
  | { readonly ok: false; readonly error: string }

export const PORCELAIN_STATUS_ARGS: readonly string[] = ["status", "--porcelain", "-z"]

export function parsePorcelainStatusZ(stdout: string): PorcelainParse {
  const records = stdout.split("\0")
  if (records[records.length - 1] === "") records.pop()

  const entries: PorcelainEntry[] = []
  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    if (record === undefined || record === "") continue

    const index = record[0] ?? ""
    const worktree = record[1] ?? ""
    if (
      record.length < 4 ||
      record[2] !== " " ||
      !STATUS_CODES.has(index) ||
      !STATUS_CODES.has(worktree) ||
      (index === " " && worktree === " ")
    ) {
      return {
        ok: false,
        error: `unreadable porcelain record ${JSON.stringify(record)} — expected two status columns, a space, then a path. Stdout that has been trimmed or reflowed loses the first record's leading column and produces exactly this.`,
      }
    }

    let origPath: string | undefined
    if (index === "R" || index === "C") {
      i += 1
      const orig = records[i]
      if (orig === undefined || orig === "") {
        return {
          ok: false,
          error: `porcelain record ${JSON.stringify(record)} is a ${index === "R" ? "rename" : "copy"} with no origin field following it`,
        }
      }
      origPath = orig
    }

    entries.push({ index, worktree, path: record.slice(3), origPath })
  }

  return { ok: true, entries }
}

export function formatPorcelainEntry(entry: PorcelainEntry): string {
  const path = entry.origPath === undefined ? entry.path : `${entry.origPath} -> ${entry.path}`
  return `${entry.index}${entry.worktree} ${path}`
}
