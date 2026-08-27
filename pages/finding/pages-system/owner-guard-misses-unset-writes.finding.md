---
id: d91f6b13-18bd-5e4e-a20e-6abf6e1ee94d
slug: owner-guard-misses-unset-writes
page-type-slug: finding
title: "Owner guard misses unset writes"
domain-slug: domain/pages-system
---

# Claim

The owner-stability guard `_enforce_owner_stability` (landed by #15971) no-ops when a `set` names no `userId`, so an owner-less `where` on `upsertPage` still silently rewrites a foreign row cross-owner — the guard makes owner *reassignment* unrepresentable but not writes to a foreign row that never mention `userId`, and this is a second, distinct path to the same write-boundary invariant alongside the raw-SQL path already tracked on #16019.

# Evidence

Project #16222, domain `pages-system`, `someday_maybe`, captured but never defined.

2026-07-25T15:47Z: found by #16172's implementer while fixing a stale test. `_enforce_owner_stability` (landed by #15971) no-ops when `set` names no `userId`, so an owner-less `where` still silently rewrites a foreign row cross-owner. #16172 was dispatched assuming the guard made cross-owner reassignment unrepresentable through `upsertPage`; it actually makes owner *reassignment* unrepresentable, not writes to a foreign row that never mention `userId`. A second test on #16172 pins the behaviour.

Why its own row: #16172's scope was the stale test only, correctly discharged. This is a live write-boundary gap and the second distinct path to the same invariant — #16019 already tracks the raw-SQL path (`upsertPageRowPg` `ON CONFLICT ... SET user_id = EXCLUDED.user_id`, documented intentional at `pg/move-attribute-to-content.ts:51`). Three paths exist to one invariant; at filing it held on only one.

Left open: whether any legitimate caller writes to a row it doesn't own without naming `userId` — 96 call sites answer "who calls it," not "who would write foreign." Guard live on main since 10:33Z (`e4d153d24a`) with no reported breakage — suggestive, not a verified negative.

2026-07-25T16:38Z halt-time (astra): not started, status left at exploration. Ownership: astra re-homed the row to themself at 16:27Z, predating Alan's full-halt; ember had withdrawn her own re-homing request and the halt forbids owner changes, so astra did not revert but flags this as a pre-halt fact for the restart to ratify or undo deliberately. Claim by construction: astra already held #15971 (the guard) and #16202 (the test asserting the hazard the guard designed out); this is the third path on the same pages-write boundary. Explicitly not claimed: #16019's raw-SQL path, which crosses into CI tooling and was never opened or scoped by astra — ownership of #16222 should not be read as ownership of #16019.
