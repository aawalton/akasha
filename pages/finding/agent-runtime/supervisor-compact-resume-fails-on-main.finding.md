---
id: 8ad32375-debf-547f-8f42-363313abf25d
page-type-slug: finding
title: "Supervisor compact resume fails on main"
domain-slug: domain/agent-runtime
---

# Claim

`supervisor-compact-resume.integration.test.ts` fails on `main` and is in no suite CI runs, so a broken acceptance for the compact-resume driver has been standing green at the pipeline level.

# Evidence

Measured 2026-08-12 at code `main` HEAD `846efe4c`.

`bun test packages/agents/supervisor/src/supervisor-compact-resume.integration.test.ts` runs 2 tests, 1 pass 1 fail. The failing case is "a headless seat whose row is held by another layer is NOT woken, and says so on the row" (#17059). It fails at line 240: `readDeferredNotice(agentId)` returns `null` where the case asserts a held notice was written. The case's own comment says the absent marker is "the state a stalled seat is in" and that this is the assertion that fails on an untouched base — so the failure is the marker never being written, not the wake.

It reproduces alone and depends on nothing #18836 touched; #18836's branch CI passed 115/115 (pipeline 27875) and the main pipeline over the landed SHA passed 20/20 (27880). So this file is not in either suite.

Two separate things are wrong: the case fails, and nothing reports that it fails.
