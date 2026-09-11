import { describe, expect, test } from "bun:test"
import {
  bodyFor,
  heldOver,
  leftHeldAt,
} from "akasha/commands/modules/body-loading/body-loading.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const AT = "commands/modules/body-loading/body-loading.module.ts"

const BESIDE = "commands/modules/body-loading/body-loading.module.code.ts"

const MARKER = "the body the change leaves\n"

const OTHER = "another body the change leaves\n"

const OVER = `export function heldIn(): string {\n  return ${JSON.stringify(MARKER)}\n}\n`

const AGAIN = `export function heldIn(): string {\n  return ${JSON.stringify(OTHER)}\n}\n`

const BYTES = new TextEncoder()

function changeTurning(at: string, body: string): Change {
  return {
    root: ROOT,
    changed: [at],
    before: () => null,
    after: (path) => (path === at ? BYTES.encode(body) : null),
  }
}

function saidBy(held: Record<string, unknown>, key: string): string | null {
  const named = held[key]
  return typeof named === "function" ? (named() as string) : null
}

describe("the body a change leaves at a path", () => {
  test("a path the change carries answers the body the change leaves there", () => {
    expect(bodyFor(changeTurning(AT, OVER), AT)).toBe(OVER)
  })

  test("a path the change leaves alone answers nothing", () => {
    expect(bodyFor(changeTurning(AT, OVER), BESIDE)).toBeNull()
  })
})

describe("the code loaded at a module path", () => {
  test("a body handed in is the code loaded rather than the checkout's", () => {
    expect(saidBy(heldOver(ROOT, AT, OVER), "heldIn")).toBe(MARKER)
  })

  test("nothing is left held at that path once the code is loaded", () => {
    heldOver(ROOT, AT, OVER)
    expect(leftHeldAt(ROOT, AT)).toBe(false)
  })

  test("a body handed in twice is loaded twice rather than answered from the cache", () => {
    expect(saidBy(heldOver(ROOT, AT, AGAIN), "heldIn")).toBe(OTHER)
  })

  test("the checkout's code is loaded at that path once the body is gone", () => {
    const held = heldOver(ROOT, AT, null)
    expect(held.bodyLoading).toBeDefined()
    expect(held.heldIn).toBeUndefined()
  })

  test("a load off the checkout leaves the cache entry that load made", () => {
    heldOver(ROOT, AT, null)
    expect(leftHeldAt(ROOT, AT)).toBe(true)
  })
})
