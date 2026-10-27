import { expect, test } from "bun:test"
import {
  fitTaskBlocks,
  type TaskBlock,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-fit/characters-task-hud-fit.module.code.ts"

function open(height: number): TaskBlock {
  return { height, foldedHeight: 10, foldable: true }
}

function opened(height: number): TaskBlock {
  return { height, foldedHeight: 10, foldable: false }
}

const SHUT: TaskBlock = { height: 10, foldedHeight: 10, foldable: false }

test("a display that fits is drawn as it is", () => {
  expect(fitTaskBlocks([open(40), open(40)], 80, 10)).toEqual({
    folded: [false, false],
    shown: 2,
  })
})

test("tasks fold from the last up, and only as many as it takes", () => {
  expect(fitTaskBlocks([open(40), open(40), open(40)], 70, 10)).toEqual({
    folded: [false, true, true],
    shown: 3,
  })
  expect(fitTaskBlocks([open(40), open(40), open(40)], 90, 10)).toEqual({
    folded: [false, false, true],
    shown: 3,
  })
})

test("a task opened by a click is never folded", () => {
  expect(fitTaskBlocks([open(40), opened(40)], 60, 10)).toEqual({
    folded: [true, false],
    shown: 2,
  })
})

test("where folding is not enough, the last tasks are left out with room for the count line", () => {
  expect(fitTaskBlocks([SHUT, SHUT, SHUT, SHUT, SHUT], 30, 10)).toEqual({
    folded: [false, false, false, false, false],
    shown: 2,
  })
})

test("a task left out counts at the height it would have been drawn at", () => {
  expect(fitTaskBlocks([opened(50), opened(50)], 70, 10)).toEqual({
    folded: [false, false],
    shown: 1,
  })
})

test("a display with no room shows only the count line", () => {
  expect(fitTaskBlocks([SHUT], 5, 10)).toEqual({ folded: [false], shown: 0 })
})
