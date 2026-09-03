import { expect, test } from "bun:test"
import type { Given } from "@akasha/command-system/calling"
import { colorsSaid, readIn, workTree } from "./work-tree.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha work-tree", from: ROOT, writer: null, agentId: null }
}

test("a call naming nothing prints the tree", () => {
  expect(readIn([])).toEqual({ shown: "tree" })
})

test("each word names what to print", () => {
  expect(readIn(["--json"])).toEqual({ shown: "json" })
  expect(readIn(["--counts"])).toEqual({ shown: "counts" })
  expect(readIn(["--colors"])).toEqual({ shown: "colors" })
})

test("one call prints one thing", () => {
  const said = readIn(["--json", "--counts"])

  expect("refused" in said && said.refused[0]).toContain("one call prints one thing")
})

test("a word said twice names one thing rather than two", () => {
  expect(readIn(["--json", "--json"])).toEqual({ shown: "json" })
})

test("the older spelling of the colors is no word this takes", () => {
  const said = readIn(["--colours"])

  expect("refused" in said && said.refused[0]).toContain("`--colours`")
})

test("the colors carry the root beside them and nothing else", () => {
  const said = colorsSaid("/repo", { byInitiative: new Map([["one", "green"]]) })

  expect(JSON.parse(said)).toEqual({ repo: "/repo", byInitiative: { one: "green" } })
})

test("a tree nothing is drawn on answers an empty record rather than none", () => {
  expect(JSON.parse(colorsSaid("/repo", { byInitiative: new Map() }))).toEqual({
    repo: "/repo",
    byInitiative: {},
  })
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = workTree(["--sideways"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})
