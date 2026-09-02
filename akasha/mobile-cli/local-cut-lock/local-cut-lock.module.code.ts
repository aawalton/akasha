import { closeSync, openSync, readFileSync, unlinkSync, writeSync } from "node:fs"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { expandTilde } from "@akasha/utils-fs/expand-tilde"
import { pidAliveOrAssumeDead } from "@akasha/utils-process/pid-signal"
import { z } from "zod"

export const LOCAL_CUT_LOCK_PATH = "~/.mobile-cut-testflight.lock"

const lockRecordSchema = z
  .object({
    pid: z.number().int().positive(),
    startedAtMs: z.number().finite(),
  })
  .strict()

export type LockRecord = z.infer<typeof lockRecordSchema>

export function formatLockRecord(record: LockRecord): string {
  return JSON.stringify(record)
}

export function parseLockRecord(raw: string): LockRecord | null {
  try {
    const result = lockRecordSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : null
  } catch {
    return null
  }
}

function isErrnoException(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && "code" in err
}

export type LockDecision =
  | { readonly kind: "acquire" }
  | { readonly kind: "steal"; readonly deadPid: number }
  | { readonly kind: "busy"; readonly holder: LockRecord }

export function decideLockAcquisition(
  existing: LockRecord | null,
  holderAlive: boolean
): LockDecision {
  if (existing === null) return { kind: "acquire" }
  if (holderAlive) return { kind: "busy", holder: existing }
  return { kind: "steal", deadPid: existing.pid }
}

export function formatBusyError(holder: LockRecord, nowMs: number): string {
  const ageSeconds = Math.max(0, Math.round((nowMs - holder.startedAtMs) / 1000))
  return [
    `another \`akasha deploy\` is already running on this workstation`,
    ` (pid ${holder.pid}, started ${ageSeconds}s ago).`,
    ` Refusing to stack a concurrent cut: the mac build mutex engages only AFTER`,
    ` script delivery, so a second cut can silently wedge the first (#15338).`,
    ` Wait for it to finish; if it is truly dead, remove ${LOCAL_CUT_LOCK_PATH}.`,
  ].join("")
}

export function acquireLocalCutLock(nowMs: number, selfPid: number): undefined {
  const path = expandTilde(LOCAL_CUT_LOCK_PATH)
  const payload = formatLockRecord({ pid: selfPid, startedAtMs: nowMs })
  for (;;) {
    try {
      const fd = openSync(path, "wx")
      writeSync(fd, payload)
      closeSync(fd)
      return
    } catch (err) {
      if (!isErrnoException(err) || err.code !== "EEXIST") throw err
    }
    let raw = ""
    try {
      raw = readFileSync(path, "utf8")
    } catch {
      continue
    }
    const existing = parseLockRecord(raw)
    if (existing === null) {
      throw new OperationalError(
        `a workstation cut lock exists but is unreadable (${LOCAL_CUT_LOCK_PATH}). If no cut is running, remove it and retry.`
      )
    }
    const decision = decideLockAcquisition(existing, pidAliveOrAssumeDead(existing.pid))
    if (decision.kind === "busy") {
      throw new OperationalError(formatBusyError(existing, nowMs))
    }
    try {
      unlinkSync(path)
    } catch {}
  }
}

export function releaseLocalCutLock(selfPid: number): undefined {
  const path = expandTilde(LOCAL_CUT_LOCK_PATH)
  try {
    const existing = parseLockRecord(readFileSync(path, "utf8"))
    if (existing?.pid === selfPid) unlinkSync(path)
  } catch {}
}
