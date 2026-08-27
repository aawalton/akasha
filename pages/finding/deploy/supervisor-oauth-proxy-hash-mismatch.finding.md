---
id: 8003e75a-ff7f-5865-8a1a-bceab6a709b3
page-type-slug: finding
title: "Supervisor oauth proxy hash mismatch"
domain-slug: domain/deploy
---

# Claim

The deploy-staleness detector #15925 ships (liveVersion==commitSha of the most recent terminal MAIN pipeline whose workflow ran) cannot reach two of seven publish steps — supervisor and oauth-proxy — because those two write `--version "$HASH"`, a 64-hex content hash of built bytes, never equal to a 40-hex git sha: value-equality is undefined there, not merely unimplemented, and a stale supervisor outranks a stale web app since it launches every agent.

# Evidence

Project #16353 (domain: deploy, someday_maybe). No initiative named.

Split out of #15925 (worker-15925, 2026-07-25): ships detection for five web apps (liveVersion==commitSha of the latest terminal MAIN pipeline run). Residual: of seven workflows with a publish step, five write `--version "${ci.commitSha}"`; two write `--version "$HASH"` (sha256): `agents-supervisor-publish-supervisor-version` (`packages/agents/supervisor/apps.workflow.ts:39-43`), `agents-oauth-proxy-publish-oauth-proxy-version` (`packages/agents/oauth-proxy/apps.workflow.ts:51`). 64-hex hash never equals 40-hex sha — undefined, not unimplemented.

Same failure shape as web apps (same step gate, `dependsOn` behind source-sync; #15912 unchanged): failed upstream blocks publish, liveVersion keeps old hash. Stale supervisor outranks a stale web app — it launches every agent.

Partial coverage: `move-to-deploy-outcome-verify.ts`+`pure/decide-deploy-outcome-verify.ts` (#14052) deploy-verifies `local-supervisor`, project-deploy only, hardcoded `agents-supervisor` — oauth-proxy uncovered. `bun ops model-gateway status` reports drift manually.

Four mechanisms on #15925 (do not redo): (1) Postgres — dead end: `step` has no log/stdout; `deployedInputsHash`/`inputsHash` is a different 12-hex dedup key, not published. (2) Loki — works but costs: 7 apps funnel through one writer (`packages/infra/scripts/src/set-app-live-version.ts:46`), confirmed vs. seq 26018; adds IO to devops-monitor's required-pure classifier (CLAUDE.md:39), retention-bounded. (3) DB-only freshness — trap: `deployedAt` writes before workflow rolls to `completed`, naive `>=` false-fires on healthy deploys; bracket against pipeline START not terminal. (4) Recompute hash — oauth-proxy's algorithm is extracted/tested (`computeOAuthProxyTreeVersion`, `packages/agents/supervisor/src/oauth-proxy-tree-version.ts:242-266`); supervisor's is inline bash, unextracted — a latent defect worth fixing.

Build on #15925, do not duplicate it.
