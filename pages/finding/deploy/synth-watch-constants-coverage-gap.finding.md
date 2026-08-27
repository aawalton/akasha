---
id: 9bb95c83-b8ca-51ed-95dd-d549d6e11d70
slug: synth-watch-constants-coverage-gap
page-type-slug: finding
title: "Synth watch constants coverage gap"
domain-slug: domain/deploy
---

# Claim

`check-foundation-synth-watch`'s coverage of the synth-emits import fold is scoped to `synth*.ts` files, leaving the `*-constants.ts` modules the fold also reaches (e.g. `domain-expiry-constants.ts`, `oauth-auth-health-constants.ts`) unchecked — so a constants-only threshold change can silently drop out of the fold, triggering no workflow run and no pod roll, while the alert keeps evaluating the stale threshold and nothing fails to notice.

# Evidence

Captured by aranya 2026-07-26, spun out of #16335. Found while refuting the claim that alert-only changes do not deliver.

What delivers today: a prometheus change confined to synth-alerts.ts touches none of the six watchNodes seeds, so on a naive reading it should not trigger the workflow. It does. The synth-emits edge at `packages/infra/ci/workflows/.../closure.ts:234-238` folds synth.ts's transitive import closure into the watched set, so anything synth.ts reaches — alert fragments and constants modules included — is watched by construction. Commit 0bbcd14 (#16330) touched only synth-alerts.ts; pipeline 25999 ran the full workflow, restarting the pod at 22:26:04Z. A good mechanism, but nothing protects it.

The gap: `check-foundation-synth-watch` enforces the fold's coverage, scoped to `synth*.ts` files only. The `*-constants.ts` modules — `domain-expiry-constants.ts`, `oauth-auth-health-constants.ts`, `macbook-inference-constants.ts`, `kubepods-oom-constants.ts` and siblings — sit inside the fold, outside the check. Not incidental: the #14219 discipline interpolates thresholds from a constants module so exporter and alert cannot drift, so a threshold change is often constants-only.

Failure mode: the fold stops covering a constants file, a threshold change lands, no workflow runs, no pod rolls, the alert keeps evaluating the old threshold. Nothing fails — merely wrong, not broken, the hardest kind to notice.

Fix: make the fold guarantee explicit — assert every module reachable from synth.ts is watched, not just synth-prefixed ones. Same shape as the existing check, widened to its real boundary.

Relationship to #16335: that row verifies post-rollout that live rules match committed ones — catches delivered-but-wrong when another change triggers the workflow. If the fold collapses on a constants-only change, no pipeline runs and this gate never executes.

Captured, never defined — moved off the retired `notes` attribute on 2026-08-15.
