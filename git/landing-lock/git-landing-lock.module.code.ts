import { readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { HARNESS_LANDING_LOCK } from "akasha/files/git-place/git-place.module.code.ts"
import { holderProcessRuns } from "akasha/files/lock-holder-runs/lock-holder-runs.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { pause } from "akasha/utils/waiting/thread-pause/thread-pause.module.code.ts"

const LANDING_CEILING_MS = 120_000
const LANDING_POLL_MS = 250

export type LandingOutcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: string }

function landingLockPath(root: string): string | null {
  const dir = gitDirIn(root)
  return dir === null ? null : join(dir, HARNESS_LANDING_LOCK)
}

export function whileHoldingLanding<T>(
  root: string,
  land: () => T,
  ceilingMs: number = LANDING_CEILING_MS
): LandingOutcome<T> {
  const path = landingLockPath(root)
  if (path === null) {
    return {
      ok: false,
      reason: `${root} is not a git checkout, so there is no landing to serialise — nothing was committed.`,
    }
  }
  const until = Date.now() + ceilingMs
  for (;;) {
    try {
      writeFileSync(path, `${process.pid}\n`, { flag: "wx" })
      break
    } catch (thrown) {
      const code = (thrown as NodeJS.ErrnoException).code
      if (code !== undefined && code !== "EEXIST") {
        return {
          ok: false,
          reason:
            `the landing lock at ${path} could not be taken (${code}), so this landing never ran — ` +
            "nothing was committed. This is the lock path failing rather than another writer holding it.",
        }
      }
      if (!holderProcessRuns(path)) {
        try {
          rmSync(path)
        } catch {}
      }
      const left = until - Date.now()
      if (left <= 0) {
        return {
          ok: false,
          reason:
            `another writer has held ${path} for ${ceilingMs / 1000}s, so this landing never ran — ` +
            "nothing was committed. Whoever holds it is alive and stuck mid-landing; read that process before clearing the file.",
        }
      }
      pause(Math.min(LANDING_POLL_MS, left))
    }
  }
  try {
    return { ok: true, value: land() }
  } finally {
    try {
      if (readFileSync(path, "utf8").trim() === String(process.pid)) rmSync(path)
    } catch {}
  }
}
