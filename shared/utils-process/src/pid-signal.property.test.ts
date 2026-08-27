import { describe, expect, test } from "bun:test"
import { collapse, folds, refuses } from "@shared/utils-narrow/collapse"
import fc from "fast-check"
import { classifyPidSignalError, type PidReading, type PidSignalReading } from "./pid-signal"

const nameOf = (reading: PidSignalReading): PidReading =>
  collapse<PidReading, PidReading>(reading, {
    signalable: folds("signalable", "identity — a test observes the reading, it does not decide"),
    "no-such-process": folds("no-such-process", "identity"),
    "exists-not-permitted": folds("exists-not-permitted", "identity"),
    unknown: folds("unknown", "identity"),
  })

function refusalFrom(reading: PidSignalReading): unknown {
  try {
    collapse<PidReading, never>(reading, {
      signalable: refuses("a plain success is not a refusal"),
      "no-such-process": refuses("a proven absence is not a refusal"),
      "exists-not-permitted": refuses("this caller declines to read EPERM"),
      unknown: refuses("an unreadable observation is a fault, not a reading"),
    })
  } catch (err) {
    return err
  }
  return undefined
}

const PROVES_ABSENCE = "ESRCH"

const KNOWN_ERRNOS = ["ESRCH", "EPERM", "EINVAL", "EACCES", "EFAULT", "ENOSYS", "EAGAIN", "EIO"]

const errnoLike = fc
  .oneof(fc.constantFrom(...KNOWN_ERRNOS), fc.string({ minLength: 1, maxLength: 12 }))
  .map((code) => Object.assign(new Error(`signal 0 failed: ${code}`), { code }))

const notErrnoShaped = fc.oneof(
  fc.constant(null),
  fc.constant(undefined),
  fc.string(),
  fc.integer(),
  fc.constant(new Error("no code property")),
  fc.record({ code: fc.integer() }),
  fc.constant({})
)

describe("never-false-dead, at the errno read", () => {
  test("no error other than ESRCH is ever classified as proof of absence", () => {
    fc.assert(
      fc.property(errnoLike, (err) => {
        if (nameOf(classifyPidSignalError(err)) === "no-such-process")
          expect(err.code).toBe(PROVES_ABSENCE)
      }),
      { numRuns: 2000 }
    )
  })

  test("a value that is not errno-shaped is never proof of absence — it is unknown", () => {
    fc.assert(
      fc.property(notErrnoShaped, (err) => {
        expect(nameOf(classifyPidSignalError(err))).toBe("unknown")
      }),
      { numRuns: 1000 }
    )
  })

  test("an unrecognised errno lands on `unknown` and CARRIES what it saw", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 12 }).filter((c) => c !== "ESRCH" && c !== "EPERM"),
        (code) => {
          const err = Object.assign(new Error("boom"), { code })
          const reading = classifyPidSignalError(err)
          expect(nameOf(reading)).toBe("unknown")
          expect(refusalFrom(reading)).toBe(err)
        }
      ),
      { numRuns: 1000 }
    )
  })

  test("the classifier is total — every input lands on a named reading", () => {
    const named: readonly PidReading[] = ["no-such-process", "exists-not-permitted", "unknown"]
    fc.assert(
      fc.property(fc.oneof(errnoLike, notErrnoShaped), (err) => {
        expect(named).toContain(nameOf(classifyPidSignalError(err)))
      }),
      { numRuns: 2000 }
    )
  })
})

describe("the two determinate errnos", () => {
  test("ESRCH is the one reading that proves absence", () => {
    expect(nameOf(classifyPidSignalError(Object.assign(new Error("x"), { code: "ESRCH" })))).toBe(
      "no-such-process"
    )
  })

  test("EPERM proves PRESENCE, and is kept distinct from a plain success", () => {
    expect(nameOf(classifyPidSignalError(Object.assign(new Error("x"), { code: "EPERM" })))).toBe(
      "exists-not-permitted"
    )
  })
})
