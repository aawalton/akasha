import type { FormulaCase } from "./cases.ts"
import { answersBoolean, answersNumber, C, COUNT, FLAG, L, NOTHING, refused } from "./shorthand.ts"

// ---------------------------------------------------------------------------
// Precedence and grouping
// ---------------------------------------------------------------------------

export const precedence: FormulaCase[] = [
  {
    name: "multiplication binds tighter than addition, on the right",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "2 + 3 * 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(14),
  },
  {
    name: "multiplication binds tighter than addition, on the left",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "2 * 3 + 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(10),
  },
  {
    name: "division binds tighter than subtraction",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "10 - 6 / 2",
    shape: NOTHING,
    values: {},
    expected: answersNumber(7),
  },
  {
    name: "parentheses lift addition above multiplication",
    group: "precedence-and-grouping",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "(2 + 3) * 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(20),
  },
  {
    name: "parentheses nest",
    group: "precedence-and-grouping",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "((1 + 2) * (3 + 4)) - 1",
    shape: NOTHING,
    values: {},
    expected: answersNumber(20),
  },
  {
    name: "parentheses around a whole formula change nothing",
    group: "precedence-and-grouping",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "(2 + 3)",
    shape: NOTHING,
    values: {},
    expected: answersNumber(5),
  },
  {
    name: "an unclosed parenthesis is refused when the formula is read",
    group: "refused-at-read",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "(2 + 3",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "addition binds tighter than comparison",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 + 2 < 4",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
    // Read as `(1 + 2) < 4`. Read the other way there is no formula at all.
  },
  {
    name: "addition binds tighter than comparison, answering false",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 + 2 < 3",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "multiplication binds tighter than comparison",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "2 * 3 == 6",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "comparison binds tighter than and, on both sides",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 < 2 && 3 < 4",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "comparison binds tighter than and, answering false",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 < 2 && 4 < 3",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "and binds tighter than fallback",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "{flag} && true ?? false",
    shape: FLAG,
    values: {},
    expected: answersBoolean(false),
    // Read as `({flag} && true) ?? false`. `{flag}` is absent, so the `&&`
    // answers absent, and the fallback then answers false. Were `??` the
    // tighter of the two it would read `{flag} && (true ?? false)`, which is
    // `absent && true`, which is absent — so a value against absent is what
    // tells the two readings apart.
    //
    // `false && absent ?? true` cannot do this job: under the short circuit
    // both readings answer false.
  },
  {
    name: "and binds tighter than fallback, with the left side present",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "true && false ?? true",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
    // `(true && false) ?? true` is false; the left side is there, so the
    // fallback keeps it. Both readings of the ladder answer false here, so
    // this pins the answer rather than telling them apart.
  },
  {
    name: "fallback is loosest, over a comparison on its right",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "{flag} ?? 1 < 2",
    shape: FLAG,
    values: {},
    expected: answersBoolean(true),
    // Read as `{flag} ?? (1 < 2)`. Read the other way, `({flag} ?? 1)` would
    // put a boolean-or-number against `< 2` and be refused at check.
  },
  {
    name: "fallback is loosest, over a comparison on its left",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "{count} > 2 ?? false",
    shape: COUNT,
    values: {},
    expected: answersBoolean(false),
    // `({count} > 2)` is absent because `{count}` is; the fallback then
    // answers false.
  },
  {
    name: "the whole precedence ladder in one formula",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 + 2 * 3 > 5 && 2 - 1 < 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
    // `((1 + (2 * 3)) > 5) && ((2 - 1) < 2)`.
  },
]
