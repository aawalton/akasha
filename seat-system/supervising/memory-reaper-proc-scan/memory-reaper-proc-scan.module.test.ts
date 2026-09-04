import { describe, expect, test } from "bun:test"
import {
  isContainerCgroup,
  isSafePath,
  isSafeSubcommandWord,
  MAX_ARGV_TOKENS,
  REDACTED,
  redactArgv,
  redactProcCmdline,
  UNCLASSIFIED,
} from "./memory-reaper-proc-scan.module.code.ts"

describe("isSafeSubcommandWord", () => {
  test("takes a lower-case word", () => {
    expect(isSafeSubcommandWord("seat")).toBe(true)
    expect(isSafeSubcommandWord("seat-start")).toBe(true)
  })

  test("refuses anything else", () => {
    expect(isSafeSubcommandWord("Seat")).toBe(false)
    expect(isSafeSubcommandWord("-seat")).toBe(false)
    expect(isSafeSubcommandWord("")).toBe(false)
  })
})

describe("isSafePath", () => {
  test("takes a rooted path", () => {
    expect(isSafePath("/var/home/walton/repos/akasha")).toBe(true)
  })

  test("takes a relative path to a source file", () => {
    expect(isSafePath("tools/lib/shape.ts")).toBe(true)
  })

  test("refuses a token holding no slash", () => {
    expect(isSafePath("akasha")).toBe(false)
  })

  test("refuses a rooted path holding a space", () => {
    expect(isSafePath("/var/home/a b/c")).toBe(false)
  })
})

describe("redactArgv", () => {
  test("keeps a value under a flag known safe", () => {
    expect(redactArgv(["bun", "--model", "opus"])).toEqual(["bun", "--model", "opus"])
  })

  test("withholds a value under a flag naming a credential", () => {
    expect(redactArgv(["bun", "--api-key", "sk-live-1"])).toEqual(["bun", "--api-key", REDACTED])
  })

  test("withholds a value under a flag it does not know", () => {
    expect(redactArgv(["bun", "--wobble", "whatever"])).toEqual(["bun", "--wobble", UNCLASSIFIED])
  })

  test("withholds the value half of an equals form", () => {
    expect(redactArgv(["bun", "--token=abc"])).toEqual(["bun", `--token=${REDACTED}`])
    expect(redactArgv(["bun", "--wobble=abc"])).toEqual(["bun", `--wobble=${UNCLASSIFIED}`])
  })

  test("keeps the whole equals form of a flag known safe", () => {
    expect(redactArgv(["bun", "--model=opus"])).toEqual(["bun", "--model=opus"])
  })

  test("says how many tokens were dropped past the cap", () => {
    const argv = ["bun", ...Array.from({ length: MAX_ARGV_TOKENS + 4 }, () => "x")]
    const out = redactArgv(argv)
    expect(out.at(-1)).toBe("+5 more")
  })
})

describe("redactProcCmdline", () => {
  test("splits on nulls and drops the empties", () => {
    expect(redactProcCmdline("bun\0--model\0opus\0")).toEqual(["bun", "--model", "opus"])
  })

  test("reads an empty command line as nothing", () => {
    expect(redactProcCmdline("")).toEqual([])
  })
})

describe("isContainerCgroup", () => {
  test("reads a rootless-podman cgroup as a container", () => {
    expect(isContainerCgroup("0::/user.slice/libpod-abc123.scope")).toBe(true)
  })

  test("reads a plain user cgroup as no container", () => {
    expect(isContainerCgroup("0::/user.slice/user-1000.slice")).toBe(false)
  })
})
