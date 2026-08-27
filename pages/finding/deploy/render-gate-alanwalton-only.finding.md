---
id: ef1d1a74-f42f-5c64-83a7-7bc80ffa4eb9
slug: render-gate-alanwalton-only
page-type-slug: finding
title: "Render gate alanwalton only"
domain-slug: domain/deploy
---

# Claim

The post-deploy render-gate renders only a fixed alanwalton canary page set, so it covers the shared Electric/TanStack-DB hydration outage class across every app but does not catch an app-specific render break in a non-alanwalton app, including one left undetected because the deploying agent crashed after the deploy landed and before its own manual post-deploy check ran.

# Evidence

Filed as project #15888, domain `deploy`, status `someday_maybe`. Reported by agent 019f8b2d, olwen-suggested.

Gap: two deploys (#15863, #15868) both render-checked the same 3 alanwalton pages. The post-deploy render-gate (`move-to-deploy-render-gate.ts`, #14656) renders a fixed alanwalton target set as a shared-hydration-path canary for the #14627 client-live-sync-store outage class — covering the shared hydration path every app rides, but not app-specific breaks: a non-alanwalton deploy whose own root/route/wiring breaks passes green while its domain is blank. Caught only by the deploying agent's manual browser check, not deterministically.

Intent ruling (dalla): alanwalton-only canary is intended; the per-app gap is real and worth a deterministic gate. Define-front questions: which apps get canaries; each app's stable data-driven owner-owned canary page; a deploy-footprint-to-touched-app mapping so the gate renders only touched apps; each on its own domain. Constraint: any deploy-gate change needs the Deploy-Gate Change Acceptance two-sided proof (one real deploy through it, one observed FAIL on known-bad input). Priority: not urgent, behind critical-path work.

Severity check: no cron/auto-deploy path exists — every deploy is agent- or operator-initiated; infra CronJobs are maintenance sweeps only. The per-app-break catch exists on the happy path.

Residual hole: deploy-verb crash-after-land — a deploy lands then its agent dies before its own check runs; the render-gate runs inside the deploy verb too, so a crashed verb skips it until idempotent-resume retries. A deterministic per-app gate closes this: gate-before-success-report means a crash pre-gate reports no success, so resume re-runs it — unskippable, unlike a manual check. Priority still not urgent, but firmer justification now.

Asset noted: observer owns alanwalton + archive, offered an owner-owned canary page per app for define-front.

No `# Objective` — captured, never defined.
