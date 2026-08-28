import { expect, test } from "bun:test"
import { chmodSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { frontOf } from "../write/front.ts"
import { besideOf, everyPageUnder, pagesUnder, partsIn, sidecarsOf, textAt } from "./files.ts"

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

test("everything named for a page stands beside it, whatever its ending", () => {
  const root = rootOf([
    "monday.log-day.md",
    "monday.log-day.lines.jsonl",
    "monday.log-day.lines.uncommitted.jsonl",
    "monday.log-day.shot.attachment.png",
    "monday.log-day.uncommitted.yaml",
    "tuesday.log-day.md",
    "tuesday.log-day.lines.jsonl",
  ])
  mkdirSync(`${root}/pages/day/monday.log-day.folder`)
  try {
    expect(besideOf(root, AT)).toEqual([
      "pages/day/monday.log-day.lines.jsonl",
      "pages/day/monday.log-day.lines.uncommitted.jsonl",
      "pages/day/monday.log-day.shot.attachment.png",
      "pages/day/monday.log-day.uncommitted.yaml",
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a folder that will not list refuses rather than answering nothing beside", () => {
  expect(typeof besideOf("/var/tmp/no-such-root-stands-here", AT)).toBe("string")
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

test("every kind under the root is answered, a kind with no page standing for none", () => {
  const root = rootOf(["monday.log-day.lines.jsonl"])
  writeFileSync(`${root}/pages/day/monday.log-day.md`, "")
  writeFileSync(`${root}/pages/day/vera.seat.md`, "")
  try {
    const found = everyPageUnder(root)
    if (typeof found === "string") throw new Error(found)
    expect(found.get("log-day")).toEqual(["pages/day/monday.log-day.md"])
    expect(found.get("seat")).toEqual(["pages/day/vera.seat.md"])
    expect(found.has("no-page-type-is-spelt-this-way")).toBe(false)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a root that will not list refuses every kind, rather than answering none of them", () => {
  expect(typeof everyPageUnder("/var/tmp/no-such-root-stands-here")).toBe("string")
})

test("a folder below the root that will not list refuses the wider walk too", () => {
  const root = rootOf([])
  writeFileSync(`${root}/pages/day/monday.log-day.md`, "")
  mkdirSync(`${root}/pages/shut`)
  chmodSync(`${root}/pages/shut`, 0o000)
  try {
    expect(typeof everyPageUnder(root)).toBe("string")
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

const bodyThrough = (body: string): string => {
  const composed = frontOf({
    pageType: "log-day",
    id: "019ffe30-e158-7000-8ab9-73591dbe0225",
    entries: [["title", { kind: "value", raw: "Monday" }]],
    body,
  })
  if (composed.kind !== "text") throw new Error(composed.why)
  const parts = partsIn(composed.text)
  if (typeof parts === "string") throw new Error(parts)
  return parts.body
}

test("the body a page was composed with is the body read back out of it", () => {
  expect(bodyThrough("# Monday\n\nWhat stood.\n")).toBe("# Monday\n\nWhat stood.\n")
  expect(bodyThrough("\n# Monday\n")).toBe("\n# Monday\n")
  expect(bodyThrough("")).toBe("")
})

test("the break after the closing fence stands with the fence, not at the head of the body", () => {
  const parts = partsIn("---\ntitle: Monday\n---\n# Monday\n")
  if (typeof parts === "string") throw new Error(parts)
  expect(parts.stated).toEqual({ title: "Monday" })
  expect(parts.body).toBe("# Monday\n")
})

test("a body opening on a blank line keeps that line", () => {
  const parts = partsIn("---\ntitle: Monday\n---\n\n# Monday\n")
  if (typeof parts === "string") throw new Error(parts)
  expect(parts.body).toBe("\n# Monday\n")
})

test("a page with nothing after its frontmatter holds an empty body", () => {
  const parts = partsIn("---\ntitle: Monday\n---\n")
  if (typeof parts === "string") throw new Error(parts)
  expect(parts.body).toBe("")
})

test("a text opening on no fence states nothing rather than being split", () => {
  expect(typeof partsIn("# Monday\n")).toBe("string")
})

test("a fence opened and never closed states nothing rather than taking the file", () => {
  expect(typeof partsIn("---\ntitle: Monday\n")).toBe("string")
})

test("frontmatter that will not parse states nothing rather than throwing", () => {
  expect(typeof partsIn("---\nkeys: [one, two\n---\n# Monday\n")).toBe("string")
})

test("frontmatter that is a list rather than a set of keys states nothing", () => {
  expect(typeof partsIn("---\n- one\n---\n# Monday\n")).toBe("string")
})

test("a longer rule of dashes closes nothing, rather than leaking its extra dash into the body", () => {
  expect(partsIn("---\ntitle: Monday\n----\n# Monday\n")).toBe(
    "states nothing: its frontmatter is opened and never closed"
  )
})

test("a fence line carrying anything after the dashes closes nothing", () => {
  expect(partsIn("---\ntitle: Monday\n--- and more\n# Monday\n")).toBe(
    "states nothing: its frontmatter is opened and never closed"
  )
})

test("frontmatter closed with nothing in it is unreadable, never unclosed", () => {
  expect(partsIn("---\n---\n# Monday\n")).toBe(
    "states nothing readable: its frontmatter is not a set of keys"
  )
})
