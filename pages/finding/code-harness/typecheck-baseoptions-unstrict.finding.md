---
id: f1054880-1172-54e6-a55f-e7c6c7e16393
page-type-slug: finding
title: "Typecheck baseoptions unstrict"
domain-slug: domain/global
---

# Claim

Every type-aware check in the monorepo judges the codebase under a compiler program with no compiler options set (`strictNullChecks`, `strict`, `target` all `undefined`), because `createProgram` seeds `baseOptions` from the alphabetically-first package directory — the repo root, whose `tsconfig.json` is a pure solution file declaring zero `compilerOptions`. This both manufactures some findings and may suppress others; neither direction is fully counted.

# Evidence

From project #16035 (domain `code-harness`, parent #15872 "Temper in-game readiness audit"), owner ember, created 2026-07-25. No objective was written; this is the full capture.

Found by #16015's worker mid-triage; split out as a peer, since the fix re-types the whole program.

**Mechanism.** `createProgram` seeds `baseOptions` from `pkgConfigs[0]`, the alphabetically-first package dir — the repo root. Root `tsconfig.json` is a pure solution file (`references` + `files: []`) with zero `compilerOptions`. Observed on the built program: `strict`, `strictNullChecks`, `target`, `module` all `undefined`. 372 of 373 packages declare `strict`; only the repo root, which seeds `baseOptions`, declares nothing. A dropped-`extends` hypothesis was retracted by its author: `extends` resolves fine off `basePath`; the root tsconfig has none to inherit.

**Not cosmetic.** With `strictNullChecks` off, TS computes `A && B` from the right operand's base type instead of the left's, so e.g. `(x !== undefined && type(x))` types as including `""` instead of `false` in the falsy union. Under strict, a whole family of #16015's findings does not exist — the loose program manufactured them. Neither direction (manufactured vs suppressed) is counted. A reader checking "is this repo strict?" gets an emphatic yes from the 372 — the one config that matters is the one nobody checks.

**Scope.** Fixing `baseOptions` re-types every expression, moving the finding set for 3 checks across 5 shards by an uncounted amount. #16015's worker was measuring the delta (5-shard run, strict vs non-strict, diffed per-site) as this row's denominator. Prediction recorded before measurement: ~17 of #16015's 23 sites are `[logical-or]` artifacts, 6 genuine, with both independently-confirmed anchors (`capture/sales/.../capture.ts:34`, `lib-addon-menu/.../dropdown.ts:329`) in the genuine set — flagged as not to be trusted before the diff lands.
