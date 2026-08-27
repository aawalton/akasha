import { describe, expect, test } from "bun:test"
import type ts from "typescript"
import { repoDoc } from "../../../../tools/lib/check-workflow/remediation-doc"
import {
  dispatchToEntries,
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scannerGroupKey,
} from "./syntax-scanner-entry.ts"

const REPO_ROOT = "/planted/tree"

type EntryWithCounter = {
  readonly entry: SyntaxScannerEntry
  readonly callCount: () => number
  readonly seenFiles: () => readonly string[]
}

const mkEntry = (
  name: string,
  opts: {
    readonly preFileSkip?: (rel: string) => boolean
    readonly findingPerFile?: (sf: ts.SourceFile) => NormalizedFinding | null
  } = {}
): EntryWithCounter => {
  let calls = 0
  const seen: string[] = []
  const findFindings = (sf: ts.SourceFile): readonly NormalizedFinding[] => {
    calls += 1
    seen.push(sf.fileName)
    const fn =
      opts.findingPerFile ??
      ((s: ts.SourceFile): NormalizedFinding => ({
        file: s.fileName,
        line: 1,
        column: 1,
        message: `${name} saw ${s.fileName}`,
        groupKey: name,
      }))
    const f = fn(sf)
    return f === null ? [] : [f]
  }
  const entry: SyntaxScannerEntry = {
    name,
    ...(opts.preFileSkip ? { preFileSkip: opts.preFileSkip } : {}),
    findFindings,
    successMessage: `${name} ok`,
    remediationDoc: repoDoc(`docs/${name}.ts`),
  }
  return { entry, callCount: () => calls, seenFiles: () => seen }
}

const mkFile = (rel: string) => ({ rel, source: "const x = 1\n" })

describe("dispatchToEntries", () => {
  test("per-entry isolation: A's findings land in bucket A only, B's in bucket B only", () => {
    const a = mkEntry("A")
    const b = mkEntry("B")
    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("f1.ts")],
      entries: [a.entry, b.entry],
    })
    expect(buckets).toHaveLength(2)
    expect(buckets[0]?.name).toBe("A")
    expect(buckets[1]?.name).toBe("B")
    expect(buckets[0]?.findings.map((f) => f.groupKey)).toEqual(["A"])
    expect(buckets[1]?.findings.map((f) => f.groupKey)).toEqual(["B"])
  })

  test("registration order preserved regardless of which entries produced findings", () => {
    const producer = mkEntry("PRODUCER")
    const silent = mkEntry("SILENT", { findingPerFile: () => null })
    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("f1.ts"), mkFile("f2.ts")],
      entries: [silent.entry, producer.entry],
    })
    expect(buckets.map((b) => b.name)).toEqual(["SILENT", "PRODUCER"])
    expect(buckets[0]?.findings).toEqual([])
    expect(buckets[1]?.findings).toHaveLength(2)
  })

  test("parse-once dispatch: each entry's findFindings is called at most once per file", () => {
    const a = mkEntry("A")
    const b = mkEntry("B")
    const c = mkEntry("C")
    const files = [mkFile("f1.ts"), mkFile("f2.ts"), mkFile("f3.ts")]
    dispatchToEntries({ repoRoot: REPO_ROOT, files, entries: [a.entry, b.entry, c.entry] })
    expect(a.callCount()).toBe(files.length)
    expect(b.callCount()).toBe(files.length)
    expect(c.callCount()).toBe(files.length)
  })

  test("preFileSkip honored: findFindings is not called for skipped files", () => {
    const skipper = mkEntry("SKIPPER", {
      preFileSkip: (rel) => rel === "skip.ts",
    })
    dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("skip.ts"), mkFile("keep.ts")],
      entries: [skipper.entry],
    })
    expect(skipper.callCount()).toBe(1)
    expect(skipper.seenFiles()).toEqual(["keep.ts"])
  })

  test("per-entry isolation under skip: skipping A on F1 does not affect B's coverage", () => {
    const a = mkEntry("A", { preFileSkip: (rel) => rel === "f1.ts" })
    const b = mkEntry("B")
    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("f1.ts"), mkFile("f2.ts")],
      entries: [a.entry, b.entry],
    })
    expect(a.seenFiles()).toEqual(["f2.ts"])
    expect(b.seenFiles()).toEqual(["f1.ts", "f2.ts"])
    expect(buckets[0]?.findings.map((f) => f.file)).toEqual(["f2.ts"])
    expect(buckets[1]?.findings.map((f) => f.file)).toEqual(["f1.ts", "f2.ts"])
  })

  test("empty files: returns one empty bucket per entry, in order", () => {
    const a = mkEntry("A")
    const buckets = dispatchToEntries({ repoRoot: REPO_ROOT, files: [], entries: [a.entry] })
    expect(buckets).toEqual([{ name: "A", findings: [], offered: 0, weighed: 0 }])
    expect(a.callCount()).toBe(0)
  })

  test("offered counts every file for every entry, whatever each entry skipped", () => {
    const takesAll = mkEntry("all", { findingPerFile: () => null })
    const takesSome = mkEntry("some", {
      preFileSkip: (rel) => rel.startsWith("skip"),
      findingPerFile: () => null,
    })
    const takesNone = mkEntry("none", { preFileSkip: () => true })
    const files = [mkFile("keep1.ts"), mkFile("keep2.ts"), mkFile("skip1.ts")]

    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files,
      entries: [takesAll.entry, takesSome.entry, takesNone.entry],
    })

    expect(buckets.map((b) => b.offered)).toEqual([files.length, files.length, files.length])
    expect(buckets.map((b) => b.weighed)).toEqual([3, 2, 0])
  })

  test("weighed equals the number of times the entry's own scanner was called", () => {
    const entries = [
      mkEntry("all", { findingPerFile: () => null }),
      mkEntry("half", { preFileSkip: (rel) => rel.startsWith("skip"), findingPerFile: () => null }),
      mkEntry("none", { preFileSkip: () => true }),
    ]
    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("keep.ts"), mkFile("skip.ts")],
      entries: entries.map((e) => e.entry),
    })

    expect(buckets.map((b) => b.weighed)).toEqual(entries.map((e) => e.callCount()))
  })

  test("a scanner that weighed nothing is distinguishable from one that was clean", () => {
    const clean = mkEntry("clean", { findingPerFile: () => null })
    const blind = mkEntry("blind", { preFileSkip: () => true })
    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("a.ts"), mkFile("b.ts")],
      entries: [clean.entry, blind.entry],
    })

    const [cleanBucket, blindBucket] = buckets
    expect(cleanBucket?.findings).toEqual([])
    expect(blindBucket?.findings).toEqual([])
    expect(cleanBucket?.weighed).toBeGreaterThan(0)
    expect(blindBucket?.weighed).toBe(0)
    expect(blind.callCount()).toBe(0)
  })

  test("empty entries: returns empty bucket array regardless of file count", () => {
    const buckets = dispatchToEntries({
      repoRoot: REPO_ROOT,
      files: [mkFile("f1.ts")],
      entries: [],
    })
    expect(buckets).toEqual([])
  })
})

