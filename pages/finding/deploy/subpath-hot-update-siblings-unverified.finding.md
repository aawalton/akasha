---
id: 54b17711-76f1-5913-9eec-03eabc42a363
slug: subpath-hot-update-siblings-unverified
page-type-slug: finding
title: "Subpath hot update siblings unverified"
domain-slug: domain/deploy
---

# Claim

A ConfigMap mounted with subPath never hot-updates (kubelet never refreshes it) — a class #16335 fixed for one instance (prometheus), leaving two siblings unverified: pgbouncer, guarded imperatively by a `kubectl rollout restart` at `packages/infra/k8s/pgbouncer/foundation.workflow.ts:87`, unconfirmed; and headscale, a documented manual-restart dependency. #16335's post-rollout diff pattern transfers to pgbouncer; headscale needs a prior call on whether manual-restart is acceptable.

# Evidence

Captured by aranya 2026-07-26, split off #16335, which fixed one instance; this closes the class. No objective was ever written for this row.

The class: a ConfigMap mounted with subPath never hot-updates — the kubelet does not refresh a subPath-mounted file, so the running process keeps what it started with regardless of what the ConfigMap says. Every rung below the running process (file valid, manifest applied, workflow green) passes while the live process runs stale config — how #16335 went undetected: prometheus rules were parseable, committed, applied, nobody asked whether the process had them.

Two known siblings, both unverified: pgbouncer has the identical subPath shape, guarded the same way at `packages/infra/k8s/pgbouncer/foundation.workflow.ts:87` (a `kubectl rollout restart` line) — the mechanism exists, but nothing observes running pgbouncer to confirm the config it serves; drop or skip that line and nothing catches it. Headscale is a documented manual-restart case — a human has to remember, the weakest rung, the one prometheus was on across five places before #16335.

What #16335 built and why it transfers: after rollout, read the live process's own state over its API, diff against what the repo committed, gate the stamp on that diff, fail-closed. Proved in production: pipeline 26131, 65 rules compared, confirming an unrelated #16370 change was genuinely delivered. Pgbouncer analogue: `SHOW CONFIG` diffed against committed `pgbouncer.ini`. Headscale needs the judgment call first: whether manual-restart is acceptable, or the fix gets the same automated footing.

Premise warning: the capturing worker's three premises about #16335 were all wrong — it asserted a manifest property (three imperative kubectl lines), asserted ungated (content-gated on `ci.inputsHash`), and asserted alert-only changes never deliver (they do, via synth-emits import fold; commit 0bbcd14 proved it). Verify pgbouncer and headscale by observation first.
