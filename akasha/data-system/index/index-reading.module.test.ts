import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { indexIn, standingById, standingByPath } from "./index-reading.module.code.ts"

const A = "01a04bdd-0000-7000-8000-00000000000a"
const B = "01a04bdd-0000-7000-8000-00000000000b"

function rootAt(): string {
  return mkdtempSync(join(tmpdir(), "akasha-reading-"))
}

function filed(root: string, at: string, lines: readonly string[]): void {
  const path = join(indexIn(root), at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${lines.join("\n")}\n`)
}

function line(path: string, id: string): string {
  return JSON.stringify({ path, id })
}

test("a path the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  filed(root, "identity/page/path/akasha/a.module.code.ts.jsonl", [line("akasha/a.module.ts", A)])

  expect(standingByPath(root, "akasha/a.module.code.ts")).toEqual([{ path: "akasha/a.module.ts", id: A }])
  rmSync(root, { recursive: true, force: true })
})

test("a page's own path is answered with itself", () => {
  const root = rootAt()
  filed(root, "identity/page/path/akasha/a.module.ts.jsonl", [line("akasha/a.module.ts", A)])

  expect(standingByPath(root, "akasha/a.module.ts")).toEqual([{ path: "akasha/a.module.ts", id: A }])
  rmSync(root, { recursive: true, force: true })
})

test("a path no page carries is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(standingByPath(root, "akasha/nowhere.module.ts")).toEqual([])
  rmSync(root, { recursive: true, force: true })
})

test("a path two pages fall on is answered with both of them", () => {
  const root = rootAt()
  filed(root, "identity/page/path/x.module.code.ts.jsonl", [
    line("x.module.code.ts", B),
    line("x.module.ts", A),
  ])

  expect(standingByPath(root, "x.module.code.ts").map((one) => one.id)).toEqual([B, A])
  rmSync(root, { recursive: true, force: true })
})

test("an id the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  filed(root, `identity/page/id/${A}.jsonl`, [line("akasha/a.module.ts", A)])

  expect(standingById(root, A)).toEqual({ path: "akasha/a.module.ts", id: A })
  expect(standingById(root, B)).toBe(null)
  rmSync(root, { recursive: true, force: true })
})
