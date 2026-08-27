---
id: 6a3d681e-8160-557d-8e47-15a69ddedd13
page-type-slug: finding
title: "Faucet deposit pass deleted"
domain-slug: domain/alanwalton-app
---

# Claim

`packages/alanwalton/daily-tracking/src/faucet-engine.ts` documents `isEngineDeferred` — the one function saying who the generic engine defers to — as deferring "the session faucets — Amy/Selah/Zeli — via the session-points pass, Ruby via the deposit pass". There is no deposit pass. `src/relationship-deposit-points.ts` does not exist, and `SESSION_SPECS_BY_SLUG` holds `ruby` beside the other three, so Ruby goes through the session pass with them.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`faucet-engine.ts:242-252`, the docblock over `isEngineDeferred` — "a dedicated daily pass for `external` (the session faucets — Amy/Selah/Zeli — via the session-points pass, Ruby via the deposit pass, and the recipe-bound project-completions pass in `completion-points.ts`)".

`packages/alanwalton/daily-tracking/src/relationship-deposit-points.ts` does not exist; `ls` on the path fails.

`src/session-points-totals.ts:129-134` — `export const SESSION_SPECS_BY_SLUG: Readonly<Record<string, PersonaSessionSpec>> = { amy: LOVE_SESSION_SPEC, zeli: VISUAL_ARTS_SESSION_SPEC, selah: PRAYER_SESSION_SPEC, ruby: ROMANCE_SESSION_SPEC }`. Ruby is a session persona alongside the three the comment separates her from.

"Deposit" survives only as a ledger name, not a pass: `session-points-totals.ts:114` refers to the `relationship-deposit` ledger, and `faucet-engine.ts:44` folds a `depositPoints` field. Neither is a daily pass, and `grep -rniI "deposit" packages/alanwalton/daily-tracking/src/ --include=*.ts` returns nothing else.

So a reader of the one function that states who the engine defers to is sent to a deleted module to learn how a quarter of the deferred set is written.

Filed while ingesting `dirty/questions/code-repo-source-comments.md`, whose faucet entry recorded this and was cut as not being instruction. That entry also charged the package's `docs/surfaces.md:56` with the same drift plus an `aine` that appears in no spec; that file is no longer in the code repo, standing only at `dirty/code/packages-alanwalton-daily-tracking-docs-surfaces.md`, itself queued for removal — so nothing is claimed here about it.
