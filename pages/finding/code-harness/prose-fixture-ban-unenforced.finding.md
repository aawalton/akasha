---
id: 30460d53-6a95-5e8d-9498-00a8f851a54b
page-type-slug: finding
title: "Prose fixture ban unenforced"
domain-slug: domain/global
---

# Claim

A ruling that fixtures under `packages/infra/checks/__fixtures__/prometheus-rule-tests` may not assert alert wording is enforced only by a comparison failure that never names the ruling, so a fixture reintroducing prose reads as a broken alert rather than as a fixture written the wrong way.

# Evidence

Commit `2b907397f8` (2026-08-14, Alan) removed all 18 `exp_annotations` blocks from the five fixtures standing then, and added `withoutAnnotations` in `packages/infra/checks/src/lib/promtool-rules.ts`, which deletes every rule's `annotations` before the `promtool test rules` rung. Its message states the intent: "No fixture in that directory can carry prose again."

`cert-expiry.test.yml` and `postgres-connections.test.yml` were written the next day, 2026-08-15, and carried five `exp_annotations` blocks between them — four and one. Nothing refused them.

What the reader meets is not the ruling. `promtool` compares the whole annotation map with no "don't care", so each of the five reads:

    Labels:{alertname="PostgresHighConnections", ...}
    Annotations:{}

against an expected `summary`/`description` pair. Three alerts fail this way — `CertManagerCertRenewalOverdue`, `CertManagerCertRenewalOverdueCritical`, `PostgresHighConnections` — and `check-prometheus-rules` exits 1. Read cold, that output says the alerts lost their annotations. The alerts have them: `synth-alerts.ts:201` carries both for `PostgresHighConnections`. It is the check that removed them, one call away at `check-prometheus-rules.ts:217`, and nothing in the failure text points there.

Three of the five older fixtures carry a hand-written comment recording the constraint (`cgroup-psi.test.yml:23`, `git-mirror.test.yml:31`, `merge-queue-config-load.test.yml:30`), which is the whole of the guidance a fixture author gets, and it reaches only someone already reading a fixture that has it.

The check exits 1 on a clean `origin/main` checkout at `c1235611a8`, measured directly. Main's own pipelines are green (28134 and back) because the suite is watch-scoped and nothing on main touches the prometheus files, so the failure stands unmeasured until a change touches them.

Removing the five blocks takes all 7 fixtures to passing and the check to exit 0.
