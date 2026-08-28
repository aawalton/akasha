import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { standingAt } from "./standing.ts"

const root = mkdtempSync(join(tmpdir(), "standing-"))

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

writeFileSync(join(root, "held.jsonl"), "{}\n")
writeFileSync(join(root, "empty.jsonl"), "")
mkdirSync(join(root, "folder.jsonl"))

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
