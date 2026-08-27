import { describe, expect, test } from "bun:test"
import { OperationalError } from "@shared/errors-core/exit"
import { assertNoStdoutSentinel } from "./talosctl"

describe("assertNoStdoutSentinel", () => {
  const BANNED = ["-", "/dev/stdout", "/dev/stderr"] as const

  describe("rejects every banned value across every flag-form", () => {
    for (const banned of BANNED) {
      const cases: ReadonlyArray<readonly [string, readonly string[]]> = [
        [`-o ${banned}`, ["-o", banned]],
        [`-o=${banned}`, [`-o=${banned}`]],
        [`--output ${banned}`, ["--output", banned]],
        [`--output=${banned}`, [`--output=${banned}`]],
      ]
      for (const [label, args] of cases) {
        test(label, () => {
          expect(() => assertNoStdoutSentinel(args)).toThrow(OperationalError)
        })
      }
    }
  })

  test("error message names the offending arg and points at the tmpfile pattern", () => {
    expect(() => assertNoStdoutSentinel(["gen", "secrets", "-o", "-"])).toThrow(
      /sentinel|tmpfile|temp file/i
    )
  })

  describe("passes legitimate output paths", () => {
    test("plain absolute path", () => {
      expect(() =>
        assertNoStdoutSentinel(["gen", "secrets", "-o", "/tmp/secrets.yaml"])
      ).not.toThrow()
    })

    test("plain relative path", () => {
      expect(() => assertNoStdoutSentinel(["gen", "secrets", "-o", "secrets.yaml"])).not.toThrow()
    })

    test("--output=<path> form with a real path", () => {
      expect(() =>
        assertNoStdoutSentinel(["gen", "secrets", "--output=/tmp/secrets.yaml"])
      ).not.toThrow()
    })

    test("no -o flag at all", () => {
      expect(() => assertNoStdoutSentinel(["health", "--nodes", "10.0.0.7"])).not.toThrow()
    })

    test("path that contains 'stdout' as a substring (not the sentinel)", () => {
      expect(() =>
        assertNoStdoutSentinel(["gen", "secrets", "-o", "/tmp/stdout-backup.yaml"])
      ).not.toThrow()
    })
  })

  describe("ignores stdout-sentinel-looking values that are not -o/--output values", () => {
    test("`-` appearing as a positional argument is not the sentinel we guard against", () => {
      expect(() => assertNoStdoutSentinel(["apply-config", "-"])).not.toThrow()
    })

    test("`/dev/stdout` appearing after an unrelated flag is not guarded", () => {
      expect(() => assertNoStdoutSentinel(["read", "--read-file", "/dev/stdout"])).not.toThrow()
    })
  })
})
