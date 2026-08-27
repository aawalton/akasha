---
id: 4d2370f4-7790-55e5-a19a-518b267ce7d1
slug: lint-gate-no-denominator
page-type-slug: finding
title: "Lint gate no denominator"
domain-slug: page-type/pipeline
---

# Claim

The CI lint step runs raw `biome check .` rather than `ops lint-verdict`, so #15967's denominator hardening (`filesOpened` / `trackedLintable` / `filesNotOpened`, refusing a zero-opened run) reaches only the command agents consult, not the gate that decides whether code merges — the CI step's log prints only a numerator (`Checked 12819 files`) with no reference class, so it cannot state or fail on a coverage shortfall.

# Evidence

Project #16036 (domain `pipeline`, no parent), owner dalla, tags `ci`,`denominator`,`lint`,`verification-validity`,`author:athena`, created 2026-07-25. No objective written, full capture.

#15967 hardened `ops lint-verdict` to state what it did NOT open — but the CI lint step does not call it. `check-configs.ts:135-141` runs raw `biome check .`. The fix landed on the command agents consult, not the gate deciding whether code merges.

**Asymmetry.** `ops lint-verdict` (post-#15967) carries `filesOpened` / `trackedLintable` / `filesNotOpened`, refuses a zero-opened run. The CI `lint` step runs `biome check .`, logging `Checked 12819 files` — a numerator only, never the shortfall.

**Why that is the hazard.** The number reads as coverage but has no reference class: it can't distinguish "opened all" from "opened a fraction." Tracked-lintable and biome's scope are known to diverge: root `.gitignore` carries `*.d.ts`; git exempts already-tracked paths, biome does not. Config-effective 12,996 − 179 tracked-but-gitignored `.d.ts` = 12,817, exactly what biome opened — a known 179-file gap invisible to CI output.

**Constraint — do not re-derive biome's scope.** #15967 tried this and failed a cleared control (`biome-lint-scope.ts` wrongly assumed git enumeration IS biome's scope). Kept conclusion: "Re-deriving biome's scope is a second implementation of biome's semantics, and it has already drifted twice." The gate must measure against a ground truth this repo owns (tracked-lintable) and report a shortfall as a shortfall, not predict a match.

**Fix directions.** Route CI through `ops lint-verdict`; or, staying raw, emit the reference class and fail past a declared tolerance. A zero-opened run must exit non-zero — the shortfall-is-not-success rule #15967 applied to sibling verbs. Acceptance is two-sided: a short run observed failing, a complete run accepted stating both numbers — FAIL matters most, since the step has never been able to fail this way.
