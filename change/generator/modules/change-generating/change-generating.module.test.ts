import { expect, test } from "bun:test"
import {
  generatedAlong,
  type Listed,
  type Loaded,
  orderedIn,
} from "akasha/change/generator/modules/change-generating/change-generating.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const AUTHORED: Change = { root: "/", changed: [], before: () => null, after: () => null }

function listed(slug: string, runsAfter: readonly string[] = []): Listed {
  return { slug, beside: `${slug}.code.ts`, at: `${slug}.code.ts`, runsAfter }
}

function adding(path: string): FileChange {
  return { kind: "add", path, content: path }
}

function slugsOf(order: ReturnType<typeof orderedIn>): readonly string[] {
  if ("refused" in order) throw new Error(order.refused)
  return order.order.map((one) => one.slug)
}

test("a change generator runs after every one it names, and the rest by slug", () => {
  const order = orderedIn([listed("c", ["b"]), listed("b", ["d"]), listed("a"), listed("d")])

  expect(slugsOf(order)).toEqual(["a", "d", "b", "c"])
})

test("a slug named that is no change generator orders nothing", () => {
  expect(slugsOf(orderedIn([listed("a", ["gone"])]))).toEqual(["a"])
})

test("change generators naming each other in a ring are refused", () => {
  const order = orderedIn([listed("a", ["b"]), listed("b", ["a"]), listed("c")])

  expect(order).toEqual({
    refused: "the change generators `a`, `b` run after each other in a ring",
  })
})

test("one naming none is handed the change as written, one naming any every edit before it", () => {
  const handed = new Map<string, Change>()
  const againOver: (readonly FileChange[])[] = []
  const loading = (_change: Change, at: string): Loaded => ({
    generating: (change) => {
      handed.set(at, change)
      return { edits: [adding(at)], said: [`${at} said`] }
    },
  })
  const again = (made: readonly FileChange[]): Change => {
    againOver.push([...made])
    return { ...AUTHORED, changed: made.map((one) => (one.kind === "add" ? one.path : "")) }
  }

  const ran = generatedAlong(
    [listed("b", ["a"]), listed("a"), listed("c")],
    AUTHORED,
    again,
    loading
  )

  expect(ran.refused).toEqual([])
  expect(ran.edits.map((one) => (one.kind === "add" ? one.path : ""))).toEqual([
    "a.code.ts",
    "b.code.ts",
    "c.code.ts",
  ])
  expect(ran.said).toEqual(["a.code.ts said", "b.code.ts said", "c.code.ts said"])
  expect(handed.get("a.code.ts")).toBe(AUTHORED)
  expect(handed.get("c.code.ts")).toBe(AUTHORED)
  expect(handed.get("b.code.ts")?.changed).toEqual(["a.code.ts"])
  expect(againOver.length).toBe(1)
})

test("a change generator that answers it could not turn adds nothing", () => {
  const loading = (): Loaded => ({
    generating: () => ({ edits: [adding("x")], said: [] }),
    turning: () => false,
  })

  expect(generatedAlong([listed("a")], AUTHORED, () => AUTHORED, loading).edits).toEqual([])
})

test("a change generator that broke, gave none or has no code refuses", () => {
  const loading = (_change: Change, at: string): Loaded => {
    if (at === "a.code.ts") return { missing: "it answers to no `generateChange`" }
    return {
      generating: () => {
        throw new Error("no body")
      },
    }
  }
  const gone: Listed = { slug: "c", beside: "c.code.ts", at: null, runsAfter: [] }

  const ran = generatedAlong([listed("a"), listed("b"), gone], AUTHORED, () => AUTHORED, loading)

  expect(ran.refused).toEqual([
    "`a` gave no change generator — it answers to no `generateChange`",
    "`b` broke — no body",
    "`c` states code at `c.code.ts`, and nothing is there",
  ])
})
