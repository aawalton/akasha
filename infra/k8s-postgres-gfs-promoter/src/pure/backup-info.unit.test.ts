import { describe, expect, test } from "bun:test"
import { parseBackupInfo } from "./backup-info"

const sampleLines: readonly string[] = [
  "backup_label=None",
  "begin_offset=40",
  "begin_time=2026-07-02 03:00:00.692835+00:00",
  "begin_wal=000000070000015E0000002B",
  "begin_xlog=15E/2B000028",
  "compression=gzip",
  "config_file=/var/lib/postgresql/data/pgdata/postgresql.conf",
  "copy_stats={'total_time': 251.32, 'number_of_workers': 2}",
  "deduplication_ratio=0.0",
  "end_offset=104",
  "end_time=2026-07-02 03:04:11.128460+00:00",
  "end_wal=000000070000015E00000040",
  "end_xlog=15E/40000068",
  "error=None",
  "hba_file=/var/lib/postgresql/data/pgdata/pg_hba.conf",
  "mode=concurrent",
  "pgdata=/var/lib/postgresql/data/pgdata",
  "server_name=postgres-cnpg",
  "size=None",
  "status=DONE",
  "systemid=7345678901234567890",
  "timeline=7",
  "version=170004",
]

function sampleText(
  mutate: (lines: readonly string[]) => readonly string[] = (lines) => lines
): string {
  return mutate([...sampleLines]).join("\n")
}

describe("parseBackupInfo", () => {
  test("extracts the four needed fields from a realistic sample", () => {
    const info = parseBackupInfo(sampleText())
    expect(info).toEqual({
      beginTimeIso: "2026-07-02 03:00:00.692835+00:00",
      beginWal: "000000070000015E0000002B",
      endWal: "000000070000015E00000040",
      status: "DONE",
    })
  })

  test("splits on the first = only — values containing = survive", () => {
    const text = sampleText((lines) =>
      lines.map((line) =>
        line.startsWith("error=") ? "error=option --checkpoint=immediate rejected" : line
      )
    )
    const info = parseBackupInfo(text)
    expect(info.endWal).toBe("000000070000015E00000040")
  })

  test("tolerates blank lines and ignores unknown keys", () => {
    const text = `\n${sampleText()}\n\nfuture_field=whatever\n`
    expect(parseBackupInfo(text).beginWal).toBe("000000070000015E0000002B")
  })

  test("a FAILED-status file still parses", () => {
    const text = sampleText((lines) =>
      lines.map((line) => (line === "status=DONE" ? "status=FAILED" : line))
    )
    expect(parseBackupInfo(text).status).toBe("FAILED")
  })

  test("missing end_wal throws an error naming the field", () => {
    const text = sampleText((lines) => lines.filter((line) => !line.startsWith("end_wal=")))
    expect(() => parseBackupInfo(text)).toThrow(/end_wal/)
  })

  test("malformed begin_wal (lowercase hex) throws an error naming the field", () => {
    const text = sampleText((lines) =>
      lines.map((line) =>
        line.startsWith("begin_wal=") ? "begin_wal=000000070000015e0000002b" : line
      )
    )
    expect(() => parseBackupInfo(text)).toThrow(/begin_wal/)
  })

  test("malformed end_wal (wrong length) throws an error naming the field", () => {
    const text = sampleText((lines) =>
      lines.map((line) => (line.startsWith("end_wal=") ? "end_wal=015E0040" : line))
    )
    expect(() => parseBackupInfo(text)).toThrow(/end_wal/)
  })

  test("missing status throws an error naming the field", () => {
    const text = sampleText((lines) => lines.filter((line) => !line.startsWith("status=")))
    expect(() => parseBackupInfo(text)).toThrow(/status/)
  })
})
