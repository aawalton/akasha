import { expect, test } from "bun:test"
import { levelOf, rungs } from "./attributes-levelling.module.code.ts"

function firstRungs(count: number): readonly number[] {
  const held: number[] = []
  for (const rung of rungs()) {
    held.push(rung)
    if (held.length === count) break
  }
  return held
}

test("the climb to each level costs ten times the next Fibonacci number", () => {
  expect(firstRungs(8)).toEqual([10, 20, 40, 70, 120, 200, 330, 540])
})

test("the rungs are still worked out past the eighth", () => {
  expect(firstRungs(12)).toEqual([10, 20, 40, 70, 120, 200, 330, 540, 880, 1430, 2320, 3760])
})

test("no points at all is level 0", () => {
  expect(levelOf(0)).toBe(0)
})

test("points below zero are level 0", () => {
  expect(levelOf(-5)).toBe(0)
})

test("points short of the first rung are level 0", () => {
  expect(levelOf(9)).toBe(0)
  expect(levelOf(9.99)).toBe(0)
})

test("ten points is level 1", () => {
  expect(levelOf(10)).toBe(1)
})

test("points short of the second rung are level 1", () => {
  expect(levelOf(19)).toBe(1)
})

test("twenty points is level 2", () => {
  expect(levelOf(20)).toBe(2)
})

test("seventy points is level 4 and sixty nine is level 3", () => {
  expect(levelOf(69)).toBe(3)
  expect(levelOf(70)).toBe(4)
})

test("a level past the eighth rung is worked out rather than capped", () => {
  expect(levelOf(540)).toBe(8)
  expect(levelOf(879)).toBe(8)
  expect(levelOf(880)).toBe(9)
  expect(levelOf(100000)).toBe(18)
})
