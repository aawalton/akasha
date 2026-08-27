---
id: 68538e23-6c11-56f1-a692-e5e4117f8379
slug: prometheus-claude-rules-outlive-source
page-type-slug: finding
title: "The cluster runs an exporter query and two alerts whose source the code repository deleted"
domain-slug: page-type/alert
---

# Claim

The cluster runs a prometheus exporter query and two alerts that the code repository deleted on 2026-08-18, and the two `claude-account` alert documents in this repository describe a path no source answers to.

# Evidence

Commit `ec875320f9` on `main` ("prometheus reads no claude-account rows: the token-expiry exporter and its auth-death alerts are gone") removed `synth-exporters-oauth.ts`, `synth-alerts-oauth.ts` and `oauth-auth-health-constants.ts`. A grep of `packages/infra/k8s/prometheus/*.ts` for `claude_account_token_expiry` and `ClaudeAccountLoginNeeded` now returns nothing.

The live cluster still carries both. `kubectl get configmap -A` on 2026-08-19 shows `prometheus/postgres-exporter-queries` holding `claude_account_token_expiry` with `WHERE page_type_slug = 'claude-account'`, and `prometheus/prometheus-config` holding `ClaudeAccountLoginNeeded` and `ClaudeAccountTokenExpiryMetricAbsent`. Nothing has resynthed and applied those configmaps since the removal landed.

What that drift cost, measured: because the account writers moved to files and stopped writing the rows at 2026-08-19T02:34Z, the rows' `expiresAt` went stale and `ClaudeAccountLoginNeeded` fired against all eight accounts from 07:19Z onward — eight false alerts naming accounts whose tokens were in fact being refreshed onto their files the whole time. Soft-deleting the rows at 21:52Z cleared all eight, and left `ClaudeAccountTokenExpiryMetricAbsent` pending in their place, which is accurate and clears on the same resynth.

`domains/alerts/claude-account-login-needed.md` and `domains/alerts/claude-account-token-expiry-metric-absent.md` still stand in this repository. Nothing in the code repository answers to either; they are named only from tests (`tools/tests/decide-alert-recipient.test.ts`, `tools/tests/decide-alert-event.test.ts`, `packages/agents/shared/alert-condition-event.unit.test.ts`).
