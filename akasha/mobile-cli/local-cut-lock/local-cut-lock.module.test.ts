import { describe, expect, test } from "bun:test"
import {
  decideLockAcquisition,
  formatBusyError,
  formatLockRecord,
  LOCAL_CUT_LOCK_PATH,
  type LockRecord,
  parseLockRecord,
} from "./local-cut-lock.module.code.ts"

const RECORD: LockRecord = { pid: 4242, startedAtMs: 1_000_000 }

describe("formatLockRecord / parseLockRecord", () => {
  test("round-trips a record", () => {
    expect(parseLockRecord(formatLockRecord(RECORD))).toEqual(RECORD)
  })

  test("rejects empty / garbage / partial JSON (holder mid-write) as null", () => {
    expect(parseLockRecord("")).toBeNull()
    expect(parseLockRecord("{")).toBeNull()
    expect(parseLockRecord("not json")).toBeNull()
    expect(parseLockRecord('{"pid":123}')).toBeNull()
    expect(parseLockRecord('{"startedAtMs":1}')).toBeNull()
  })

  test("rejects a non-positive or non-integer pid", () => {
    expect(parseLockRecord('{"pid":0,"startedAtMs":1}')).toBeNull()
    expect(parseLockRecord('{"pid":-5,"startedAtMs":1}')).toBeNull()
    expect(parseLockRecord('{"pid":1.5,"startedAtMs":1}')).toBeNull()
  })
})

describe("decideLockAcquisition", () => {
  test("no existing lock → acquire", () => {
    expect(decideLockAcquisition(null, false)).toEqual({ kind: "acquire" })
  })

  test("live holder → busy (fail loud, never steal)", () => {
    expect(decideLockAcquisition(RECORD, true)).toEqual({ kind: "busy", holder: RECORD })
  })

  test("dead holder → steal (SIGKILL recovery, never wedges future cuts)", () => {
    expect(decideLockAcquisition(RECORD, false)).toEqual({ kind: "steal", deadPid: RECORD.pid })
  })
})

describe("formatBusyError", () => {
  test("names the holder pid, its age, the #15338 reason, and the rm remedy", () => {
    const msg = formatBusyError(RECORD, RECORD.startedAtMs + 73_000)
    expect(msg).toContain("pid 4242")
    expect(msg).toContain("73s ago")
    expect(msg).toContain("#15338")
    expect(msg).toContain(LOCAL_CUT_LOCK_PATH)
  })

  test("clamps a negative age (clock skew) to 0s rather than printing a negative", () => {
    expect(formatBusyError(RECORD, RECORD.startedAtMs - 5_000)).toContain("0s ago")
  })
})
