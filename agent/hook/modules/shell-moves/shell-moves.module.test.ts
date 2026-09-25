import { expect, test } from "bun:test"
import { homedir } from "node:os"
import {
  apart,
  hereOf,
  type Move,
  movesOf,
  placedFrom,
} from "akasha/agent/hook/modules/shell-moves/shell-moves.module.code.ts"

const hereAfter = (...lines: readonly (readonly string[])[]): string =>
  hereOf(
    lines.flatMap((one) => movesOf(one)),
    "/one"
  )

test("a cd moves to the folder it names, read from the folder it is in", () => {
  expect(hereAfter(["cd", "/two"])).toBe("/two")
  expect(hereAfter(["cd", "two"], ["cd", "../three"])).toBe("/one/three")
  expect(hereAfter(["cd", "-P", "/two"])).toBe("/two")
  expect(hereAfter(["cd", "--", "two"])).toBe("/one/two")
})

test("a cd naming no folder moves home, and a tilde names home", () => {
  expect(hereAfter(["cd"])).toBe(homedir())
  expect(hereAfter(["cd", "~/two"])).toBe(`${homedir()}/two`)
})

test("a cd back and a popd return to the folder left", () => {
  expect(hereAfter(["cd", "/two"], ["cd", "-"])).toBe("/one")
  expect(hereAfter(["pushd", "/two"], ["cd", "/three"], ["popd"])).toBe("/one")
})

test("a move to a folder the line does not spell moves nothing", () => {
  expect(hereAfter(["cd", "$ELSEWHERE"])).toBe("/one")
  expect(hereAfter(["cd", "/two"], ["cd", "$(pwd)/x"])).toBe("/two")
  expect(hereAfter(["pushd", "$X"], ["popd"])).toBe("/one")
})

test("a call that is no move moves nothing", () => {
  expect(movesOf(["ls", "/two"])).toEqual([])
  expect(movesOf([])).toEqual([])
})

test("an absolute path is placed by itself, and a relative one from the folder given", () => {
  expect(placedFrom("/one", "/two/x")).toBe("/two/x")
  expect(placedFrom("/one", "two/x")).toBe("/one/two/x")
})

test("a move made apart is gone once that part is read", () => {
  const moves: Move[] = [{ by: "cd", to: "/two" }]
  apart(moves, () => {
    moves.push({ by: "cd", to: "/three" })
  })
  expect(moves).toEqual([{ by: "cd", to: "/two" }])
})
