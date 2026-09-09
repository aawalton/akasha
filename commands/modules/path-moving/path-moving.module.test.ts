import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { baseOf, landing } from "../landing/landing.module.code.ts"
import {
  ADMITS,
  BROKEN,
  besides,
  bytes,
  edged,
  filesIn,
  PAGE,
  rowsIn,
  scratch,
} from "../landing/landing.module.test-fixtures.ts"
import {
  blockedMoves,
  MORE,
  MOVED_BIN,
  MOVED_TO,
  moved,
  PAGE_TO,
} from "./path-moving.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a move of a tracked path lands as the rename the commit records", async () => {
  const said = await moved(MOVED_BIN, MOVED_TO)
  expect(said.tree).toContain(MOVED_TO)
  expect(said.tree).not.toContain(MOVED_BIN)
  expect(said.dirty).toBe("")
  expect([said.wrote, said.took]).toEqual([[MOVED_TO], [MOVED_BIN]])
})

test("a move of bytes that are not UTF-8 arrives byte for byte", async () => {
  expect((await moved(MOVED_BIN, MOVED_TO)).bytes).toEqual(BROKEN)
})

test("a move files the index at the path it came from and the path it landed at", async () => {
  const filed = (await moved(PAGE, PAGE_TO)).filed.join("")
  expect(filed).toContain(PAGE_TO)
  expect(filed).not.toContain(`"${PAGE}"`)
})

test("a move whose body also changed lands the rename and the new body", async () => {
  const said = await moved(PAGE, PAGE_TO, MORE)
  expect([said.body, said.dirty]).toEqual([MORE, ""])
  expect(said.tree).not.toContain(PAGE)
})

test("a path a change moves that no commit holds moves on disk and is committed nowhere", async () => {
  const root = await edged({ "one.txt": "committed" })
  writeFileSync(join(root, "held.uncommitted.ts"), "unsaid")
  const said = await landing(
    root,
    [
      ...rowsIn(root, [{ path: "new.txt", body: bytes("proposed") }]),
      { kind: "move", pathFrom: "held.uncommitted.ts", pathTo: "deep/held.uncommitted.ts" },
    ],
    "held",
    ADMITS
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "deep/held.uncommitted.ts"), "utf8")).toBe("unsaid")
  expect(existsSync(join(root, "held.uncommitted.ts"))).toBe(false)
  expect(filesIn(root)).toEqual(besides("new.txt", "one.txt"))
})

test("a move that will not go puts back the ones that went and commits nothing", async () => {
  const root = await edged({ "one.txt": "committed" })
  const was = baseOf(root)
  const change = [
    ...rowsIn(root, [{ path: "new.txt", body: bytes("proposed") }]),
    ...blockedMoves(root),
  ]
  await expect(landing(root, change, "held", ADMITS)).rejects.toThrow()
  expect(readFileSync(join(root, "one.uncommitted.ts"), "utf8")).toBe("one")
  expect(readFileSync(join(root, "two.uncommitted.ts"), "utf8")).toBe("two")
  expect(existsSync(join(root, "deep/one.uncommitted.ts"))).toBe(false)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})
