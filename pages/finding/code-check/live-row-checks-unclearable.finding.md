---
id: 622a5e00-46cd-5e48-a5ff-cfaed1702c8f
slug: live-row-checks-unclearable
page-type-slug: finding
title: "Live row checks unclearable"
domain-slug: domain/global
---

# Claim

A registered check whose comparison reaches live production rows reds candidates that cannot clear it, and five stand in the code repository today — four of them unrepaired and two on `alwaysRun`.

# Evidence

Measured 2026-08-05 by enumerating every `check-*.ts` under `packages/infra/checks/src/checks/` (234 files) and tracing each reach outside the candidate working tree — live Supabase read, network fetch, git fetch of a remote ref. Ten reach outside.

No candidate can clear the red:

- `check-color-rule-coverage` — both sides from live `property-definition` rows; the violation names a `propertyDefinitionId` and an `optionId`.
- `check-skill-morph-groups` — both sides from live `temper-skill` rows; cohort is any `.ts`, `.md` or `.json` under `packages/temper`.
- `check-status-vocabulary-drift` — `alwaysRun: true`; its footer offers two remedies of opposite sense because it cannot tell which side moved.
- `check-retired-status-vocabulary` — `alwaysRun: true`; row arm scans live persona and framework-doc rows.
- `check-doctrine-path-citations` — `alwaysRun: true`; row arm resolves citations carried on rows that `page update` writes out of band.

Three more are registered from elsewhere: `check-rating-scale-drift` in collections/music and collections/litrpg, and `check-recovery-multiplier-drift` in alanwalton/daily-tracking (`alwaysRun: true`).

The candidate can clear the red:

- `check-workspaces-mainseam` fetches `main` at its TIP and runs that parser against the candidate's manifest. The reference moves, but the subject is the candidate's own `package.json`.
- `check-emitted-path-citations` — reds only from a canary the branch repoints.
- `check-register-content` — exits 0 on every successful run.

All ten route an unreachable external read to exit 2 rather than to a pass.

`check-status-vocabulary-drift` ran green on 2026-08-05, 19 values matched. Its removal is committed on `project-17856`, not on main; `ops enforcement list` still registers it.

NOT MEASURED: whether the four unrepaired checks have ever red a candidate that did not cause it — I read comparisons and cohorts, not pipeline histories.
