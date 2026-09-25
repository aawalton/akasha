import { afterAll, beforeEach, expect, test } from "bun:test"
import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import { CAPTURED_STATES } from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.test-fixtures.ts"
import { agentTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.code.ts"
import { commandTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/command-tree/command-tree.code-editor-data-interface.code.ts"
import { domainTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/domain-tree/domain-tree.code-editor-data-interface.code.ts"
import { findingTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/finding-tree/finding-tree.code-editor-data-interface.code.ts"
import { gapTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/gap-tree/gap-tree.code-editor-data-interface.code.ts"
import { pageTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/page-tree/page-tree.code-editor-data-interface.code.ts"
import { refusalTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.code.ts"
import { serviceTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/service-tree/service-tree.code-editor-data-interface.code.ts"
import { statusBarStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/status-bar/status-bar.code-editor-data-interface.code.ts"
import { terminalTabsStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/terminal-tabs/terminal-tabs.code-editor-data-interface.code.ts"
import { workTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { z } from "zod"

const PAGES_AT = "alan/harness/code-editor/data-interface/pages"
const SCRATCH_AT = "alan/harness/code-editor/data-interface"
const TAIL = ".code-editor-data-interface.state.uncommitted.json"
const SLUG = "work-tree"

const ROOTS = z.object({ roots: z.array(z.object({ key: z.string() })) })

const SHAPES: Readonly<Record<string, z.ZodType>> = {
  "agent-tree": agentTreeStateSchema,
  "command-tree": commandTreeStateSchema,
  "domain-tree": domainTreeStateSchema,
  "finding-tree": findingTreeStateSchema,
  "gap-tree": gapTreeStateSchema,
  "page-tree": pageTreeStateSchema,
  "refusal-tree": refusalTreeStateSchema,
  "service-tree": serviceTreeStateSchema,
  "status-bar": statusBarStateSchema,
  "terminal-tabs": terminalTabsStateSchema,
  "work-tree": workTreeStateSchema,
}

const scratch = scratchWorld()

afterAll(scratch.sweep)

let root: string
let at: string

beforeEach(() => {
  root = scratch.rootFor("state-reading-")
  mkdirSync(join(root, PAGES_AT, SLUG), { recursive: true })
  mkdirSync(join(root, PAGES_AT, "agent-tree"), { recursive: true })
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

test("every part's schema reads a state the service wrote", () => {
  expect(Object.keys(CAPTURED_STATES).sort()).toEqual(Object.keys(SHAPES).sort())
  for (const [slug, shape] of Object.entries(SHAPES)) {
    serviceWrites(CAPTURED_STATES[slug] ?? "")
    expect([slug, readState(at, shape) === null]).toEqual([slug, false])
  }
})

test("a state of the wrong shape answers nothing", () => {
  serviceWrites('{"roots":[{"key":"a","label":"A","at":null,"color":null}]}')
  expect(readState(at, workTreeStateSchema)).toBe(null)
  serviceWrites('{"seatByShellPid":{"1":7},"colorBySeat":{}}')
  expect(readState(at, terminalTabsStateSchema)).toBe(null)
})

test("a file that is not there yet answers nothing", () => {
  expect(readState(at, ROOTS)).toBe(null)
})

test("a file holding nothing answers nothing", () => {
  writeFileSync(at, "", "utf8")
  expect(readState(at, ROOTS)).toBe(null)
})

test("a body that will not parse answers nothing rather than throwing", () => {
  writeFileSync(at, '{"roots": [', "utf8")
  expect(readState(at, ROOTS)).toBe(null)
})

test("one document is read whole", () => {
  serviceWrites('{"roots":[{"key":"a","label":"A","at":null,"color":null}]}')
  expect(readState(at, ROOTS)?.roots[0]?.key).toBe("a")
})

test("what is there is drawn before any change arrives", () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const seen: unknown[] = []
  const reading = followState(root, SLUG, ROOTS, (held) => {
    seen.push(held)
    return undefined
  })
  expect(seen.length).toBe(1)
  reading.stop()
})

test("a write the service makes is drawn", async () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const seen: z.infer<typeof ROOTS>[] = []
  const reading = followState(root, SLUG, ROOTS, (held) => {
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
  const reading = followState(root, SLUG, ROOTS, (held) => {
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
  const seen: z.infer<typeof ROOTS>[] = []
  const reading = followState(root, SLUG, ROOTS, (held) => {
    seen.push(held)
    return undefined
  })
  serviceWrites('{"roots":[')
  await until(() => seen.length >= 2, 300)
  reading.stop()
  expect(seen.length).toBe(1)
  expect(seen[0]?.roots[0]?.key).toBe("good")
})

test("a body of the wrong shape leaves the last good read drawn", async () => {
  serviceWrites('{"roots":[{"key":"good"}]}')
  const seen: z.infer<typeof ROOTS>[] = []
  const reading = followState(root, SLUG, ROOTS, (held) => {
    seen.push(held)
    return undefined
  })
  serviceWrites('{"roots":[{"key":7}]}')
  await until(() => seen.length >= 2, 300)
  reading.stop()
  expect(seen.length).toBe(1)
  expect(seen[0]?.roots[0]?.key).toBe("good")
})

test("a file that is not there yet draws nothing and does not throw", () => {
  const seen: unknown[] = []
  const reading = followState(root, SLUG, ROOTS, (held) => {
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
  const readingOne = followState(root, SLUG, ROOTS, (held) => {
    one.push(held)
    return undefined
  })
  const readingTwo = followState(root, SLUG, ROOTS, (held) => {
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
  const reading = followState(root, SLUG, ROOTS, (held) => {
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
  const reading = followState(root, "agent-tree", ROOTS, (held) => {
    seen.push(held)
    return undefined
  })
  expect(seen.length).toBe(1)
  serviceWrites('{"roots":[{"key":"work-moved"}]}')
  await until(() => seen.length >= 2, 300)
  reading.stop()
  expect(seen.length).toBe(1)
})

test("a folder taken away and put back is followed again", async () => {
  serviceWrites('{"roots":[{"key":"first"}]}')
  const seen: z.infer<typeof ROOTS>[] = []
  const reading = followState(root, SLUG, ROOTS, (held) => {
    seen.push(held)
    return undefined
  })
  rmSync(join(root, PAGES_AT, SLUG), { recursive: true, force: true })
  mkdirSync(join(root, PAGES_AT, SLUG), { recursive: true })
  await until(() => false, 200)
  serviceWrites('{"roots":[{"key":"second"}]}')
  await until(() => seen.length >= 2)
  reading.stop()
  expect(seen[1]?.roots[0]?.key).toBe("second")
})

test("a folder that is not there yet is followed once that folder arrives", async () => {
  const late = "status-bar"
  const seen: z.infer<typeof ROOTS>[] = []
  const reading = followState(root, late, ROOTS, (held) => {
    seen.push(held)
    return undefined
  })
  expect(seen.length).toBe(0)
  mkdirSync(join(root, PAGES_AT, late), { recursive: true })
  await until(() => false, 200)
  writeFileSync(stateAt(root, late), '{"roots":[{"key":"late"}]}\n', "utf8")
  await until(() => seen.length >= 1)
  reading.stop()
  expect(seen[0]?.roots[0]?.key).toBe("late")
})
