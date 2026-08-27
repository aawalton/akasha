---
id: a25308ed-8e31-54ed-b7b1-8aea4314e39e
slug: rule-database-test-red-inside-green-pipeline
page-type-slug: finding
title: "Rule database test red inside green pipeline"
domain-slug: barred-meaning/project
---

# Claim

One test in `projects/cli` fails on a clean checkout of `origin/main` while branch CI over the same content reports PASS, so either the test is flaky or the step carrying it does not gate — and the two cannot be told apart from the verdict.

# Evidence

`runRuling — a failed row write sends nothing > wake on a row nobody holds names nobody, and does not fall back to the owner`, in `packages/alanwalton/projects/cli/src/project/rule.database.test.ts` around line 273. It seeds a row that has an owner and no holder, calls `runRuling` on the wake rail, and expects the promise to reject. It resolves.

Measured four ways during #17806, before that row wrote anything to live data:

  - in the #17806 worktree — fail
  - in `~/code` at 6ac796d — fail
  - via `ops worktree ephemeral` on a throwaway checkout of `origin/main` e66af34b, carrying none of #17806's changes — fail
  - in branch CI for `project-17806`, pipeline 27006 — the failure printed in the step output

So it is not #17806's, and it is not local environment: it reproduces on a clean main-side checkout and inside CI.

What makes it worth a look rather than a fix: branch CI at 1a3f27ad (pipeline 27015) returned `VERDICT: PASS ... over 118 of 118 CI steps` with the same failure printed in its output, and the deploy then landed through the merge queue's staging CI. A red test inside a green pipeline means the signal is not reaching the gate — whether by retry, by step classification, or by the step's exit policy was not established here.

Main-branch pipelines do not cover it either: `ops pipeline steps --seq 26997` shows a main pipeline running only `preparation` workflows, so the full check suite runs on branch and merge-queue CI alone.
