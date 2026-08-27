---
id: 45ee420d-fa3d-525a-a9c5-160c5681b3fd
page-type-slug: finding
title: "All projects scope example left it"
domain-slug: domain/alanwalton-app
---

# Claim

`completion-points.ts` gives Dalla as the example of the all-projects `project-completions` scope, and her live row declares `owned-project-completions` at a bar of 4. No persona declares `project-completions` at all: across 42 persona rows the sources in use are `owned-project-completions` (14), `cluster-downtime`, `task-completions` and `appearance-experiment`. The scope's only documented example names a persona who left it, and the scope has zero live users.

# Evidence

Measured 2026-08-07 against the live database and `~/code`, while emptying `dirty/skills/persona-craft/economy-family-completions.md`, whose `## Two scopes, two bars` section says "Athena alone holds it" of this scope and is queued for removal.

The comment. `packages/alanwalton/daily-tracking/src/completion-points.ts` lines 8-11, in the docblock over the whole pass: `faucetSource = "project-completions"` gives "ALL Done projects (the all-projects faucet; e.g. Dalla)", and `owned-project-completions` gives "only Done projects the persona OWNS, i.e. whose `owner` attribute equals her slug (e.g. Ryn)." The Ryn example is correct; the Dalla example is not.

The rows. `ops page list --type persona --properties slug,faucetSource,faucetKind,greenDayPoints --limit 200 --json` returns 42 persona rows. Grouped by `faucetSource`: `owned-project-completions` holds fourteen — ryn@8, ember@4, athena@4, astra@4, awen@4, vera@4, dalla@4, olwen@4, atlas@4, nimue@4, thea@4, rhia@1, echo@2, elin@2 — `cluster-downtime` holds aranya@2, `task-completions` holds amy@3600, `appearance-experiment` holds shaestrel@2, and 25 carry no source. `project-completions` appears on none.

Dalla is in the fourteen, at the owned scope, bar 4. The docblock names her as the example of the one scope she is not on, and the quarantined document above independently records her migration off it on 2026-07-02.

Nothing reports either half. Line 14 of the same docblock says "With no persona declaring either source the pass is a clean no-op", so a scope with zero declarers is a designed-for state rather than an error, and a comment is checked by nothing.

Distinct from `alanwalton-app/faucet-deposit-pass-deleted.md`, `faucet-engine.ts`'s docblock naming a deposit pass that does not exist, and from `alanwalton-app/stale-prefix-hides-a-live-total.md`, a retired `pointsPathPrefix` shadowing `totalPoints` for four personas.

Not established: whether `project-completions` should still be supported.
