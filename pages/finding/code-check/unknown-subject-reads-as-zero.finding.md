---
id: 6510d84d-900e-52e4-9423-42793eb81c0e
page-type-slug: finding
title: "Unknown subject reads as zero"
domain-slug: domain/global
---

# Claim

A read verb that answers an unknown subject with a zero at exit 0 makes a mistyped name and
a subject that never ran the same reading, so the answer to a question nobody asked arrives
looking like the answer to the one they did.

# Evidence

Measured 2026-08-04, 21:20 UTC, against the deployed verb landed by row #17815 at
01e98153e65160eb1ed80ddb225cb7f47e6216dc.

`ops pipeline step-cost --step check-does-not-exist-at-all --limit 5` returns:

  step      check-does-not-exist-at-all
  runs      0
  timedRuns 0

and exits 0. The same shape with a real name returns the run rows and count/min/median/max
— `check-addon-build --limit 8` returned 8 runs, 7 timed, min 2382ms, median 5235ms, max
116530ms, and its figures for pipelines 27035, 27041 and 27032 agree run-for-run with
`ops pipeline perf --seq` read individually.

The verb does state its zero, which is the honest half and is more than the silence a
caller usually gets. What it does not do is separate the two populations behind that zero:
a name with no runs in range, and a name that names nothing. Step names in this estate are
long and hyphenated — `check-app-build-archive-of-worlds-web`, `check-cli-prose-flag-route-
coverage`, `check-pages-slug-attribute-readers` — so a typo is the ordinary case rather
than the careless one, and the verb exists to be called repeatedly while hunting a budget.

This is the same shape that cost two seats an evening: an instrument returning nothing,
read as a reading. `domains/instructions-check.md` binds the rule for checks — state what
was measured, and fail where nothing could be. Nothing states it for a read verb.

NOT MEASURED. Whether the underlying query could distinguish the two cases cheaply. How
many other `ops` read verbs answer an unknown subject with an empty result at exit 0.
Whether any caller consumes step-cost non-interactively today.
