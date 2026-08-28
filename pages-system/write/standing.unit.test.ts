import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { frontOf } from "./front.ts"
import { standingAt, standingPageAt } from "./standing.ts"

const root = mkdtempSync(join(tmpdir(), "standing-"))

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

writeFileSync(join(root, "held.jsonl"), "{}\n")
writeFileSync(join(root, "empty.jsonl"), "")
mkdirSync(join(root, "folder.jsonl"))

writeFileSync(join(root, "spaced.md"), "---\na: 1\n---\n\nHello\n")
writeFileSync(join(root, "tight.md"), "---\na: 1\n---\nHello\n")
writeFileSync(join(root, "bodiless.md"), "---\na: 1\n---\n")
writeFileSync(join(root, "unfenced.md"), "hello\n")
writeFileSync(join(root, "listed.md"), "---\n- one\n---\n")
mkdirSync(join(root, "folder.md"))

describe("standingAt — only nothing there may answer as nothing", () => {
  it("answers none where no file is there, which is the one empty a caller may act on", () => {
    expect(standingAt(root, "absent.jsonl")).toEqual({ kind: "none" })
  })

  it("answers standing with the text where a file is there", () => {
    expect(standingAt(root, "held.jsonl")).toEqual({ kind: "standing", text: "{}\n" })
  })

  it("tells a file holding nothing from no file at all, which no length can", () => {
    expect(standingAt(root, "empty.jsonl")).toEqual({ kind: "standing", text: "" })
  })

  it("answers unreadable rather than none where the read failed, so no write lands over it", () => {
    const held = standingAt(root, "folder.jsonl")
    expect(held.kind).toBe("unreadable")
  })
})

describe("standingPageAt — a page comes back as what it states and what follows", () => {
  it("answers none where no page is there", () => {
    expect(standingPageAt(root, "absent.md")).toEqual({ kind: "none" })
  })

  it("keeps the blank line a body opens with, which belongs to the body", () => {
    expect(standingPageAt(root, "spaced.md")).toEqual({
      kind: "standing",
      parts: { stated: { a: 1 }, body: "\nHello\n" },
    })
  })

  it("gives the line after the closing fence to the body, and the newline to the fence", () => {
    expect(standingPageAt(root, "tight.md")).toEqual({
      kind: "standing",
      parts: { stated: { a: 1 }, body: "Hello\n" },
    })
  })

  it("answers an empty body where a page states keys and says nothing after them", () => {
    expect(standingPageAt(root, "bodiless.md")).toEqual({
      kind: "standing",
      parts: { stated: { a: 1 }, body: "" },
    })
  })

  it("answers unreadable where a page opens with no frontmatter", () => {
    expect(standingPageAt(root, "unfenced.md")).toEqual({
      kind: "unreadable",
      why: "states nothing: it opens with no frontmatter",
    })
  })

  it("answers unreadable where the frontmatter is a list rather than a set of keys", () => {
    expect(standingPageAt(root, "listed.md")).toEqual({
      kind: "unreadable",
      why: "states nothing readable: its frontmatter is not a set of keys",
    })
  })

  it("answers unreadable rather than none where the read failed", () => {
    expect(standingPageAt(root, "folder.md").kind).toBe("unreadable")
  })

  it("gives back the body a composed page was handed, byte for byte", () => {
    const composed = frontOf({
      pageType: "domain",
      id: "019eb900-4c8c-7304-aae1-b287c6b53b3e",
      entries: [],
      body: "\n# Definition\n\n- **Held** — a thing.\n",
    })
    if (composed.kind !== "text") throw new Error(composed.why)
    writeFileSync(join(root, "round.md"), composed.text)
    expect(standingPageAt(root, "round.md")).toEqual({
      kind: "standing",
      parts: {
        stated: {
          "page-type-slug": "domain",
          id: "019eb900-4c8c-7304-aae1-b287c6b53b3e",
        },
        body: "\n# Definition\n\n- **Held** — a thing.\n",
      },
    })
  })
})
