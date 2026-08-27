---
id: 0f82b2fa-bec8-5c31-8cdd-4295ebddd349
slug: rebase-replayed-deletion-silent
page-type-slug: finding
title: "Rebase replayed deletion silent"
domain-slug: domain/global
---

# Claim

A deletion replayed cleanly by the deploy's rebase leaves no trace, so a move's result has to be diffed whole against the last verified tree rather than read from the commits.

# Evidence

Recorded from project #18836 as the traps a seat working the module move out of the code repository had already paid for.

The deploy syncs by rebase, through `ops project rebase --continue`, and a cleanly replayed deletion is silent. The shas move with it: `bb28d40d`, `f6e57176` and `907617c0` ended up on no branch, and what shipped was `39cd9c9e1c`, `5bb1fdf697` and `846efe4cde`.

Order is per-consumer rather than per-module, filed separately as `pages/finding/akasha-repo/additive-half-cannot-land-alone.finding.md`: `check-ast-unused` refuses an export reached from no entry, so a move's additive half cannot land alone — client and first caller belong in one commit, a deletion never lands before its re-points, and only branch CI says so.

`@agents/shared` has no `typecheck` script. `npx tsc --noEmit -p tsconfig.json` inside it works; `npx tsc -b packages/agents/shared/tsconfig.json` lies after its surface or any consumer changes. The digest tests must run with `INSTRUCTIONS_ROOT` pointed at an empty directory, which is the CI condition. `supervisor-compact-resume.integration.test.ts` fails on main, is filed, and belonged to nobody working this. `rg` hangs here without an explicit path argument.
