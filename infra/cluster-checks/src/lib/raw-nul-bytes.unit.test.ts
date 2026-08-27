import { describe, expect, test } from "bun:test"
import {
  BINARY_ASSET_EXTENSIONS,
  extensionOf,
  findRawNulSites,
  isScannedTextPath,
  toRawNulViolations,
} from "./raw-nul-bytes.ts"

const bytes = (...values: readonly number[]): Uint8Array => Uint8Array.from(values)

const withNul = (text: string): Uint8Array => {
  const out: number[] = []
  for (const ch of text) out.push(ch === "@" ? 0 : (ch.codePointAt(0) ?? 0))
  return Uint8Array.from(out)
}

describe("findRawNulSites", () => {
  test("clean bytes yield no sites", () => {
    expect(findRawNulSites(withNul("const a = 1\nconst b = 2\n"))).toEqual([])
  })

  test("empty input yields no sites", () => {
    expect(findRawNulSites(bytes())).toEqual([])
  })

  test("locates a single NUL with 1-based line and column", () => {
    expect(findRawNulSites(bytes(0x61, 0x62, 0x00))).toEqual([{ line: 1, column: 3 }])
  })

  test("counts lines from newlines, resetting the column each line", () => {
    expect(findRawNulSites(bytes(0x61, 0x62, 0x0a, 0x63, 0x00))).toEqual([{ line: 2, column: 2 }])
  })

  test("locates several NULs on one line independently", () => {
    expect(findRawNulSites(withNul("a@b@c"))).toEqual([
      { line: 1, column: 2 },
      { line: 1, column: 4 },
    ])
  })

  test("locates NULs across several lines", () => {
    expect(findRawNulSites(withNul("a@\nbb@\n@"))).toEqual([
      { line: 1, column: 2 },
      { line: 2, column: 3 },
      { line: 3, column: 1 },
    ])
  })

  test("a NUL at the very first byte is line 1, column 1", () => {
    expect(findRawNulSites(bytes(0x00))).toEqual([{ line: 1, column: 1 }])
  })

  test("regression — the composite-key idiom that caused the incident", () => {
    const sites = findRawNulSites(withNul("const key = `${a}@${b}`\n"))
    expect(sites).toEqual([{ line: 1, column: 18 }])
  })

  test("the escaped form of that same idiom is clean", () => {
    expect(findRawNulSites(withNul("const key = `${a}\\u0000${b}`\n"))).toEqual([])
  })
})

describe("extensionOf", () => {
  test("returns the lowercased extension including the dot", () => {
    expect(extensionOf("packages/a/b.TS")).toBe(".ts")
    expect(extensionOf("packages/a/b.tsx")).toBe(".tsx")
  })

  test("a dotfile has no extension", () => {
    expect(extensionOf(".gitignore")).toBe("")
    expect(extensionOf("packages/a/.env")).toBe("")
  })

  test("a bare filename has no extension", () => {
    expect(extensionOf("Dockerfile")).toBe("")
    expect(extensionOf("packages/a/Makefile")).toBe("")
  })

  test("only the final extension counts", () => {
    expect(extensionOf("a/b.unit.test.ts")).toBe(".ts")
    expect(extensionOf("a/b.tar.gz")).toBe(".gz")
  })
})

describe("isScannedTextPath — denylist direction is load-bearing", () => {
  test("known binary assets are skipped", () => {
    expect(isScannedTextPath("a/icon.png")).toBe(false)
    expect(isScannedTextPath("a/voice.wav")).toBe(false)
    expect(isScannedTextPath("a/tex.dds")).toBe(false)
    expect(isScannedTextPath("a/UPPER.PNG")).toBe(false)
  })

  test("source and docs are scanned", () => {
    expect(isScannedTextPath("a/b.ts")).toBe(true)
    expect(isScannedTextPath("a/b.tsx")).toBe(true)
    expect(isScannedTextPath("a/b.lua")).toBe(true)
    expect(isScannedTextPath("a/b.md")).toBe(true)
    expect(isScannedTextPath("a/b.sh")).toBe(true)
    expect(isScannedTextPath("a/b.generated.ts")).toBe(true)
  })

  test("an UNRECOGNIZED extension is scanned, not skipped", () => {
    expect(isScannedTextPath("a/b.qqq")).toBe(true)
    expect(isScannedTextPath("a/b.some-new-format")).toBe(true)
  })

  test("extensionless files are scanned", () => {
    expect(isScannedTextPath("Dockerfile")).toBe(true)
    expect(isScannedTextPath(".gitignore")).toBe(true)
  })

  test("the denylist covers the repo's actual binary population", () => {
    for (const ext of [".png", ".jpg", ".ico", ".wav", ".dds"]) {
      expect(BINARY_ASSET_EXTENSIONS.has(ext)).toBe(true)
    }
  })
})

describe("toRawNulViolations", () => {
  test("a clean file yields no violations", () => {
    expect(toRawNulViolations("a/b.ts", withNul("clean\n"))).toEqual([])
  })

  test("carries file, position, and remediation message per NUL", () => {
    expect(toRawNulViolations("a/b.ts", withNul("x@\n@"))).toEqual([
      {
        file: "a/b.ts",
        line: 1,
        column: 2,
        message: "raw NUL byte — replace with the 4-digit unicode escape",
      },
      {
        file: "a/b.ts",
        line: 2,
        column: 1,
        message: "raw NUL byte — replace with the 4-digit unicode escape",
      },
    ])
  })
})
