import { expect, test } from "bun:test"
import { chmodSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { pagesUnder, sidecarsOf, textAt } from "./files.ts"

const rootOf = (names: readonly string[]): string => {
  const root = mkdtempSync("/var/tmp/pages-system-files-")
  mkdirSync(`${root}/pages/day`, { recursive: true })
  for (const name of names) writeFileSync(`${root}/pages/day/${name}`, "")
  return root
}

const AT = "pages/day/monday.log-day.md"

test("the parts of a split sidecar are answered in the order their rows run", () => {
  const root = rootOf([
    "monday.log-day.lines.part3.jsonl",
    "monday.log-day.lines.jsonl",
    "monday.log-day.lines.part2.jsonl",
  ])
  try {
    expect(sidecarsOf(root, AT, "lines")).toEqual([
      "pages/day/monday.log-day.lines.jsonl",
      "pages/day/monday.log-day.lines.part2.jsonl",
      "pages/day/monday.log-day.lines.part3.jsonl",
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a tenth part follows a ninth rather than a first, a part being a number", () => {
  const root = rootOf([
    "monday.log-day.lines.part10.jsonl",
    "monday.log-day.lines.part9.jsonl",
  ])
  try {
    expect(sidecarsOf(root, AT, "lines")).toEqual([
      "pages/day/monday.log-day.lines.part9.jsonl",
      "pages/day/monday.log-day.lines.part10.jsonl",
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a sidecar not yet committed is answered too", () => {
  const root = rootOf(["monday.log-day.lines.uncommitted.jsonl"])
  try {
    expect(sidecarsOf(root, AT, "lines")).toEqual([
      "pages/day/monday.log-day.lines.uncommitted.jsonl",
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the parts of a sidecar not yet committed keep their order", () => {
  const root = rootOf([
    "monday.log-day.lines.part2.uncommitted.jsonl",
    "monday.log-day.lines.uncommitted.jsonl",
  ])
  try {
    expect(sidecarsOf(root, AT, "lines")).toEqual([
      "pages/day/monday.log-day.lines.uncommitted.jsonl",
      "pages/day/monday.log-day.lines.part2.uncommitted.jsonl",
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a sidecar under another key is not answered", () => {
  const root = rootOf(["monday.log-day.lines.jsonl", "monday.log-day.trims.jsonl"])
  try {
    expect(sidecarsOf(root, AT, "trims")).toEqual(["pages/day/monday.log-day.trims.jsonl"])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a sidecar beside another page is not answered", () => {
  const root = rootOf(["monday.log-day.lines.jsonl", "tuesday.log-day.lines.jsonl"])
  try {
    expect(sidecarsOf(root, AT, "lines")).toEqual(["pages/day/monday.log-day.lines.jsonl"])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a key that is the start of a longer key is not answered for it", () => {
  const root = rootOf(["monday.log-day.line-notes.jsonl"])
  try {
    expect(sidecarsOf(root, AT, "lines")).toEqual([])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a page holding no sidecar under a key answers none", () => {
  const root = rootOf(["monday.log-day.lines.jsonl"])
  try {
    expect(sidecarsOf(root, AT, "snapshots")).toEqual([])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a folder that will not list refuses rather than answering no sidecar", () => {
  expect(typeof sidecarsOf("/var/tmp/no-such-root-stands-here", AT, "lines")).toBe("string")
})

test("a root holding no page of a kind answers none, where a root that will not list refuses", () => {
  const root = mkdtempSync("/var/tmp/pages-system-files-")
  try {
    expect(pagesUnder(root, new Set(["log-day"]))).toEqual(new Map([["log-day", []]]))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
  expect(typeof pagesUnder("/var/tmp/no-such-root-stands-here", new Set(["log-day"]))).toBe("string")
})

test("a folder below the root that will not list refuses the walk rather than being skipped", () => {
  const root = rootOf([])
  writeFileSync(`${root}/pages/day/monday.log-day.md`, "")
  mkdirSync(`${root}/pages/shut`)
  writeFileSync(`${root}/pages/shut/tuesday.log-day.md`, "")
  chmodSync(`${root}/pages/shut`, 0o000)
  try {
    expect(typeof pagesUnder(root, new Set(["log-day"]))).toBe("string")
  } finally {
    chmodSync(`${root}/pages/shut`, 0o755)
    rmSync(root, { recursive: true, force: true })
  }
})

test("the text of a file is what the file holds", () => {
  const root = mkdtempSync("/var/tmp/pages-system-files-")
  try {
    writeFileSync(`${root}/held.txt`, "one\ntwo\n")
    expect(textAt(root, "held.txt")).toBe("one\ntwo\n")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a file that is not there holds no text", () => {
  expect(textAt("/var/tmp/no-such-root-stands-here", "held.txt")).toBeNull()
})

test("a file that is there and cannot be read refuses rather than holding no text", () => {
  const root = mkdtempSync("/var/tmp/pages-system-files-")
  writeFileSync(`${root}/shut.txt`, "one\n")
  chmodSync(`${root}/shut.txt`, 0o000)
  try {
    expect(() => textAt(root, "shut.txt")).toThrow()
  } finally {
    chmodSync(`${root}/shut.txt`, 0o644)
    rmSync(root, { recursive: true, force: true })
  }
})
