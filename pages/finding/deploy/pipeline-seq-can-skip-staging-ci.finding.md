---
id: 5e78e827-b898-5e51-ad02-30a78038702d
slug: pipeline-seq-can-skip-staging-ci
page-type-slug: finding
title: "Pipeline seq can skip staging CI"
domain-slug: domain/deploy
---

# Claim

In the deploy path, `batch.pipelineSeq` can be set to a feature-branch pipeline rather than a staging pipeline, and admission to the merge queue consults no CI verdict at all — `reconcile.ts:204-282` gates only on main SHA, ref freshness, duplicate-branch and recycle, and `form-batch.ts:44-47` takes only `{ id, seq }`, structurally unable to see a verdict.

# Evidence

Surfaced by the #16266 worker in its park report, unprompted, while correctly declining to retry a congested deploy on 2026-07-25.

Original filing (superseded by tracing, kept for the record): #16266's deploy rebased the branch (cb6d936 -> 364946732c) after its full-CI green verdict (pipeline 25941, no `--only`) was computed on the pre-rebase SHA, and nothing re-ran. dalla pushed back that a merge-queue land is gated by staging CI on merged content, not by the branch's own verdict, so a stale-SHA verdict could at most authorise enqueue.

The filer traced rather than reframed on the argument, and both the original claim and dalla's reframing turned out wrong about where the hole is. Observed directly in code: admission consults no verdict at all (`reconcile.ts:204-282` gates on main SHA, ref freshness, duplicate-branch, recycle; `form-batch.ts:44-47` takes only `{ id, seq }`). The deploy verb never gates on a verdict either — `hasGreenFullCiVerdictAtSha` has exactly one caller repo-wide, `move-to.ts:189`, the `verification_automated` park gate, after deploy and off the queue path.

The land normally consumes the staging pipeline's verdict via `batch.pipelineSeq` (`advance-batch.ts:134-148`, as dalla said), but `batch.pipelineSeq` can be set to a feature-branch pipeline, in which case staging CI never runs. The capture was cut before stating the mechanism by which `pipelineSeq` gets set to a feature-branch pipeline or the fix shape for it.

Fix shape proposed for the originally-filed (superseded) defect, kept for context: a verdict should name the SHA it evaluated, and the land gate should refuse rather than warn on mismatch — same defect class as #16009 (a liveness verdict with no as-of stamp).

Project #16295, status someday_maybe, domain deploy. Captured but never formally defined with an objective; moved off the row's retired `notes` attribute 2026-08-15.
