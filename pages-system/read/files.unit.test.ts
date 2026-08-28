import { expect, test } from "bun:test"
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { sidecarsOf, textAt } from "./files.ts"

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

test("a folder that is not there answers no sidecars rather than failing", () => {
  expect(sidecarsOf("/var/tmp/no-such-root-stands-here", AT, "lines")).toEqual([])
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
