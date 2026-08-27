import { describe, expect, test } from "bun:test"
import { attestationLogLines, attestationProbeProblem } from "./attest"

const SAMPLE_SHA_LINES = [
  "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08  base/data/base/1/1259",
  "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae  base/backup.info",
  "fcde2b2edba56bf408601fb721fe9b5c338d10ee429ea04fae5511b68fbf8fb9  wals/0000000100000000/000000010000000000000003",
  "18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4  wals/00000001.history",
] as const

describe("attestationLogLines", () => {
  test("emits one sha256 line per file plus a summary line", () => {
    const backupId = "20260625T030000"
    const lines = attestationLogLines(backupId, SAMPLE_SHA_LINES)

    expect(lines).toHaveLength(SAMPLE_SHA_LINES.length + 1)

    const shaLines = lines.filter((line) => line.startsWith(`backup-longtail: sha256 ${backupId} `))
    expect(shaLines).toHaveLength(SAMPLE_SHA_LINES.length)

    for (const raw of SAMPLE_SHA_LINES) {
      expect(lines).toContain(`backup-longtail: sha256 ${backupId} ${raw}`)
    }
  })

  test("summary line reports the exact file count", () => {
    const lines = attestationLogLines("20260625T030000", SAMPLE_SHA_LINES)
    expect(lines.at(-1)).toBe(
      `backup-longtail: unit 20260625T030000 attested ${SAMPLE_SHA_LINES.length} files (sha256)`
    )
  })

  test("each per-file line preserves a 64-hex sha256 hash", () => {
    const lines = attestationLogLines("20260625T030000", SAMPLE_SHA_LINES)
    const shaLines = lines.filter((line) => line.includes(" sha256 "))
    for (const line of shaLines) {
      expect(line).toMatch(/ sha256 \S+ [0-9a-f]{64} {2}\S+$/)
    }
  })

  test("empty input still records an attested-0 summary", () => {
    const lines = attestationLogLines("20260701T030000", [])
    expect(lines).toEqual(["backup-longtail: unit 20260701T030000 attested 0 files (sha256)"])
  })
})

describe("attestationProbeProblem", () => {
  const DIGEST = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
  const NAME = "probe"

  test("accepts the one well-formed line rclone returns for the probe", () => {
    expect(attestationProbeProblem([`${DIGEST}  ${NAME}`], DIGEST, NAME)).toBeNull()
  })

  test("refuses a digest that is not the independently computed sha256", () => {
    const other = "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    expect(attestationProbeProblem([`${other}  ${NAME}`], DIGEST, NAME)).toContain(other)
  })

  test("refuses any line count but one, empty output included", () => {
    expect(attestationProbeProblem([], DIGEST, NAME)).toContain("got 0")
    expect(
      attestationProbeProblem([`${DIGEST}  ${NAME}`, `${DIGEST}  other`], DIGEST, NAME)
    ).toContain("got 2")
  })

  test("refuses a line naming a file other than the probe", () => {
    expect(attestationProbeProblem([`${DIGEST}  elsewhere`], DIGEST, NAME)).toContain("elsewhere")
  })

  test("refuses output that carries no digest at all", () => {
    expect(attestationProbeProblem([""], DIGEST, NAME)).not.toBeNull()
  })
})
