---
id: 2343e979-da4f-59e2-b374-61650845a860
page-type-slug: finding
title: "Crash dot call baseline still open"
domain-slug: domain/global
---

# Claim

A code-check gate for the crash-class dot-call `WORLD_MAP_SCENE.RegisterCallback` (colon-method name `CreateControlFromVirtual`) still carries a non-empty baseline of pre-existing violations rather than failing on all of them, and its refusal text still tells authors they may regenerate the baseline instead of fixing the sites, which talks them out of the gate's own purpose.

# Evidence

Project #18128 (status `someday_maybe`, `live-on: deploy`, domain `code-check`). Objectives it carried: (1) the check holds no baseline list of violations it declines to fail on — baseline empty, check green against a fresh build; (2) no dot-call of the crash class ships in an emitted bundle — the four `WORLD_MAP_SCENE.RegisterCallback` sites gone from bundles, settled by the check itself against a fresh `dist/`; (3) testing the force-colon name costs no second read of the bundles, timed apart from the first pass; (4) what the registry says about grandfathering is true, so a reader deciding whether the gate tolerates pre-existing violations gets the right answer from the comment beside it.

Status: defined and undispatched. Figures are readings from the 2026-08-07 review of this check, to be re-derived rather than trusted. Baseline trajectory: 364 violations at landing on 2026-06-20, then 184, 43, 59 (when the reservation broadened), 45 on 06-24, 38 on 07-03, 34, and 26 on 07-11 — unchanged since.

Cost, measured locally against a CI-shaped cache: acquisition 1.16s to AST-walk 3650 declaration files into 1451 colon-method names; first pass 2.46s over 233 bundles and 38.1 MB; the force-colon guard a second 1.72s over the same 233 bundles for the single name `CreateControlFromVirtual`. Name-set size is not the driver — 10 names scan in 1.71s against 1451 at 2.46s.

The 26 remaining sites are in addon source under `packages/temper`, which this project does not own; the check and its baseline belong to `code-check`, the repairs belong where the violations sit. Explicitly out of scope: rewording the refusal text's "fix them or, if intentional, regenerate the baseline" — the reviewer named this as the one place the gate talks an author out of its own purpose, but rewording it before the baseline is gone would be a second answer to the same question the baseline's removal already answers.
