import { expect, test } from "bun:test"
import type { SubagentPage } from "akasha/agents/subagents/modules/census/subagent-census.module.code.ts"
import {
  NONE_PAGELESS,
  pagelessAmong,
  pagelessSaid,
} from "akasha/agents/subagents/modules/pageless/subagent-pageless.module.code.ts"

const OWN = "a38f63805f9b94edf"

const ANOTHER = "a1a6dc5c18c0a72c8"

function paged(own: string): SubagentPage {
  return {
    path: `seat-system/subagents/pages/akasha-${own}/akasha-${own}.subagent.ts`,
    slug: `akasha-${own}`,
    seatName: "akasha",
    seatId: "01a05844-6e60-7000-b54c-4b14559df70b",
    agentId: `01a05844-6e60-7000-b54c-4b14559df70b--${own}`,
    own,
  }
}

test("a subagent a transcript names as at work with no page is named", () => {
  expect(pagelessAmong([paged(ANOTHER)], new Set([OWN, ANOTHER]))).toEqual([OWN])
})

test("a subagent whose page is there is named by nothing", () => {
  expect(pagelessAmong([paged(OWN)], new Set([OWN]))).toEqual([])
})

test("a transcript naming nothing at work names no subagent as page-less", () => {
  expect(pagelessAmong([paged(OWN)], new Set())).toEqual([])
  expect(pagelessAmong([], new Set())).toEqual([])
})

test("a subagent a transcript could not name is not counted as page-less", () => {
  expect(pagelessAmong([], new Set([""]))).toEqual([])
})

test("a run finding none says so rather than saying nothing", () => {
  expect(pagelessSaid([])).toEqual(["", NONE_PAGELESS])
})

test("a run finding some names each one and what each one is refused", () => {
  const said = pagelessSaid([OWN])
  expect(said).toContain(OWN)
  expect(said.join(" ")).toContain("have no page")
  expect(said.join(" ")).toContain("is refused")
})
