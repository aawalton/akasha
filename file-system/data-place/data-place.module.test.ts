import { expect, test } from "bun:test"
import { dataAt, dataIn } from "./data-place.module.code.ts"

test("the place stands under the folder git does not track", () => {
  expect(dataAt()).toBe(".git/data")
  expect(dataIn("/repo")).toBe("/repo/.git/data")
})

test("a subtree is answered under the place, so what owns it never spells the place", () => {
  expect(dataAt("reads")).toBe(".git/data/reads")
  expect(dataIn("/repo", "reads", "agent")).toBe("/repo/.git/data/reads/agent")
})

test("the place under a root is the place itself, taken from that root", () => {
  expect(dataIn("/repo", "held")).toBe(`/repo/${dataAt("held")}`)
})
