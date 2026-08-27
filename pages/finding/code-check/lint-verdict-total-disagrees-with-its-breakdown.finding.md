---
id: 379a65b8-0da8-582b-84cb-b9c32c89e5c3
page-type-slug: finding
title: "Lint verdict total disagrees with its breakdown"
domain-slug: domain/global
---

# Claim

`deriveLintVerdict` can emit one evidence object whose error count and its own category breakdown disagree — `errors: 0` beside `errorsByCategory: { other: 1 }` — because the two come from different passes over biome's report and nothing compares them. Where biome also exits 0, the one cross-check the verb does make cannot fire, and the verdict reads PASS.

# Evidence

Read on main 2026-08-07, in `packages/infra/checks/src/lib/lint-verdict-core.ts`.

The two figures are computed independently. `errors` is destructured from `report.summary` at `:282`. `errorsByCategory` comes from `attributeErrors(report)` at `:283`, which at `:191-199` walks `report.diagnostics` itself and tallies every diagnostic whose `severity` is `"error"`. Both land in the same `LintEvidence` object at `:341-346`. Nothing in the function compares one against the other.

The cross-check the verb does make is a different pair. At `:317-328` it tests `biomeExitCode === 0` against `errors === 0` and refuses on a mismatch. An `internalError/io` diagnostic carried at severity `error` while `summary.errors` stays 0 leaves both sides of that test saying clean, so it does not fire, and the run reaches the pass arm with a self-contradicting evidence object.

The empty-cohort instance a reader met before IS closed. `:305-313` now refuses when `changed + unchanged` is 0, with its own reason — "a verdict over an empty cohort is not a verdict". That is the arm the original observation predicted would close the instance and not the class, and the prediction was right: a path that opens files AND draws an internal error still passes.

The remedy the original named is still the one available — a cross-check between `summary.errors` and the count of error-severity diagnostics — and it still needs the legitimate skews sized first, since `attributeErrors` and biome's own summary may count different things on purpose.

Nothing in `~/memory/findings/` carries this: `pages/finding/code-check/lint-verdict-root-misstated.finding.md` is about `--repo-root`, and `pages/finding/code-harness/lint-verdict-measures-the-main-checkout.finding.md` about which tree it opens. Carried out of a quarantined document queued for removal, and re-read against the source.
