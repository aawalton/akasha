import { afterAll, expect, test } from "bun:test"
import { mkdirSync, symlinkSync } from "node:fs"
import {
  anothersIn,
  danglingIn,
  linkFor,
  linksAt,
  servedFrom,
} from "akasha/agents/hooks/links/hook-links.module.code.ts"
import { MOUNTED } from "akasha/code-system/test-overlay/test-overlay.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { AKASHA, rootEnvName } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"

const ROOT = "/made-up/checkout"

const HERE = import.meta.path

const SERVED = rootEnvName(AKASHA)

const IN = import.meta.dir

function withServed<T>(at: string, run: () => T): T {
  const before = process.env[SERVED]
  process.env[SERVED] = at
  try {
    return run()
  } finally {
    if (before === undefined) delete process.env[SERVED]
    else process.env[SERVED] = before
  }
}

function withMounted<T>(at: string, run: () => T): T {
  const before = process.env[MOUNTED]
  process.env[MOUNTED] = at
  try {
    return run()
  } finally {
    if (before === undefined) delete process.env[MOUNTED]
    else process.env[MOUNTED] = before
  }
}

test("a tree mounted for one run claims no link, though the environment names it", () => {
  expect(withServed(IN, () => withMounted(IN, () => servedFrom(IN)))).toBe(false)
})

test("a checkout that is no mounted tree still claims its links", () => {
  expect(withServed(IN, () => withMounted(`${IN}/..`, () => servedFrom(IN)))).toBe(true)
})

test("a link naming a file that is there under another checkout is another's", () => {
  expect(anothersIn(HERE, ROOT)).toBe(true)
})

test("a link naming a file that is gone is no one else's", () => {
  expect(anothersIn("/made-up/mounted/one/one.module.code.ts", ROOT)).toBe(false)
})

test("a link naming a file under this checkout is no one else's", () => {
  expect(anothersIn(`${ROOT}/one/one.module.code.ts`, ROOT)).toBe(false)
})

test("no link at all is no one else's", () => {
  expect(anothersIn(null, ROOT)).toBe(false)
})

test("the checkout the links serve serves them", () => {
  expect(withServed(IN, () => servedFrom(IN))).toBe(true)
})

test("another spelling of that checkout serves them", () => {
  expect(withServed(IN, () => servedFrom(`${IN}/.`))).toBe(true)
})

test("a tree that is not that checkout serves no link", () => {
  expect(withServed(IN, () => servedFrom(`${IN}/..`))).toBe(false)
})

test("a checkout that is not there serves no link", () => {
  expect(withServed(ROOT, () => servedFrom(ROOT))).toBe(false)
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PREFIX = "akasha-hook-links-"

const GONE = "/made-up/nothing-is-here.ts"

const HOME = "HOME"

function withHome<T>(at: string, run: () => T): T {
  const before = process.env[HOME]
  process.env[HOME] = at
  try {
    return run()
  } finally {
    if (before === undefined) delete process.env[HOME]
    else process.env[HOME] = before
  }
}

test("a link pointing at a file that is gone is named for mending", () => {
  withHome(scratch.rootFor(PREFIX), () => {
    mkdirSync(linksAt(), { recursive: true })
    symlinkSync(GONE, linkFor("PreToolUse"))
    symlinkSync(HERE, linkFor("Stop"))
    expect(danglingIn()).toEqual(["PreToolUse"])
  })
})

test("a half-written link is no event to mend", () => {
  withHome(scratch.rootFor(PREFIX), () => {
    mkdirSync(linksAt(), { recursive: true })
    symlinkSync(GONE, `${linkFor("PreToolUse")}.tmp-1`)
    expect(danglingIn()).toEqual([])
  })
})

test("no links folder at all names nothing to mend", () => {
  withHome(scratch.rootFor(PREFIX), () => {
    expect(danglingIn()).toEqual([])
  })
})
