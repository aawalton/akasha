---
id: 249ee6a4-0bd8-5026-a0c2-3d5e6e5267db
slug: headless-boot-dies-on-expired-refresh
page-type-slug: finding
title: "Headless boot dies on expired refresh"
domain-slug: cluster-service/auth-proxy
---

# Claim

An expired refresh token on the registration account kills every headless seat at boot, and nothing renews it ahead of expiry, warns that it is close, or stops seats being dispatched into it.

# Evidence

`packages/agents/supervisor/src/supervisor-agent.ts:159` throws when a credential needs refreshing and the refresh returns a non-ok outcome, for the non-interactive case alone: "A headless session cannot re-authenticate." The interactive branch below it survives by launching in re-auth mode. So a person at a terminal is told to run `/login` and a headless seat simply dies.

Measured on 2026-08-10 between roughly 17:10 and 18:13 UTC: 19 seats under `~/agents/*/spawn.log` failed with `invalid_grant: Refresh token expired`, each exiting about 300ms after launch. Among them five `own-editor` developers, two readouts developers, one `person-enrolment` developer, and the code-check review worker, which respawned about once a minute for the same three checks and landed nothing. The outage ended only because Alan re-authenticated after being told.

Refreshing is reactive: it runs at boot, when the credential is already inside `REFRESH_BUFFER_MS` of expiry. `ops claude-account status` shows an `expiresAt` per account, so how long each has is readable at any time, and nothing reads it on a schedule. An account whose only sessions are headless can therefore reach expiry with no path back — the one act that repairs it cannot be performed by anything that would notice.

`packages/agents/oauth/src/oauth-account-health.ts` maps a refresh outcome to `ok`, `terminal` or `retryable` and writes it as claude-account health, so the category was available to be recorded when this happened. Whether a row was written was not checked. What is established is that nothing reached Alan: he learned of it from a lead who found it while investigating a dead seat of her own.

The domain does not reach the code. `domains/auth-proxy.md` declares `code-path: packages/infra/auth-proxy/**`, and every file above sits in `packages/agents/oauth/`, `packages/agents/oauth-proxy/` or `packages/agents/supervisor/`.
