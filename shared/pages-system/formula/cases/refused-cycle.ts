import type { FormulaCase } from "./cases.ts"
import { answersNumber, C, L, NUMBER, num, refused, TEXT } from "./shorthand.ts"

export const refusedCycle: FormulaCase[] = [
  {
    name: "a formula naming itself is a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{loop}",
    shape: {
      loop: { type: NUMBER, formula: "{loop} + 1" },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["loop"]),
  },
  {
    name: "two formulas naming each other are a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{first}",
    shape: {
      first: { type: NUMBER, formula: "{second} + 1" },
      second: { type: NUMBER, formula: "{first} + 1" },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["first", "second"]),
  },
  {
    name: "three formulas round a ring are a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{a}",
    shape: {
      a: { type: NUMBER, formula: "{b} + 1" },
      b: { type: NUMBER, formula: "{c} + 1" },
      c: { type: NUMBER, formula: "{a} + 1" },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["a", "b", "c"]),
  },
  {
    name: "a cycle the formula under check does not reach is still refused",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{count} + 1",
    shape: {
      count: { type: NUMBER },
      first: { type: NUMBER, formula: "{second} + 1" },
      second: { type: NUMBER, formula: "{first} + 1" },
    },
    values: { count: num(1) },
    expected: refused("check", "formula-cycle", ["first", "second"]),
  },
  {
    name: "a cycle reached through a text literal is refused",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{label}",
    shape: {
      label: { type: TEXT, formula: '"{other} label"' },
      other: { type: TEXT, formula: '"{label} other"' },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["label", "other"]),
  },
  {
    name: "a diamond among formulas is not a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{total}",
    shape: {
      count: { type: NUMBER },
      left: { type: NUMBER, formula: "{count} * 2" },
      right: { type: NUMBER, formula: "{count} * 3" },
      total: { type: NUMBER, formula: "{left} + {right}" },
    },
    values: { count: num(2) },
    expected: answersNumber(10),
  },
]
