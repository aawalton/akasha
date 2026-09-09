import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import { bodiesFrom, reconcile, sweptBeside, wholeOf } from "./rebuilding.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const UNDER = "held"

const AT = "held/one.jsonl"

const GONE = "held/gone.jsonl"

function rootAt(): string {
  return scratch.rootFor("akasha-reconcile-")
}

function filed(root: string, at: string, body: string): undefined {
  mkdirSync(dirname(join(root, at)), { recursive: true })
  writeFileSync(join(root, at), body)
}

function bodyAt(root: string, at: string): string | null {
  return existsSync(join(root, at)) ? readFileSync(join(root, at), "utf8") : null
}

test("an entry no file holds is written, and an entry no page carries is taken away", () => {
  const root = rootAt()
  filed(root, GONE, "{}\n")

  const drift = reconcile(join(root, UNDER), [{ at: AT, line: "{}" }], root, true)

  expect(bodyAt(root, AT)).toBe("{}\n")
  expect(bodyAt(root, GONE)).toBe(null)
  expect(drift).toEqual({ added: [AT], changed: [], went: [GONE] })
})

test("an entry already saying what the pages say is left as the entry is", () => {
  const root = rootAt()
  filed(root, AT, "{}\n")
  const was = statSync(join(root, AT)).ino

  const drift = reconcile(join(root, UNDER), [{ at: AT, line: "{}" }], root, true)

  expect(drift).toEqual({ added: [], changed: [], went: [] })
  expect(statSync(join(root, AT)).ino).toBe(was)
})

test("an entry saying something else is written again and named as changed", () => {
  const root = rootAt()
  filed(root, AT, '{"was":1}\n')

  const drift = reconcile(join(root, UNDER), [{ at: AT, line: "{}" }], root, true)

  expect(bodyAt(root, AT)).toBe("{}\n")
  expect(drift).toEqual({ added: [], changed: [AT], went: [] })
})

test("a repair putting nothing in place writes nothing and says the same difference", () => {
  const root = rootAt()
  filed(root, GONE, "{}\n")

  const drift = reconcile(join(root, UNDER), [{ at: AT, line: "{}" }], root, false)

  expect(bodyAt(root, AT)).toBe(null)
  expect(bodyAt(root, GONE)).toBe("{}\n")
  expect(drift).toEqual({ added: [AT], changed: [], went: [GONE] })
})

test("one entry file holds every line the pages imply, each once and sorted", () => {
  const root = rootAt()

  reconcile(
    join(root, UNDER),
    [
      { at: AT, line: '{"b":1}' },
      { at: AT, line: '{"a":1}' },
      { at: AT, line: '{"a":1}' },
    ],
    root,
    true
  )

  expect(bodyAt(root, AT)).toBe('{"a":1}\n{"b":1}\n')
})

test("a folder left holding nothing goes with the entry file taken away", () => {
  const root = rootAt()
  filed(root, GONE, "{}\n")

  reconcile(join(root, UNDER), [], root, true)

  expect(existsSync(join(root, UNDER))).toBe(false)
})

test("a filing is answered as the body the entry file would hold, under its own path", () => {
  const said = bodiesFrom([{ at: AT, lines: ['{"a":1}', '{"b":1}'] }])

  expect([...said]).toEqual([[".git/data/index/held/one.jsonl", '{"a":1}\n{"b":1}\n']])
})

test("a filing holding no line is answered as a path carrying no body", () => {
  const said = bodiesFrom([{ at: GONE, lines: [] }])

  expect(said.get(".git/data/index/held/gone.jsonl")).toBeNull()
})

test("the body an entry file holds is written the way a filing is answered", () => {
  const root = rootAt()
  const lines = ['{"a":1}', '{"b":1}']

  reconcile(
    join(root, UNDER),
    lines.map((line) => ({ at: AT, line })),
    root,
    true
  )

  expect(bodyAt(root, AT)).toBe(wholeOf(lines))
})

const STAMP = "stamp.jsonl"

function indexAt(): string {
  const under = join(scratch.rootFor("akasha-swept-"), "data", "index")
  mkdirSync(under, { recursive: true })
  return under
}

test("a file at the index's own top is taken away and the index's folders are left", () => {
  const under = indexAt()
  writeFileSync(join(under, STAMP), "{}\n")
  filed(under, AT, "{}\n")

  const taken = sweptBeside(under, true)

  expect(taken).toEqual([join(under, STAMP)])
  expect(existsSync(join(under, STAMP))).toBe(false)
  expect(bodyAt(under, AT)).toBe("{}\n")
})

test("a folder beside the index opening `index.` goes and one under another name does not", () => {
  const under = indexAt()
  const beside = dirname(under)
  filed(beside, "index.refreshing.1/held/one.jsonl", "{}\n")
  filed(beside, "indexes/one.jsonl", "{}\n")

  const taken = sweptBeside(under, true)

  expect(taken).toEqual([join(beside, "index.refreshing.1")])
  expect(existsSync(join(beside, "index.refreshing.1"))).toBe(false)
  expect(existsSync(join(beside, "indexes"))).toBe(true)
})

test("an index that is not there yet sweeps nothing rather than refusing", () => {
  const root = scratch.rootFor("akasha-swept-")

  expect(sweptBeside(join(root, "data", "index"), true)).toEqual([])
})

test("a root under any other name sweeps nothing, so a test's scratch is safe", () => {
  const root = scratch.rootFor("akasha-swept-")
  const under = join(root, "scratch")
  filed(under, "one.jsonl", "{}\n")
  filed(root, "index.other/one.jsonl", "{}\n")

  const taken = sweptBeside(under, true)

  expect(taken).toEqual([])
  expect(bodyAt(under, "one.jsonl")).toBe("{}\n")
  expect(existsSync(join(root, "index.other"))).toBe(true)
})

test("a sweep putting nothing in place answers the paths and leaves them where they are", () => {
  const under = indexAt()
  const beside = dirname(under)
  writeFileSync(join(under, STAMP), "{}\n")
  filed(beside, "index.refreshing.1/held/one.jsonl", "{}\n")

  const taken = sweptBeside(under, false)

  expect(taken).toEqual([join(beside, "index.refreshing.1"), join(under, STAMP)].sort())
  expect(existsSync(join(under, STAMP))).toBe(true)
  expect(existsSync(join(beside, "index.refreshing.1"))).toBe(true)
})
