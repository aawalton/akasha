---
page-type-slug: finding
id: 6766062c-9e37-5fd1-a279-0ef85fc211dc
slug: named-times-reach-only-three-tests
title: "Named times reach only three of six tests"
domain-slug: domain/page-queries-system
---

# Claim

`now` and `wake-day` are resolved for `at-or-after`, `before` and `is`, and left as literal text for `in`, `not-in` and `contains`, so a query naming one of them there matches nothing and reports a clean zero.

# Evidence

Measured 2026-08-21 against `tools/lib/page-query.ts` at commit `0c4bacbf`.

`passes()` runs each test in turn. Three call `stated()`, which swaps a named time for its value: `is` at line 134, `atOrAfter` at 146 and `before` at 150. The other three compare `test.in`, `test.notIn` and `test.contains` against the row directly, so `in: [wake-day]` asks for a row whose value is the eight characters `wake-day`.

`answer()` decides whether to derive the wake instant at all by scanning for the three resolved slots only:

    const named = (one: Test): boolean =>
      one.is === WAKE_DAY || one.atOrAfter === WAKE_DAY || one.before === WAKE_DAY

So a query using `wake-day` under `in` skips the derivation as well as the substitution.

The failure is silent in both directions. A query is refused for naming a key that no page carries, and refused for a page type it cannot reach, but a test that matches no row is a legal answer of zero — which is also what a true zero looks like. `is: wake-day` on `page-queries/email-entry-lowest-inbox-count-today.md` returned `{"n":0}` against an entry standing at `memory:pages/email-entry/2026-08-21.email-entry.md` carrying exactly that date, and nothing in the answer said why.

`is` was in this same state until `0c4bacbf` and was found only by asking a query whose answer was known to be one row.

Not measured: whether any query standing today names a named time under `in`, `not-in` or `contains`. `page-queries/` was not swept.
