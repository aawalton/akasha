import { expect, test } from "bun:test"
import {
  type Calling,
  deletingFinding,
  deletingGap,
  type Editor,
  findingFailureSaid,
  findingGoneOf,
  gapFailureSaid,
  gapGoneOf,
} from "akasha/code/editor/extension/modules/tree-row-deleting/tree-row-deleting.module.code.ts"

function findingRow(key: string): FindingTreeRow {
  return { key, label: "A thing is so.", at: null, color: null, findings: 0, children: [] }
}

function gapRow(key: string, label = "A thing is so."): GapTreeRow {
  return { key, label, at: null, color: null, gaps: 0, children: [] }
}

function watching(): { readonly said: string[]; readonly editor: Editor } {
  const said: string[] = []
  return { said, editor: { window: { showErrorMessage: (one: string) => said.push(one) } } }
}

function calling(answer: string): { readonly asked: unknown[]; readonly call: Calling } {
  const asked: unknown[] = []
  return {
    asked,
    call: async (slug, exported, args) => {
      asked.push({ slug, exported, args })
      return answer
    },
  }
}

test("a finding is named to the command by the slug its row is keyed by", () => {
  expect(findingGoneOf(findingRow("finding/a-thing-goes-stale"))).toBe("a-thing-goes-stale")
})

test("a row that is no finding names no finding", () => {
  expect(findingGoneOf(findingRow("domain/alpha"))).toBe(null)
  expect(findingGoneOf(findingRow("finding/"))).toBe(null)
  expect(findingGoneOf(undefined)).toBe(null)
})

test("a gap is named to the command by its page and the label the row is drawn under", () => {
  expect(gapGoneOf(gapRow("gap/domain/alpha#2"))).toEqual({
    page: "domain/alpha",
    statement: "A thing is so.",
  })
})

test("a row that is no gap names no gap", () => {
  expect(gapGoneOf(gapRow("domain/alpha"))).toBe(null)
  expect(gapGoneOf(gapRow("gap/#1"))).toBe(null)
  expect(gapGoneOf(gapRow("gap/domain/alpha"))).toBe(null)
  expect(gapGoneOf(gapRow("gap/domain/alpha#1", ""))).toBe(null)
  expect(gapGoneOf(undefined)).toBe(null)
})

test("deleting a finding calls the command with that finding's slug", async () => {
  const watch = watching()
  const held = calling("a-thing-goes-stale is gone")
  await deletingFinding(
    watch.editor,
    () => undefined,
    held.call
  )(findingRow("finding/a-thing-goes-stale"))

  expect(held.asked).toEqual([
    { slug: "finding-delete", exported: "findingDelete", args: ["a-thing-goes-stale"] },
  ])
})

test("deleting a gap calls the command with that gap's page and statement", async () => {
  const watch = watching()
  const held = calling("the gap is gone")
  await deletingGap(watch.editor, () => undefined, held.call)(gapRow("gap/domain/alpha#2"))

  expect(held.asked).toEqual([
    { slug: "gap-delete", exported: "gapDelete", args: ["domain/alpha", "A thing is so."] },
  ])
})

test("a row naming nothing calls no command", async () => {
  const watch = watching()
  const held = calling("nothing")
  await deletingFinding(watch.editor, () => undefined, held.call)(undefined)
  await deletingGap(watch.editor, () => undefined, held.call)(undefined)

  expect(held.asked).toEqual([])
})

test("a deletion that failed is said to Alan once and written to the channel", async () => {
  const watch = watching()
  const lines: string[] = []
  const thrown: Calling = async () => {
    throw new Error("the page would not come away")
  }
  await deletingFinding(
    watch.editor,
    (line) => {
      lines.push(line)
      return undefined
    },
    thrown
  )(findingRow("finding/a-thing-goes-stale"))

  expect(lines.length).toBe(1)
  expect(watch.said.length).toBe(1)
  expect(watch.said[0]).toContain("the page would not come away")
})

test("a failure says which thing did not go", () => {
  expect(findingFailureSaid("one", "why")).toBe("one: the finding did not go. why")
  expect(gapFailureSaid({ page: "domain/alpha", statement: "A thing is so." }, "why")).toBe(
    "domain/alpha: the gap `A thing is so.` did not go. why"
  )
})