describe("scannerGroupKey", () => {
  test("names the doc when the entry carries one", () => {
    expect(
      scannerGroupKey({
        name: "no-class",
        findings: 1234,
        files: 56,
        remediationDoc: repoDoc("infra/cluster-checks/src/lib/x.ts"),
      })
    ).toBe("[no-class] 1,234 finding(s) across 56 file(s) → see infra/cluster-checks/src/lib/x.ts")
  })

  test("ends at the file spread when the entry carries none", () => {
    expect(scannerGroupKey({ name: "no-class", findings: 1234, files: 56 })).toBe(
      "[no-class] 1,234 finding(s) across 56 file(s)"
    )
  })
})

describe("dispatchToEntries — the run's root reaches the rule", () => {
  test("preFileSkip is handed the root the dispatch was given", () => {
    const seen: string[] = []
    const entry: SyntaxScannerEntry = {
      name: "skip-side",
      preFileSkip: (_rel, repoRoot) => {
        seen.push(repoRoot)
        return false
      },
      findFindings: () => [],
      successMessage: "ok",
    }
    dispatchToEntries({ repoRoot: REPO_ROOT, files: [mkFile("f1.ts")], entries: [entry] })
    expect(seen).toEqual([REPO_ROOT])
  })

  test("findFindings is handed the root the dispatch was given", () => {
    const seen: string[] = []
    const entry: SyntaxScannerEntry = {
      name: "scan-side",
      findFindings: (_sf, repoRoot) => {
        seen.push(repoRoot)
        return []
      },
      successMessage: "ok",
    }
    dispatchToEntries({ repoRoot: REPO_ROOT, files: [mkFile("f1.ts")], entries: [entry] })
    expect(seen).toEqual([REPO_ROOT])
  })

  test("a second dispatch under a different root is not answered from the first", () => {
    const seen: string[] = []
    const entry: SyntaxScannerEntry = {
      name: "two-roots",
      findFindings: (_sf, repoRoot) => {
        seen.push(repoRoot)
        return []
      },
      successMessage: "ok",
    }
    dispatchToEntries({ repoRoot: REPO_ROOT, files: [mkFile("f1.ts")], entries: [entry] })
    dispatchToEntries({ repoRoot: "/other/tree", files: [mkFile("f1.ts")], entries: [entry] })
    expect(seen).toEqual([REPO_ROOT, "/other/tree"])
  })
})
