import { describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  FIRE_PATH_PROOF_RULES,
  HISTORICAL_DEFECT_RULES,
  resolvePromtool,
} from "../lib/promtool-rules.ts"
import { getRepoRoot } from "../lib/repo-root.ts"

const CHECK = join(import.meta.dir, "check-prometheus-rules.ts")
const promtoolAbsent = resolvePromtool() === null

if (promtoolAbsent) {
  console.warn(
    "[prometheus-rules.cli.test] promtool not on PATH — skipping. Install promtool " +
      "v2.54.1 locally (or run in CI, where it is provisioned into /ci-storage/tools) " +
      "to exercise this suite."
  )
}

interface CheckRun {
  readonly code: number
  readonly output: string
}

async function runCheck(args: readonly string[]): Promise<CheckRun> {
  const proc = Bun.spawn(["bun", CHECK, ...args], {
    cwd: getRepoRoot(),
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr, code] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { code, output: `${stdout}${stderr}` }
}

describe.skipIf(promtoolAbsent)("check-prometheus-rules", () => {
  test("goes RED (exit 1) on the #15577 historical defect", async () => {
    const dir = mkdtempSync(join(tmpdir(), "prom-rules-test-"))
    try {
      const defectPath = join(dir, "defect.yml")
      writeFileSync(defectPath, HISTORICAL_DEFECT_RULES)
      expect((await runCheck(["--rules-file", defectPath])).code).toBe(1)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("goes RED (exit 1) when the fixtures fail against the rules under test", async () => {
    const dir = mkdtempSync(join(tmpdir(), "prom-rules-test-"))
    try {
      const rulesPath = join(dir, "unrelated-rules.yml")
      writeFileSync(rulesPath, FIRE_PATH_PROOF_RULES)
      const run = await runCheck(["--rules-file", rulesPath])
      expect(run.output).toContain("parses")
      expect(run.output).toContain("rule unit tests failed against")
      expect(run.code).toBe(1)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("goes GREEN (exit 0) on the composed ALERT_RULES", async () => {
    const run = await runCheck([])
    expect(run.output).toContain("fire-proof self-proof OK")
    expect(run.code).toBe(0)
  })
})
