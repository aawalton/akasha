---
id: 4e7679a8-9542-5067-8816-5fa0e1f14e7e
slug: docstrings-name-a-deleted-pre-land-gate
page-type-slug: finding
title: "Docstrings name a deleted pre land gate"
domain-slug: domain/code-quality
---

# Claim

Four live sites in the code repo name `docs-frontmatter` as the pre-land gate that makes their invariants safe, and that check was deleted on 2026-08-04. Three of them are the projector's own docstrings, so the exporter documents itself as running behind a validator that no longer exists.

# Evidence

Read 2026-08-07 at `~/code` HEAD `d01942409a`, while emptying a quarantined document describing the same machinery.

`git log` names the removal: `c80da2ba61`, "docs-validator: drop docs:validate entirely, and the 4,268 lines it alone kept alive". Its message states the trade — "The removed CI check called itself 'the pre-land gate for docs validation: the projector performs no validation'. So `docs:export` now projects markdown nothing has validated." The loss was deliberate and stated; what was missed is the prose left behind claiming otherwise.

`grep "docs:validate" package.json` exits 1. No check named `docs-frontmatter` stands among the 23 names in `packages/infra/checks/src/lib/check-configs.ts`. `packages/infra/scripts/src/docs-validator/validate.ts` does not exist.

The four sites, all under `packages/infra/scripts/src/docs-validator/` but the last:

- `export.ts:6` — "Performs no validation — the `docs-frontmatter` branch-CI check gates violations pre-land (#12320)".
- `page-input.ts:45` — "Throws when `bodyField` is unset ... The `docs-frontmatter` validator gates this pre-land, so by export time it is an invariant."
- `full-export.ts:165` and `:181` — a rewrite error is "gated pre-land by `docs-frontmatter` (#12320), so by export time it is an invariant violation", and "No validation here — the `docs-frontmatter` check gates violations pre-land".
- `packages/infra/checks/src/checks.workflow.ts:286` — names `check-docs-frontmatter` among the md-aware steps a docs-only pipeline runs.

The first three bite hardest: each names a specific invariant and says a gate establishes it upstream. Nothing does. A reader deciding whether to add a guard reads these and concludes one is redundant.

The same sentences survive into `packages/infra/scripts/dist/`, whose `.d.ts` set also carries a `link-rewrite-pass.d.ts` with no counterpart in `src/`.
