import { describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { requireMatch } from "@shared/utils-narrow/require-match"
import { z } from "zod"
import { getRepoRoot } from "../lib/repo-root.ts"

const CHECK = join(import.meta.dir, "check-alert-expr-epoch-literals.ts")

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

function withScratchFile(body: string, use: (path: string) => Promise<void>): Promise<void> {
  const dir = mkdtempSync("/var/tmp/alert-epoch-population-")
  const path = join(dir, "rules.yml")
  writeFileSync(path, body)
  return use(path).finally(() => {
    rmSync(dir, { recursive: true, force: true })
  })
}

describe("check-alert-expr-epoch-literals — what it counted", () => {
  test("counts the composed corpus in rules, and in more than one of them", async () => {
    const run = await runCheck([])
    expect(run.code).toBe(0)
    const bound = requireMatch(
      /over (?<examined>\d+) of (?<total>\d+) alert rules/,
      z.object({ examined: z.string(), total: z.string() }),
      run.output,
      "the population line of check-alert-expr-epoch-literals"
    )
    expect(bound.examined).toBe(bound.total)
    expect(Number(bound.examined)).toBeGreaterThan(1)
  })

  test("refuses to certify a corpus that collapsed to no rules", async () => {
    await withScratchFile("groups: []\n", async (path) => {
      const run = await runCheck(["--rules-file", path])
      expect(run.output).toContain("EMPTY POPULATION")
      expect(run.code).toBe(2)
    })
  })
})
