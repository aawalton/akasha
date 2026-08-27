---
id: a743c233-71b5-5a92-b66a-0d128ec8c0ed
page-type-slug: finding
title: "Six repo-wide checks steps are red on main and no main pipeline reports it"
domain-slug: domain/global
---

# Claim

Six repo-wide `checks` steps are red on `main`, no main pipeline reports it, and the merge queue's staging CI runs that same workflow — so the first deploy enqueued when the queue returns is ejected by failures no branch caused.

# Evidence

Read on 2026-08-19 off `ops pipeline`.

**The six.** At `b9758154` (pipeline 28307, branch `project-19428`) the `check` workflow failed on `check-lint`, `check-functional-type`, `check-ast-unused-coverage`, `check-tmpfs-scratch`, `check-tsconfig` and `check-unit-tests`. Each names something outside that branch's twenty changed files: one format diagnostic in `packages/shared/utils/sync/src/playwright-utils.ts`; `packages/alanwalton/sms/core` unclassifiable; `pendingCuration` holding 185 entries against a `PENDING_CURATION_SIZE` of 190; the tmpfs ratchet holding 135 against a `PENDING_SIZE` of 140; five missing tsconfig references across `alanwalton/mobile-cli`, `alanwalton/projects/cli` and `infra/ci`; and 9 failures in `packages/alanwalton/daily-tracking/src/stoplight-mean-points.unit.test.ts`.

**They are not one branch's.** Pipeline 28304, branch `project-19427`, SHA `5958475`, an unrelated tree, failed the same six steps.

**They arrived recently.** Pipeline 28301 (`project-19421`, 18h earlier) completed green with the same `check`/`checks` workflow, as did 28298, 28294, 28288 and 28286. The regression landed on `main` inside that window.

**No main pipeline says so.** Main pipelines run `foundation` and `apps` workflows and not `checks`: 28303, 28300, 28297, 28291, 28289 all read `completed`. The red is invisible from `main` and visible only to whoever cuts a branch.

**Staging CI runs the same workflow.** Pipeline 28302, branch `merge-queue/staging`, carries exactly two workflows: `preparation` and `check`/`checks`. `ops project deploy --help` states that the gate for landing is the merge queue's staging CI, testing the merged result. The merged result contains all six.

**Two of the six are ratchet constants left behind by a shrink** — the check's own text says lowering the constant is the whole repair. The other four are not.
