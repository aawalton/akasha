import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { PREP_FLOCK_MODE_GUARD, PRUNE_CI_STORAGE_SCRIPT } from "./prune-ci-storage-script"

async function sh(program: string): Promise<string> {
  const proc = Bun.spawn(["sh", "-c", program], { stdout: "pipe", stderr: "pipe" })
  const [out, err, code] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (code !== 0) {
    throw new Error(`sh exited ${code}: ${err}`)
  }
  return out.trim()
}

function withGuard(flockPath: string): string {
  return `umask 022
PREP_FLOCK="${flockPath}"
${PREP_FLOCK_MODE_GUARD}
stat -c %a "$PREP_FLOCK"`
}

describe("prep flock world-writable guarantee (#15270)", () => {
  let dir: string
  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "prep-flock-"))
  })
  afterAll(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  test("bare `9>` open under root umask creates a 0644 flock (the hazard)", async () => {
    const f = join(dir, "hazard.flock")
    const mode = await sh(`umask 022
( : ) 9>"${f}"
stat -c %a "${f}"`)
    expect(mode).toBe("644")
  })

  test("guard create-if-missing yields 0666", async () => {
    const f = join(dir, "missing.flock")
    expect(await sh(withGuard(f))).toBe("666")
  })

  test("guard chmods a pre-existing 0644 flock to 0666", async () => {
    const f = join(dir, "stale644.flock")
    writeFileSync(f, "", { mode: 0o644 })
    await sh(`chmod 0644 "${f}"`)
    expect(await sh(`stat -c %a "${f}"`)).toBe("644")
    expect(await sh(withGuard(f))).toBe("666")
  })

  test("guard is idempotent on an already-0666 flock", async () => {
    const f = join(dir, "cured.flock")
    expect(await sh(withGuard(f))).toBe("666")
    expect(await sh(withGuard(f))).toBe("666")
  })

  test("a `9>` open after the guard keeps the flock 0666", async () => {
    const f = join(dir, "afteropen.flock")
    const mode = await sh(`umask 022
PREP_FLOCK="${f}"
${PREP_FLOCK_MODE_GUARD}
( : ) 9>"$PREP_FLOCK"
stat -c %a "$PREP_FLOCK"`)
    expect(mode).toBe("666")
  })

  test("guard is spliced before the flock-open redirect", () => {
    const guardAt = PRUNE_CI_STORAGE_SCRIPT.indexOf("umask 0; : >")
    const openAt = PRUNE_CI_STORAGE_SCRIPT.indexOf('9>"$PREP_FLOCK"')
    expect(guardAt).toBeGreaterThan(0)
    expect(openAt).toBeGreaterThan(guardAt)
  })
})
