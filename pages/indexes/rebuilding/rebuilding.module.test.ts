import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { reconcile } from "./rebuilding.module.code.ts"

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
