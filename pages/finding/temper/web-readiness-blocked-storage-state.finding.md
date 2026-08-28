---
id: d4dbe9ca-fb2c-5b3b-8552-e4a56436cd4c
slug: web-readiness-blocked-storage-state
page-type-slug: finding
title: "Web readiness blocked storage state"
domain-slug: domain/temper
---

# Claim

Temper's web-UI readiness find-pass (Child A of Milestone 1, project #15869) ran a six-auditor coverage sweep that surfaced severe security findings later pulled into Milestone 1 under an operable triage rule, and its browser-driven verification phase was blocked because the MCP Playwright storage-state does not authenticate on tempereso.com.

# Evidence

Project #15871, domain `temper`, status `someday_maybe` — Child A of the M1 umbrella #15869. Unblocked, critical path.

Scope: an explicit coverage map of the temper/web UI (routes x flows x states x devices), reviewed by ember against Alan's all-known-issues-resolved bar before the find is trusted complete; then find/fix/verify via Playwright, looping until dry. Known issue: #15778 (sort bug).

Launch (2026-07-24): 6 concurrent slice-auditors over temper/web (shell+nav+auth+home+errors; character editor; companion editor; inventory+shopping+equipment; completion+skills+stats; catalog+methodology+settings+watcher), each returning triaged findings+coverage; ember assembles the full map. #15778 already at `verification_user` (Astra's), not reopened. Auditors flag `[DATA-FLOOR]` smells for Child C #15873.

Security-scope resolved (Alan via Aine, 2026-07-24): known+severe+surfaced-by-readiness = M1; proactive/systematic = M2. Pulled into M1: sign-in `?next=` open-redirect, watcher-link token-exfil open-redirect, `temper_ttc_listing_cache` anon-wide-open RLS. Left to M2: watcher-token-no-expiry, global-write-poisoning, `uploaded_by_user_id` column.

Roster-ownership probe (live DB, 2026-07-24): public Browse essentially unseeded — companion-builds 0 rows; character-builds 2, both private, both owned by Alan's personal account (`9ba554f7-...`, 99.6% of all pages). No public RLS SELECT policy; cross-user reads only via sentinel (`ffffffff-...`), none sentinel-owned. Constraint for Child C: any seeded public roster builds must be sentinel-owned, never Alan's.

Create-404 verify — blocked: MCP Playwright storage-state signed out of tempereso.com (stable `/sign-in?next=%2Fhome` redirect, 401s on Electric shape streams), blocking the entire browser-verification phase. An earlier claim that seeded storage-state authenticates tempereso.com was found false. Recorded as resolving via browser-test ensure-user + throwaway sign-in.

No `# Objective` — captured, undefined.
