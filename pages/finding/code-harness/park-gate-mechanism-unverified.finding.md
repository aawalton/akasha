---
id: 75f42f09-c1c4-59d9-a5b6-42769443b626
page-type-slug: finding
title: "Park gate mechanism unverified"
domain-slug: domain/global
---

# Claim

The full-CI-before-park gate's (#14785) stated justifying mechanism — that a worker's per-package `--only` subset check skipped repo-wide scanners like `check-syntax-bundle`, which then ejected at merge-queue/staging — cannot be correct under the `--only` inertness established on #15966, since a `--only` branch run executes the full check umbrella including `check-syntax-bundle`; what actually caused the observed ejection on pipeline #22134 has not been established.

# Evidence

Project #16004 (domain `code-harness`). Carried no objective — captured but never defined; moved off the row's retired `notes` attribute on 2026-08-15.

The claim under scrutiny: #14785's narrative, restated in `packages/alanwalton/projects/cli/CLAUDE.md` and `project-lifecycle.md`, says a worker's per-package `--only` subset check skipped repo-wide scanners like `check-syntax-bundle`, which then ejected at merge-queue/staging. Under the `--only` inertness established on #15966, this cannot be the mechanism: a `--only` branch run executed the full check umbrella, `check-syntax-bundle` included — the filter was inert at the trigger-side materialization join. The gate's behaviour is not in question, only its stated reason; nobody should touch the gate on the strength of this row.

Confirmed by #15966's worker: pipeline #22134 is the merge-queue/staging pipeline (`onlyCheckNames` null, 66 check steps), correctly cited as where the ejection was observed. What caused it is not established.

Two open ends, recorded as open: (1) the worker's own branch pipeline was never identified, so there is no comparison between what the branch ran and what staging ran. (2) The query testing whether `check-syntax-bundle` is ever closure-filtered out timed out and was not retried — the load-bearing observation does not exist yet.

Likelier mechanism, stated as hypothesis only: the step-level closure filter, or the incremental-skip gate.

Why worth a row: same shape as the seven false doc claims on #15967 — a remedy whose named incident is not the one that bit us, and a false mechanism recruits citations (already two restatements here).

Deliverable: establish what caused the #22134 ejection, or that it cannot be recovered; correct #14785's narrative and both restatements. Do not change the gate. Retry the timed-out query rather than inferring from its absence.
