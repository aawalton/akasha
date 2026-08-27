import { expect, test } from "bun:test"
import type { CheckFailure } from "../check-shape.ts"
import { type Held, judgeLinks, type Mortal, type Sources } from "./links-resolve.check.code.attachment.ts"

const TARGET = "akasha/notes/target.md"

const FROM = "akasha/notes/from.md"

const NONE: Sources = () => []

const held = (body: string | null): Held => ({ path: `/repos/${TARGET}`, body })

const from = (body: string | null): Held => ({ path: `/repos/${FROM}`, body })

function verdict(
  staged: Readonly<Record<string, Held>>,
  world: Readonly<Record<string, string>> = {},
  sources: Sources = NONE,
  mortal: Mortal = () => false
): readonly CheckFailure[] {
  const map = new Map(Object.entries(staged))
  return judgeLinks(
    map,
    (address) => {
      const one = map.get(address)
      return one === undefined ? (world[address] ?? null) : one.body
    },
    sources,
    mortal
  )
}

test("a link at a file that is there resolves", () => {
  expect(verdict({ [FROM]: from("See [it](target.md).") }, { [TARGET]: "# Top\n" })).toEqual([])
})

test("a link at a file that is not there is refused", () => {
  const failures = verdict({ [FROM]: from("See [it](target.md).") })
  expect(failures).toHaveLength(1)
  expect(failures[0]!.path).toBe(`/repos/${FROM}`)
  expect(failures[0]!.reason).toContain("nothing stands there")
})

test("a link naming a heading the file holds resolves", () => {
  expect(verdict({ [FROM]: from("[it](target.md#top)") }, { [TARGET]: "# Top\n" })).toEqual([])
})

test("a link naming a heading the file does not hold is refused, naming the heading", () => {
  const failures = verdict({ [FROM]: from("[it](target.md#gone)") }, { [TARGET]: "# Top\n" })
  expect(failures).toHaveLength(1)
  expect(failures[0]!.reason).toContain("holds no heading spelled `#gone`")
})

test("a quote the file no longer says is refused", () => {
  const world = { [TARGET]: "# Top\n\nWhat it says now.\n" }
  expect(verdict({ [FROM]: from('["what it said"](target.md)') }, world)).toHaveLength(1)
  expect(verdict({ [FROM]: from('["What it says now."](target.md)') }, world)).toEqual([])
})

test("a change taking a heading away is refused for the link reaching it, which it names", () => {
  const sources: Sources = (target) => (target === TARGET ? [{ repo: "akasha", key: "notes/from.md" }] : [])
  const world = { [FROM]: "[it](target.md#gone)" }
  const failures = verdict({ [TARGET]: held("# Top\n") }, world, sources)
  expect(failures).toHaveLength(1)
  expect(failures[0]!.path).toBe(`/repos/${TARGET}`)
  expect(failures[0]!.reason).toContain(FROM)
  expect(failures[0]!.reason).toContain("holds no heading spelled `#gone`")
})

test("a file taken away is refused for the link reaching it", () => {
  const sources: Sources = () => [{ repo: "akasha", key: "notes/from.md" }]
  const failures = verdict({ [TARGET]: held(null) }, { [FROM]: "[it](target.md)" }, sources)
  expect(failures).toHaveLength(1)
  expect(failures[0]!.reason).toContain("nothing stands there")
})

test("a link is judged once where both ends are in the same change", () => {
  const sources: Sources = () => [{ repo: "akasha", key: "notes/from.md" }]
  const failures = verdict({ [TARGET]: held("# Top\n"), [FROM]: from("[it](target.md#gone)") }, {}, sources)
  expect(failures).toHaveLength(1)
  expect(failures[0]!.path).toBe(`/repos/${FROM}`)
})

test("a link at a mortal page that has gone is passed, either end of it answering", () => {
  const mortal: Mortal = (address) => address === TARGET
  expect(verdict({ [FROM]: from("[it](target.md)") }, {}, NONE, mortal)).toEqual([])
})

test("a mortal page carrying a link at what has gone is passed", () => {
  const mortal: Mortal = (address) => address === FROM
  expect(verdict({ [FROM]: from("[it](target.md)") }, {}, NONE, mortal)).toEqual([])
})
