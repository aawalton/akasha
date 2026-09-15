import { describe, expect, test } from "bun:test"
import {
  bodyFor,
  heldOver,
} from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import { BESIDE } from "akasha/code/body/modules/body-loading/body-loading.module.test-fixtures.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const MODULE = "module"

const SLUG = "body-loading"

const AT = listedAt(ROOT, MODULE, SLUG)[0]?.path ?? ""

const MARKER = "the body the change leaves\n"

const OTHER = "another body the change leaves\n"

const OVER = `export function heldIn(): string {\n  return ${JSON.stringify(MARKER)}\n}\n`

const AGAIN = `export function heldIn(): string {\n  return ${JSON.stringify(OTHER)}\n}\n`

const IMPORTED = `export function heldIn(): string {\n  return ${JSON.stringify(OTHER)}\n}\n`

const IMPORTING =
  'import { heldIn as said } from "./body-loading.module.code.ts"\n' +
  "export function heldIn(): string {\n  return said()\n}\n"

const MOVED = "code/body/modules/body-loading/moved/moved.module.code.ts"

const MOVING =
  `import { heldIn as said } from "akasha/${MOVED}"\n` +
  "export function heldIn(): string {\n  return said()\n}\n"

const BYTES = new TextEncoder()

function changing(held: Readonly<Record<string, string>>): Change {
  return {
    root: ROOT,
    changed: Object.keys(held),
    before: () => null,
    after: (path) => {
      const body = held[path]
      return body === undefined ? null : BYTES.encode(body)
    },
  }
}

function changeTurning(at: string, body: string): Change {
  return changing({ [at]: body })
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
    expect(saidBy(heldOver(changeTurning(AT, OVER), AT, OVER), "heldIn")).toBe(MARKER)
  })

  test("a body handed in twice is loaded twice rather than answered from the cache", () => {
    expect(saidBy(heldOver(changeTurning(AT, AGAIN), AT, AGAIN), "heldIn")).toBe(OTHER)
  })

  test("a module the code imports is loaded from the body the change leaves there", () => {
    const change = changing({ [AT]: IMPORTING, [BESIDE]: IMPORTED })
    expect(saidBy(heldOver(change, AT, IMPORTING), "heldIn")).toBe(OTHER)
  })

  test("a module the change carries where the checkout has no such path is loaded all the same", () => {
    const change = changing({ [AT]: MOVING, [MOVED]: IMPORTED })
    expect(saidBy(heldOver(change, AT, MOVING), "heldIn")).toBe(OTHER)
  })

  test("the checkout's code is loaded at that path once the body is gone", () => {
    const held = heldOver(changing({}), AT, null)
    expect(held.bodyLoading).toBeDefined()
    expect(held.heldIn).toBeUndefined()
  })
})
