import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import {
  bodiesFrom,
  filedUnder,
  keepDelta,
  reconcile,
  takenAway,
  wholeOf,
} from "akasha/pages/indexes/index-keeping/index-keeping.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const UNDER = "held"

const AT = "held/one.jsonl"

const GONE = "held/gone.jsonl"

const STRAY = "stray.txt"

const TWO = "held/two.jsonl"

const BLOCKED = "held/two.jsonl/inside.txt"

function rootAt(): string {
  return scratch.rootFor("akasha-reconcile-")
}

function bodyAt(root: string, at: string): string | null {
  return existsSync(join(root, at)) ? readFileSync(join(root, at), "utf8") : null
}

test("an entry no file holds is written", () => {
  const root = rootAt()

  const drift = reconcile([{ at: AT, line: "{}" }], root, true)

  expect(bodyAt(root, AT)).toBe("{}\n")
  expect(drift).toEqual({ added: [AT], changed: [] })
})

test("a file no entry names is taken away, whatever that file is named", () => {
  const root = rootAt()
  writing(root, GONE, "{}\n")
  writing(root, STRAY, "{}\n")

  const went = takenAway([{ at: AT, line: "{}" }], root, true)

  expect(bodyAt(root, GONE)).toBe(null)
  expect(bodyAt(root, STRAY)).toBe(null)
  expect(went).toEqual([GONE, STRAY])
})

test("an entry already saying what the pages say is left as the entry is", () => {
  const root = rootAt()
  writing(root, AT, "{}\n")
  const was = statSync(join(root, AT)).ino

  const drift = reconcile([{ at: AT, line: "{}" }], root, true)

  expect(drift).toEqual({ added: [], changed: [] })
  expect(statSync(join(root, AT)).ino).toBe(was)
})

test("an entry saying something else is written again and named as changed", () => {
  const root = rootAt()
  writing(root, AT, '{"was":1}\n')

  const drift = reconcile([{ at: AT, line: "{}" }], root, true)

  expect(bodyAt(root, AT)).toBe("{}\n")
  expect(drift).toEqual({ added: [], changed: [AT] })
})

test("a repair putting nothing in place writes nothing and says the same difference", () => {
  const root = rootAt()
  writing(root, GONE, "{}\n")

  const drift = reconcile([{ at: AT, line: "{}" }], root, false)
  const went = takenAway([{ at: AT, line: "{}" }], root, false)

  expect(bodyAt(root, AT)).toBe(null)
  expect(bodyAt(root, GONE)).toBe("{}\n")
  expect(drift).toEqual({ added: [AT], changed: [] })
  expect(went).toEqual([GONE])
})

test("one entry file holds every line the pages imply, each once and sorted", () => {
  const root = rootAt()

  reconcile(
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
  writing(root, GONE, "{}\n")

  takenAway([], root, true)

  expect(existsSync(join(root, UNDER))).toBe(false)
})

const ONE_FILE = {
  holds: () => true,
  listing: () => [],
  lines: (at: string) => (at === AT ? ['{"a":1}', '{"b":1}'] : []),
  read: () => null,
}

test("a filing is answered as the body the entry file would hold, under its own path", () => {
  const said = bodiesFrom(ONE_FILE, [{ at: AT, came: [], went: [] }])

  expect([...said]).toEqual([[".git/indexes/held/one.jsonl", '{"a":1}\n{"b":1}\n']])
})

test("a filing holding no line is answered as a path carrying no body", () => {
  const said = bodiesFrom(ONE_FILE, [{ at: GONE, came: [], went: [] }])

  expect(said.get(".git/indexes/held/gone.jsonl")).toBeNull()
})

test("an entry file written by a delta keeps what stayed, drops what went and holds what came", () => {
  const root = rootAt()
  writing(root, AT, '{"a":1}\n{"b":1}\n')

  keepDelta(join(root, AT), { at: AT, came: ['{"c":1}'], went: ['{"a":1}'] }, root)

  expect(bodyAt(root, AT)).toBe('{"b":1}\n{"c":1}\n')
})

test("an entry file whose delta turns nothing is left as that file is", () => {
  const root = rootAt()
  writing(root, AT, '{"a":1}\n')
  const was = statSync(join(root, AT)).ino

  keepDelta(join(root, AT), { at: AT, came: ['{"a":1}'], went: ['{"z":1}'] }, root)

  expect(statSync(join(root, AT)).ino).toBe(was)
})

test("the body an entry file holds is written the way a filing is answered", () => {
  const root = rootAt()
  const lines = ['{"a":1}', '{"b":1}']

  reconcile(
    lines.map((line) => ({ at: AT, line })),
    root,
    true
  )

  expect(bodyAt(root, AT)).toBe(wholeOf(lines))
})

test("a path is named by the index that path is filed under", () => {
  expect(filedUnder(AT)).toBe(UNDER)
  expect(filedUnder(STRAY)).toBe(STRAY)
})

test("a repair putting nothing in place names nothing written", () => {
  const root = rootAt()
  const done: string[] = []

  reconcile([{ at: AT, line: "{}" }], root, false, done)
  takenAway([{ at: AT, line: "{}" }], root, false, done)

  expect(done).toEqual([])
})

test("a repair writing no file names nothing", () => {
  const root = rootAt()
  writing(root, AT, "{}\n")
  const done: string[] = []

  reconcile([{ at: AT, line: "{}" }], root, true, done)

  expect(done).toEqual([])
})

test("a repair that finished names the index it wrote and how many files it wrote", () => {
  const root = rootAt()
  const done: string[] = []

  reconcile(
    [
      { at: AT, line: "{}" },
      { at: TWO, line: "{}" },
    ],
    root,
    true,
    done
  )

  expect(done).toEqual(["held — 2 files written"])
})

test("a repair that threw names the files written before the file it had in hand", () => {
  const root = rootAt()
  writing(root, BLOCKED, "{}\n")
  const done: string[] = []

  expect(() =>
    reconcile(
      [
        { at: AT, line: "{}" },
        { at: TWO, line: "{}" },
      ],
      root,
      true,
      done
    )
  ).toThrow()

  expect(done).toEqual([`held — 1 file written, \`${TWO}\` in hand`])
})

test("what one repair wrote is named beside what the repair before it wrote", () => {
  const root = rootAt()
  const done: string[] = []

  reconcile([{ at: AT, line: "{}" }], root, true, done)
  takenAway([{ at: TWO, line: "{}" }], root, true, done)

  expect(done).toEqual(["held — 1 file written", "taking away — 1 file taken away"])
})
