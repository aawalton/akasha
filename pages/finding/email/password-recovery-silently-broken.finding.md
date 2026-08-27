---
id: 9438e574-5938-5735-b9ec-bbac3e7121d0
slug: password-recovery-silently-broken
page-type-slug: finding
title: "Password recovery silently broken"
domain-slug: domain/email
---

# Claim

Password recovery is silently broken in production for Temper: GoTrue's `/auth/v1/recover` endpoint returns HTTP 200 `{}` and logs `user_recovery_requested` with no SMTP attempt, no mail log, and no error, because `GOTRUE_SMTP_HOST` is configured as an empty string and no transactional-email sending capability exists anywhere in the estate.

# Evidence

Project #15916, domain `email`, status `someday_maybe`, `live-on: deploy`. Blocks Temper's first user (David) if he forgets his password. Handed off by ember (web half: #15913); observed on #15909.

Observed in prod (ember, decisive): `POST .../auth/v1/recover` returns HTTP 200 `{}`, GoTrue logs `user_recovery_requested`, then no SMTP attempt, no mail log, no error. "The API lies."

Verified in-repo (aranya, 2026-07-25): `packages/infra/k8s/gotrue/synth.ts:259` sets `GOTRUE_SMTP_HOST` to `""`. `synth.ts:230` sets `GOTRUE_SITE_URL = "https://alanwalton.com"`; `GOTRUE_URI_ALLOW_LIST` includes `tempereso.com`/`dev.tempereso.com`. `synth.ts:252` sets `GOTRUE_MAILER_AUTOCONFIRM = "true"`, justified in `gotrue/CLAUDE.md:29` as "SMTP is never exercised" — true for signup, false for recovery; both need correcting. GoTrue image `supabase/auth:v2.188.1`. No transactional-email capability exists anywhere — no SMTP/Resend/SendGrid/Postmark/Mailgun/SES credential in `~/.secrets.env` or any sops manifest, no outbound sender in code; Gmail OAuth creds present are for the inbound mail watcher only. No `resetPasswordForEmail` caller exists, consistent with #15913's UI affordance not existing yet.

SITE_URL question resolved: ember's inferred concern that `SITE_URL=alanwalton.com` misroutes a reset link is moot since no caller exists yet — GoTrue honors `redirectTo` when allow-listed, and `tempereso.com` already is; #15913 should pass it explicitly.

Decision needed from Alan (vendor + cost). Recommendation: Resend — free at this volume, plain SMTP, domain-verified on `tempereso.com` via Cloudflare DNS. Tradeoff: another third-party credential (#15915's artifact-rot class) — ship with a liveness detector. Self-hosting rejected (no sending reputation). Alternatives: AWS SES, Postmark, Gmail-SMTP (avoid).

Scope once decided: provision sender + verify domain; credential into sops (`GOTRUE_SMTP_*`); correct `synth.ts`/CLAUDE.md; verify end-to-end against a real inbox; ship a delivery detector; ping ember.
