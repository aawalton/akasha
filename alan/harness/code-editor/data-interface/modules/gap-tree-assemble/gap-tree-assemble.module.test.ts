import { expect, test } from "bun:test"
import {
  gapsOn,
  hungOf,
} from "akasha/alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.code.ts"

const AT = "nowhere/alpha.domain.ts"

function said(kind: string, statement: string): Record<string, unknown> {
  return { decisionKind: `decision-kind/${kind}`, statement }
}

test("a gap hangs under the page stating that gap", () => {
  const found = gapsOn(AT, { decisions: [said("gap", "A thing is so.")] })
  expect(found).toEqual([{ at: AT, domain: "domain/alpha", place: 1, said: "A thing is so." }])
})

test("a decision of any other kind is passed over", () => {
  const found = gapsOn(AT, {
    decisions: [said("departure", "A thing is so."), said("gap", "A thing is not.")],
  })
  expect(found.map((one) => one.said)).toEqual(["A thing is not."])
})

test("the gaps of one page are placed in the order that page states them", () => {
  const found = gapsOn(AT, {
    decisions: [said("gap", "One."), said("absence", "Two."), said("gap", "Three.")],
  })
  expect(found.map((one) => [one.place, one.said])).toEqual([
    [1, "One."],
    [2, "Three."],
  ])
})

test("a page stating no decision states no gap", () => {
  expect(gapsOn(AT, {})).toEqual([])
})

test("a gap stating no sentence is skipped", () => {
  expect(gapsOn(AT, { decisions: [{ decisionKind: "decision-kind/gap" }] })).toEqual([])
})

test("a file beside a page rather than a page of its own states no gap", () => {
  const beside = "nowhere/alpha.domain.d.ts"
  expect(gapsOn(beside, { decisions: [said("gap", "A thing is so.")] })).toEqual([])
})

test("a gap is keyed by the page and the place that gap holds among the page's gaps", () => {
  const hung = hungOf(gapsOn(AT, { decisions: [said("gap", "One."), said("gap", "Two.")] }))
  expect(hung.map((one) => one.key)).toEqual(["gap/domain/alpha#1", "gap/domain/alpha#2"])
})

test("a gap is drawn as the sentence that gap states and opens the page stating it", () => {
  const hung = hungOf(gapsOn(AT, { decisions: [said("gap", "A thing is so.")] }))
  expect(hung[0]?.label).toBe("A thing is so.")
  expect(hung[0]?.at).toBe(AT)
  expect(hung[0]?.domain).toBe("domain/alpha")
})
