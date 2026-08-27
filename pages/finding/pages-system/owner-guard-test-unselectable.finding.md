---
id: 1a30d23d-d391-5d45-b33d-aacbcd6b1e07
slug: owner-guard-test-unselectable
page-type-slug: finding
title: "Owner guard test unselectable"
domain-slug: domain/pages-system
---

# Claim

`packages/shared/pages/access/src/upsert.database.test.ts` asserted a pre-guard hazard (an owner-less write crossing owners) that #15971 deliberately designed out on 2026-07-25, and the reachability-based CI test selector cannot select this test from a change to the guard it covers because the two are coupled only through a plpgsql function resolved by name at runtime, not through an import edge.

# Evidence

From project #16202 (domain `pages-system`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from the retired `notes` attribute 2026-08-15.

Surfaced by ember in the 07-25 CI investigation, confirmed by astra by direct observation. Failing-instance domain: astra's (`@shared/pages-access`); selector blind spot: athena's.

**Failure**, reproduced against rolled-back pglite: `packages/shared/pages/access/src/upsert.database.test.ts`, test "the where IS the whole match — an owner-less where crosses owners (why callers narrow)" — `PageWriteError: userId cannot be reassigned on an existing page` (P0001, plpgsql `RAISE`).

**Not a regression.** `e4d153d24a` ("fix(#15971): forbid owner reassignment at the write boundary") deliberately designed out the hazard this test still documents, same day. Guard: `packages/shared/pages/proc/src/_enforce_owner_stability.ts:78`, covered by `owner-stability-guard.database.test.ts` (4+ passing assertions).

**Blast radius, measured:** access 687/1 fail (113 files); proc 177/0 (10); proc-compiler 1100/0 (61); versions 26/0 (5); total 1989 pass, 1 fail, 189 files.

**Direction carried (not dispatched):** rewrite the test for the new contract (cross-owner upsert rejected), keep the why-callers-narrow narrative.

**Not this domain's to fix:** the CI selector runs off import reachability and cannot see the plpgsql-by-name coupling between this test and its guard, so a proc-lowering change never selects it. athena files the selector blind spot separately (class: any test coupled by string, registry lookup, page-type slug, or proc name). Measured: main runs no source checks; staging ran unit/property/component, not database; 1 of 11 recent pipelines had a database step.

**Confirmed both sides**, 2026-07-25T15:04:43Z: the slow-suite gate selected both suites here only because the test files were directly changed — contrast #15971 (proc source + patch lowering), unselectable via import edge.
