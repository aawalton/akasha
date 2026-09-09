import { afterAll, beforeEach, expect, test } from "bun:test"
import { mkdirSync, renameSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../../../commands/modules/scratching/scratching.module.code.ts"
import { followState, readState, stateAt } from "./state-reading.module.code.ts"

const PAGES_AT = "alan/harness/code-editor/code-editor-data-interfaces/pages"
const SCRATCH_AT = "alan/harness/code-editor/code-editor-data-interfaces"
const TAIL = ".code-editor-data-interface.state.uncommitted.json"
const SLUG = "work-tree"

const scratch = scratchWorld()

afterAll(scratch.sweep)

let root: string
let at: string

beforeEach(() => {
  root = scratch.rootFor("state-reading-")
  mkdirSync(join(root, PAGES_AT), { recursive: true })
  at = stateAt(root, SLUG)
})

function serviceWrites(line: string): undefined {
  const part = join(root, SCRATCH_AT, `${SLUG}${TAIL}.part`)
  writeFileSync(part, `${line}\n`, "utf8")
  renameSync(part, at)
  return undefined
}

async function until(holds: () => boolean, ms = 2_000): Promise<boolean> {
  const by = Date.now() + ms
  while (Date.now() < by) {
    if (holds()) return true
    await new Promise((done) => setTimeout(done, 10))
  }
  return holds()
}

test("a file that is not there yet answers nothing", () => {
  expect(readState(at)).toBe(null)
})

test("a file holding nothing answers nothing", () => {
  writeFileSync(at, "", "utf8")
  expect(readState(at)).toBe(null)
})

test("a body that will not parse answers nothing rather than throwing", () => {
  writeFileSync(at, '{"roots": [', "utf8")
  expect(readState(at)).toBe(null)
})

test("one document is read whole", () => {
  serviceWrites('{"roots":[{"key":"a","label":"A","at":null,"color":null}]}')
  const held = readState<{ roots: readonly { key: string }[] }>(at)
  expect(held?.roots[0]?.key).toBe("a")
})

test("what is there is drawn before any change arrives", () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const seen: unknown[] = []
  const reading = followState(root, SLUG, (held) => {
    seen.push(held)
    return undefined
  })
  expect(seen.length).toBe(1)
  reading.stop()
})

test("a write the service makes is drawn", async () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const seen: { roots: { key: string }[] }[] = []
  const reading = followState<{ roots: { key: string }[] }>(root, SLUG, (held) => {
    seen.push(held)
    return undefined
  })
  serviceWrites('{"roots":[{"key":"second"}]}')
  await until(() => seen.length >= 2)
  reading.stop()
  expect(seen.length).toBe(2)
  expect(seen[1]?.roots[0]?.key).toBe("second")
})

test("the same bytes written again are drawn no second time", async () => {
  const line = '{"roots":[{"key":"first"}]}'
  serviceWrites(line)
  const seen: unknown[] = []
  const reading = followState(root, SLUG, (held) => {
    seen.push(held)
    return undefined
  })
  serviceWrites(line)
  await until(() => seen.length >= 2, 300)
  reading.stop()
  expect(seen.length).toBe(1)
})

test("a body that will not parse leaves the last good read drawn", async () => {
  serviceWrites('{"roots":[{"key":"good"}]}')
  const seen: { roots: { key: string }[] }[] = []
  const reading = followState<{ roots: { key: string }[] }>(root, SLUG, (held) => {
    seen.push(held)
    return undefined
  })
  serviceWrites('{"roots":[')
  await until(() => seen.length >= 2, 300)
  reading.stop()
  expect(seen.length).toBe(1)
  expect(seen[0]?.roots[0]?.key).toBe("good")
})

test("a file that is not there yet draws nothing and does not throw", () => {
  const seen: unknown[] = []
  const reading = followState(root, SLUG, (held) => {
    seen.push(held)
    return undefined
  })
  expect(seen.length).toBe(0)
  reading.stop()
})

test("two parts watching one folder are each told", async () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const one: unknown[] = []
  const two: unknown[] = []
  const readingOne = followState(root, SLUG, (held) => {
    one.push(held)
    return undefined
  })
  const readingTwo = followState(root, SLUG, (held) => {
    two.push(held)
    return undefined
  })
  serviceWrites('{"roots":[{"key":"second"}]}')
  await until(() => one.length >= 2 && two.length >= 2)
  readingOne.stop()
  readingTwo.stop()
  expect(one.length).toBe(2)
  expect(two.length).toBe(2)
})

test("a part that stopped is told no more", async () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const seen: unknown[] = []
  const reading = followState(root, SLUG, (held) => {
    seen.push(held)
    return undefined
  })
  reading.stop()
  serviceWrites('{"roots":[{"key":"second"}]}')
  await until(() => seen.length >= 2, 300)
  expect(seen.length).toBe(1)
})

test("a part is not redrawn when another part's file is written", async () => {
  serviceWrites('{"roots":[{"key":"work"}]}')
  writeFileSync(stateAt(root, "agent-tree"), '{"roots":[{"key":"agent"}]}\n', "utf8")
  const seen: unknown[] = []
  const reading = followState(root, "agent-tree", (held) => {
    seen.push(held)
    return undefined
  })
  expect(seen.length).toBe(1)
  serviceWrites('{"roots":[{"key":"work-moved"}]}')
  await until(() => seen.length >= 2, 300)
  reading.stop()
  expect(seen.length).toBe(1)
})
