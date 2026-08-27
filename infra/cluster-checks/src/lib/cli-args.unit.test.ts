import { describe, expect, test } from "bun:test"

import { parseArgs, STANDARD_FLAGS } from "./cli-args.ts"

describe("parseArgs", () => {
  test("boolean flag presence and absence", () => {
    const present = parseArgs(["--json"], { json: { kind: "boolean" } })
    expect(present.flags.json).toBe(true)
    const absent = parseArgs([], { json: { kind: "boolean" } })
    expect(absent.flags.json).toBe(false)
  })

  test("string flag accepts both --flag value and --flag=value", () => {
    const space = parseArgs(["--repo-root", "/tmp/r"], {
      repoRoot: { kind: "string" },
    })
    expect(space.flags.repoRoot).toBe("/tmp/r")
    const equals = parseArgs(["--repo-root=/tmp/r"], {
      repoRoot: { kind: "string" },
    })
    expect(equals.flags.repoRoot).toBe("/tmp/r")
  })

  test("csv splits on comma and trims whitespace", () => {
    const { flags } = parseArgs(["--only", "a, b ,c"], { only: { kind: "csv" } })
    expect(flags.only).toEqual(["a", "b", "c"])
    const empty = parseArgs([], { only: { kind: "csv" } })
    expect(empty.flags.only).toEqual([])
  })

  test("number parses ok and throws on NaN", () => {
    const { flags } = parseArgs(["--port", "30432"], { port: { kind: "number" } })
    expect(flags.port).toBe(30432)
    expect(() => parseArgs(["--port", "abc"], { port: { kind: "number" } })).toThrow(
      /expects a number/
    )
  })

  test("unknown flag throws by default", () => {
    expect(() => parseArgs(["--bogus"], { json: { kind: "boolean" } })).toThrow(
      "Unknown flag: --bogus"
    )
  })

  test("passthrough collects unknown flags into raw", () => {
    const result = parseArgs(
      ["--json", "--bogus"],
      { json: { kind: "boolean" } },
      {
        passthrough: true,
      }
    )
    expect(result.flags.json).toBe(true)
    expect(result.raw).toEqual(["--bogus"])
  })

  test("positionals collected in order, mixed with flags", () => {
    const { flags, positionals } = parseArgs(["a", "--json", "b", "--repo-root", "/r", "c"], {
      json: { kind: "boolean" },
      repoRoot: { kind: "string" },
    })
    expect(flags.json).toBe(true)
    expect(flags.repoRoot).toBe("/r")
    expect(positionals).toEqual(["a", "b", "c"])
  })

  test("string default applied when flag absent", () => {
    const { flags } = parseArgs([], {
      mode: { kind: "string", default: "lax" },
    })
    expect(flags.mode).toBe("lax")
  })

  test("required string throws when missing and no default", () => {
    expect(() => parseArgs([], { repoRoot: { kind: "string", required: true } })).toThrow(
      /Required flag missing: --repo-root/
    )
  })

  test("string flag without value throws", () => {
    expect(() => parseArgs(["--repo-root"], { repoRoot: { kind: "string" } })).toThrow(
      /requires a value/
    )
    expect(() =>
      parseArgs(["--repo-root", "--json"], {
        repoRoot: { kind: "string" },
        json: { kind: "boolean" },
      })
    ).toThrow(/requires a value/)
  })

  test("boolean flag rejects =value form", () => {
    expect(() => parseArgs(["--json=true"], { json: { kind: "boolean" } })).toThrow(
      /boolean and takes no value/
    )
  })

  test("STANDARD_FLAGS shape", () => {
    const { flags } = parseArgs(
      ["--json", "--repo-root=/r", "--only", "x,y", "--verbose"],
      STANDARD_FLAGS
    )
    expect(flags.json).toBe(true)
    expect(flags.repoRoot).toBe("/r")
    expect(flags.config).toBeUndefined()
    expect(flags.only).toEqual(["x", "y"])
    expect(flags.verbose).toBe(true)
  })
})

describe("a passthrough parse and a typo", () => {
  const FLAGS = { ...STANDARD_FLAGS, instructionsRoot: { kind: "string" } } as const
  const through = (argv: readonly string[]) => parseArgs(argv, FLAGS, { passthrough: true })

  test("the specimen is rejected rather than swallowed", () => {
    expect(() => through(["--instructionsRoot", "/tmp/x"])).toThrow(/--instructionsRoot/)
  })

  test("the rejection names the spelling the caller meant", () => {
    expect(() => through(["--instructionsRoot", "/tmp/x"])).toThrow(/--instructions-root/)
  })

  test("a near-miss of a STANDARD flag is caught too, not just the per-check one", () => {
    expect(() => through(["--repoRoot", "/tmp/x"])).toThrow(/--repo-root/)
    expect(() => through(["--jsn"])).toThrow(/--json/)
  })

  test("a genuinely foreign flag still passes through to raw", () => {
    const r = through(["--json", "--tree-sha", "abc123", "--some-other-tool-flag"])
    expect(r.flags.json).toBe(true)
    expect(r.raw).toContain("--tree-sha")
    expect(r.raw).toContain("--some-other-tool-flag")
  })

  test("a correct call is entirely unchanged", () => {
    const r = through(["--json", "--instructions-root", "/tmp/x", "--only", "a,b"])
    expect(r.flags.json).toBe(true)
    expect(r.flags.instructionsRoot).toBe("/tmp/x")
    expect(r.flags.only).toEqual(["a", "b"])
    expect(r.raw).toEqual([])
  })

  test("the same token is a typo here and foreign elsewhere", () => {
    expect(() => through(["--instructionsRoot", "/tmp/x"])).toThrow()
    const elsewhere = parseArgs(["--instructionsRoot", "/tmp/x"], STANDARD_FLAGS, {
      passthrough: true,
    })
    expect(elsewhere.raw).toContain("--instructionsRoot")
  })

  test("the equals form is judged on its flag name, not the whole token", () => {
    expect(() => through(["--instructionsRoot=/tmp/x"])).toThrow(/--instructions-root/)
  })

  test("non-passthrough rejects the same token, and now says what was meant", () => {
    expect(() => parseArgs(["--instructionsRoot", "/tmp/x"], FLAGS)).toThrow(/--instructions-root/)
  })
})
