import { expect, test } from "bun:test"
import { reconciling } from "akasha/alan/music/choosing/modules/unheard-reconciling/unheard-reconciling.module.code.ts"

test("a track wanted that the playlist does not hold is added", () => {
  expect(reconciling(["a", "b"], ["a"]).adding).toEqual(["b"])
})

test("a track the playlist holds that is wanted no longer is removed", () => {
  expect(reconciling(["a"], ["a", "b"]).removing).toEqual(["b"])
})

test("a track wanted that the playlist holds already is kept where it is", () => {
  const said = reconciling(["a", "b"], ["b", "c"])
  expect(said.keeping).toEqual(["b"])
  expect(said.adding).toEqual(["a"])
  expect(said.removing).toEqual(["c"])
})

test("a playlist already holding what is wanted gains and loses nothing", () => {
  const said = reconciling(["a", "b"], ["b", "a"])
  expect(said.adding).toEqual([])
  expect(said.removing).toEqual([])
  expect(said.keeping).toEqual(["a", "b"])
})

test("tracks are added in the order they were wanted", () => {
  expect(reconciling(["c", "a", "b"], []).adding).toEqual(["c", "a", "b"])
})

test("tracks are removed in the order the playlist holds them", () => {
  expect(reconciling([], ["c", "a", "b"]).removing).toEqual(["c", "a", "b"])
})

test("a track named twice is added once, removed once, or kept once", () => {
  expect(reconciling(["a", "a"], []).adding).toEqual(["a"])
  expect(reconciling([], ["b", "b"]).removing).toEqual(["b"])
  expect(reconciling(["c", "c"], ["c", "c"]).keeping).toEqual(["c"])
})

test("an empty playlist wanted empty asks for nothing", () => {
  expect(reconciling([], [])).toEqual({ adding: [], removing: [], keeping: [] })
})
