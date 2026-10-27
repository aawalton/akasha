import { expect, test } from "bun:test"
import {
  type FitNode,
  fitNodes,
  isWhole,
  listHeight,
  type NodeFit,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-fit/characters-task-hud-fit.module.code.ts"

const LEAF: FitNode = { height: 10, children: [], foldable: true }

function group(leaves: number): FitNode {
  return { height: 10, children: Array.from({ length: leaves }, () => LEAF), foldable: true }
}

function opened(...children: FitNode[]): FitNode {
  return { height: 10, children, foldable: false }
}

const WHOLE: NodeFit = { kind: "whole" }

const FOLDED: NodeFit = { kind: "folded" }

test("a display that fits is drawn as it is", () => {
  const nodes = [group(2), group(2)]
  expect(isWhole(fitNodes(nodes, 60, 10), nodes.length)).toBe(true)
})

test("rows fold from the last up, and only as many as it takes", () => {
  expect(fitNodes([group(3), group(3), group(3)], 60, 10)).toEqual({
    nodes: [WHOLE, FOLDED, FOLDED],
    shown: 3,
  })
})

test("the row where the display runs out shows as many of its rows as fit", () => {
  expect(fitNodes([group(3), group(3)], 70, 10)).toEqual({
    nodes: [WHOLE, { kind: "cut", children: { nodes: [WHOLE, WHOLE, WHOLE], shown: 1 } }],
    shown: 2,
  })
})

test("a task opened by a click is shortened rather than folded, a level at a time", () => {
  const nodes = [opened(group(5), group(5))]
  const fit = fitNodes(nodes, 70, 10)
  expect(fit).toEqual({
    nodes: [
      {
        kind: "cut",
        children: {
          nodes: [
            { kind: "cut", children: { nodes: [WHOLE, WHOLE, WHOLE, WHOLE, WHOLE], shown: 3 } },
            FOLDED,
          ],
          shown: 2,
        },
      },
    ],
    shown: 1,
  })
  expect(listHeight(nodes, fit, 10)).toBe(70)
})

test("where nothing folds or shortens, the last rows are left out with room for the count line", () => {
  expect(fitNodes([LEAF, LEAF, LEAF, LEAF, LEAF], 30, 10).shown).toBe(2)
})

test("a display with no room shows only the count line", () => {
  expect(fitNodes([LEAF], 5, 10).shown).toBe(0)
})
