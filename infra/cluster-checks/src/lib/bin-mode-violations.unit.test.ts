import { describe, expect, test } from "bun:test"
import {
  type BinTargetPath,
  extractBinTargets,
  findBinModeViolations,
  parseManifest,
} from "./bin-mode-violations.ts"

describe("extractBinTargets", () => {
  test("object-form bin emits one entry per key", () => {
    const got = extractBinTargets(
      {
        name: "@shared/utils-system",
        bin: { "utils-system": "./src/cli.ts", aux: "./bin/aux.ts" },
      },
      "shared/utils-system/package.json"
    )
    expect(got).toEqual([
      {
        pkgName: "@shared/utils-system",
        pkgJsonPath: "shared/utils-system/package.json",
        command: "utils-system",
        target: "shared/utils-system/src/cli.ts",
      },
      {
        pkgName: "@shared/utils-system",
        pkgJsonPath: "shared/utils-system/package.json",
        command: "aux",
        target: "packages/shared/utils/system/bin/aux.ts",
      },
    ])
  })

  test("string-form bin uses the unscoped package name as command", () => {
    const got = extractBinTargets(
      { name: "@temper/shared-build-deploy-lua-runner", bin: "./src/cli.ts" },
      "temper/shared-build-deploy-lua-runner--from-instructions/package.json"
    )
    expect(got).toEqual([
      {
        pkgName: "@temper/shared-build-deploy-lua-runner",
        pkgJsonPath: "temper/shared-build-deploy-lua-runner--from-instructions/package.json",
        command: "shared-build-deploy-lua-runner",
        target: "packages/temper/shared/build-deploy/lua-runner/src/cli.ts",
      },
    ])
  })

  test("string-form bin on an unscoped package uses the name verbatim", () => {
    const got = extractBinTargets(
      { name: "unscoped-tool", bin: "./src/cli.ts" },
      "packages/x/unscoped-tool/package.json"
    )
    expect(got[0]?.command).toBe("unscoped-tool")
  })

  test("missing bin returns no entries", () => {
    expect(extractBinTargets({ name: "@x/y" }, "packages/x/y/package.json")).toEqual([])
  })

  test("string-form bin without a `name` throws (no command derivable)", () => {
    expect(() => extractBinTargets({ bin: "./src/cli.ts" }, "packages/x/y/package.json")).toThrow(
      /no `name`/
    )
  })

  test("object-form bin without a `name` throws (no package to attribute targets to)", () => {
    expect(() =>
      extractBinTargets({ bin: { y: "./src/cli.ts" } }, "packages/x/y/package.json")
    ).toThrow(/no `name`/)
  })

  test("a manifest with neither bin nor name is examined and in scope for nothing", () => {
    expect(extractBinTargets({}, "packages/x/y/package.json")).toEqual([])
  })

  test("normalizes targets without a leading './' the same way", () => {
    const got = extractBinTargets(
      { name: "@x/y", bin: { y: "src/cli.ts" } },
      "packages/x/y/package.json"
    )
    expect(got[0]?.target).toBe("packages/x/y/src/cli.ts")
  })

  test("root package.json resolves targets relative to the repo root", () => {
    const got = extractBinTargets(
      { name: "root", bin: { foo: "./scripts/foo.ts" } },
      "package.json"
    )
    expect(got[0]?.target).toBe("scripts/foo.ts")
  })
})

describe("parseManifest", () => {
  test("reads `name` and `bin` off a manifest and keeps the fields it ignores", () => {
    const got = parseManifest('{"name":"@x/y","bin":{"y":"./src/cli.ts"},"version":"1.0.0"}')
    expect(got.name).toBe("@x/y")
    expect(got.bin).toEqual({ y: "./src/cli.ts" })
  })

  test("bytes that are not JSON throw, and the reason says so", () => {
    expect(() => parseManifest("{not json")).toThrow(/not JSON/)
  })

  test("JSON off the manifest shape throws, and the reason names the field", () => {
    expect(() => parseManifest('{"name":"@x/y","bin":{"y":3}}')).toThrow(/— bin:/)
  })

  test("a `name` that is not a string throws rather than being read past", () => {
    expect(() => parseManifest('{"name":5,"bin":"./src/cli.ts"}')).toThrow(/— name:/)
  })

  test("JSON that is not an object at all throws", () => {
    expect(() => parseManifest('"a string manifest"')).toThrow()
  })
})

describe("findBinModeViolations", () => {
  const e = (overrides: Partial<BinTargetPath>): BinTargetPath => ({
    pkgName: "@x/y",
    pkgJsonPath: "packages/x/y/package.json",
    command: "y",
    target: "packages/x/y/src/cli.ts",
    ...overrides,
  })

  test("returns empty when every target is mode 100755", () => {
    const entries = [e({}), e({ command: "z", target: "packages/x/y/bin/z.ts" })]
    const violations = findBinModeViolations(entries, () => "100755")
    expect(violations).toEqual([])
  })

  test("emits a violation when target is mode 100644", () => {
    const entries = [e({})]
    const violations = findBinModeViolations(entries, () => "100644")
    expect(violations).toEqual([
      {
        pkgName: "@x/y",
        pkgJsonPath: "packages/x/y/package.json",
        command: "y",
        target: "packages/x/y/src/cli.ts",
        actualMode: "100644",
      },
    ])
  })

  test("untracked targets are reported with actualMode '(untracked)'", () => {
    const entries = [e({})]
    const violations = findBinModeViolations(entries, () => undefined)
    expect(violations[0]?.actualMode).toBe("(untracked)")
  })

  test("sorts violations by (pkgJsonPath, command)", () => {
    const entries: BinTargetPath[] = [
      e({ pkgJsonPath: "packages/b/package.json", command: "z", target: "packages/b/z.ts" }),
      e({ pkgJsonPath: "packages/a/package.json", command: "b", target: "packages/a/b.ts" }),
      e({ pkgJsonPath: "packages/a/package.json", command: "a", target: "packages/a/a.ts" }),
    ]
    const violations = findBinModeViolations(entries, () => "100644")
    expect(violations.map((v) => `${v.pkgJsonPath}#${v.command}`)).toEqual([
      "packages/a/package.json#a",
      "packages/a/package.json#b",
      "packages/b/package.json#z",
    ])
  })

  test("mixed-mode input emits violations only for non-0755 entries", () => {
    const okEntry = e({ command: "ok", target: "packages/x/y/ok.ts" })
    const badEntry = e({ command: "bad", target: "packages/x/y/bad.ts" })
    const modes: Record<string, string> = {
      "packages/x/y/ok.ts": "100755",
      "packages/x/y/bad.ts": "100644",
    }
    const violations = findBinModeViolations([okEntry, badEntry], (t) => modes[t])
    expect(violations.map((v) => v.command)).toEqual(["bad"])
  })
})
