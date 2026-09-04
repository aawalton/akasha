import { expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { dropPatch, keepPatch, keptPatch, patchAt, patchIn } from "./patch-keeping.module.code.ts"

const SEAT = "akasha/seat-system/seats/pages/dalla.seat.ts"

const BESIDE = "akasha/seat-system/seats/pages/dalla.seat.patch.diff"

const ONE = "diff --git a/a.ts b/a.ts\n"

const TWO = "diff --git a/b.ts b/b.ts\n"

test("a patch is named beside the page of the agent drafting it", () => {
  expect(patchAt(SEAT)).toBe(BESIDE)
})

test("a path that is no page keeps no patch", () => {
  expect(patchAt("akasha/seat-system/seat/seats/notes.txt")).toBe(null)
})

test("an agent drafting nothing is answered with nothing", () => {
  const world = scratchWorld()
  try {
    expect(patchIn(world.rootFor("patch-keeping-"), SEAT)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a patch kept is the patch read back", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    expect(keepPatch(root, SEAT, ONE)).toBe(true)
    expect(patchIn(root, SEAT)).toBe(ONE)
    expect(existsSync(join(root, BESIDE))).toBe(true)
  } finally {
    world.sweep()
  }
})

test("what is kept is handed to whoever works out the next patch", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    keepPatch(root, SEAT, ONE)
    const seen: (string | null)[] = []
    keptPatch(root, SEAT, (held) => {
      seen.push(held)
      return TWO
    })
    expect(seen).toEqual([ONE])
    expect(patchIn(root, SEAT)).toBe(TWO)
  } finally {
    world.sweep()
  }
})

test("the first draft is handed nothing", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    const seen: (string | null)[] = []
    keptPatch(root, SEAT, (held) => {
      seen.push(held)
      return ONE
    })
    expect(seen).toEqual([null])
  } finally {
    world.sweep()
  }
})

test("a patch worked out to nothing is taken away", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    keepPatch(root, SEAT, ONE)
    expect(keptPatch(root, SEAT, () => null)).toBe(true)
    expect(existsSync(join(root, BESIDE))).toBe(false)
    expect(patchIn(root, SEAT)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a patch dropped is gone", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    keepPatch(root, SEAT, ONE)
    expect(dropPatch(root, SEAT)).toBe(true)
    expect(patchIn(root, SEAT)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a path that is no page is refused rather than written", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    expect(keepPatch(root, "akasha/seat-system/seat/seats/notes.txt", ONE)).toBe(false)
  } finally {
    world.sweep()
  }
})

test("nothing is left beside the patch once it is written", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("patch-keeping-")
    keepPatch(root, SEAT, ONE)
    expect(existsSync(join(root, `${BESIDE}.writing`))).toBe(false)
  } finally {
    world.sweep()
  }
})
