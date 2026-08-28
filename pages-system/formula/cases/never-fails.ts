import type { FormulaCase } from "./cases.ts"
import { ABSENT, C, L, MIXED, NAME, NUMBER, num } from "./shorthand.ts"

export const neverFails: FormulaCase[] = [
  {
    name: "reading a key the page holds nothing under answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{name}",
    shape: NAME,
    values: {},
    expected: ABSENT,
  },
  {
    name: "every operand absent answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{count} * {other} / {count}",
    shape: MIXED,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a division by zero inside a text literal's reference chain",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{ratio}",
    shape: {
      count: { type: NUMBER },
      other: { type: NUMBER },
      ratio: { type: NUMBER, formula: "{count} / {other}" },
    },
    values: { count: num(1), other: num(0) },
    expected: ABSENT,
  },
  {
    name: "a page holding no values at all answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{count} > 0 && {flag}",
    shape: MIXED,
    values: {},
    expected: ABSENT,
  },
]
