---
id: cbc7ca19-a140-533d-b464-752f63a3597f
page-type-slug: finding
title: "Three expression functions are declared and not implemented, refusing only at evaluation"
domain-slug: domain/pages-system
---

# Claim

`ARITY` in `tools/lib/page-expression-function.ts` declares functions that `CALLS` in the same
file does not implement: `today`, `toEsoDay` and `resetInstant`. An expression naming any of
them parses, passes the write gate, lands, and then refuses at evaluation on every query of
its page type.

# Evidence

`ARITY` lists 19 functions and `CALLS` implements 15. The names in `ARITY` and not in `CALLS`
are `today`, `toEsoDay`, `resetInstant` and `recurrence`.

Found by landing one. `properties/daily-tracking-duration-seconds.md` carried the expression
the page-type row states for `durationSeconds`:

    86400 - ((prop(date) == today()) && (86400 - (now() - resetInstant()) / 1000))

Every gate passed it, including `expression-spells-key`. It then answered on every
`daily-tracking` query as

    `daily-tracking-duration-seconds` states an `expression` this evaluator refuses:
    the function call `today(...)` is not implemented

with the value reading null on all 121 days.

The document was removed at `c539b23f53` rather than left standing, because the fault is not
local to the property. `answer()` collects faults for the whole call, so one refused
expression puts a permanent fault on every query of that page type, and two reconcilers that
raise on a non-empty `faults` list would have refused every run. Measured: the fault count on
`daily-tracking` went 0 to 1 when it landed and 1 to 0 when it was removed.

The gap is that the write gate judges an expression against `ARITY` and the evaluator against
`CALLS`, so the two disagree about what a valid expression is, and nothing reports the
difference until a page of the type is read.
