import { z } from "zod"

export interface BackupInfo {
  readonly beginTimeIso: string
  readonly beginWal: string
  readonly endWal: string
  readonly status: string
}

const WAL_SEGMENT_PATTERN = /^[0-9A-F]{24}$/

const rawBackupInfoSchema = z.object({
  begin_time: z.string().min(1),
  begin_wal: z.string().regex(WAL_SEGMENT_PATTERN),
  end_wal: z.string().regex(WAL_SEGMENT_PATTERN),
  status: z.string().min(1),
})

export function parseBackupInfo(text: string): BackupInfo {
  const record: Record<string, string> = {}
  for (const line of text.split("\n")) {
    const eq = line.indexOf("=")
    if (eq === -1) continue
    record[line.slice(0, eq)] = line.slice(eq + 1)
  }

  const parsed = rawBackupInfoSchema.safeParse(record)
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path.join(".")))]
    throw new Error(`backup.info missing or malformed field(s): ${fields.join(", ")}`)
  }

  return {
    beginTimeIso: parsed.data.begin_time,
    beginWal: parsed.data.begin_wal,
    endWal: parsed.data.end_wal,
    status: parsed.data.status,
  }
}
