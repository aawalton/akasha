---
id: 8ab213e8-eae7-5f05-8379-470f2d299568
slug: deploy-skips-contract-migrations-on-unknown
page-type-slug: finding
title: "Deploy skips contract migrations on unknown"
domain-slug: domain/global
---

# Claim

When `ops project deploy`'s main-pipeline wait times out, `[7/7]` skips the pending contract migrations and nothing returns to apply them. The skip follows an UNKNOWN rather than a failure, and re-running the verb is no recovery, the branch being landed already. On tree #18682 the pipeline minted 29m35s after the request against a 1m40s norm, so the 20m wait expired, `[7/7]` printed `skipping contract migrations`, and the pipeline then passed 34 of 34 workflows.

# Evidence

Observed by the parent of tree #18682 on 2026-08-12, deploying 254 commits.

MINT LATENCY, request to pipeline creation, from `public.events` `main_pipeline.requested` against each pipeline's `createdAt`:

- `f9862a6` 01:03:44 -> 01:33:19 = **29m35s** (this tree)
- `a519134` 21:14:22 -> 21:16:07 = 1m45s
- `2534e0b` 19:34:10 -> 19:35:56 = 1m46s
- `bc9f4e0` 18:06:56 -> 18:07:45 = 0m49s
- `5c17c41` 17:51:39 -> 17:53:23 = 1m44s
- `fe00d6e` 14:41:21 -> 14:43:05 = 1m44s
- `739adbc` 13:43:14 -> 13:44:54 = 1m40s
- `e37ce1e` 13:08:46 -> 13:20:11 = 11m25s

So the 20m wait is generous against the norm, and the stall is the outlier — but the wait's expiry is what drives the skip, and a stall of this size is not novel: the entry two before it took 11m25s.

THE PIPELINE PASSED. Pipeline 27853 over `f9862a6f2b03e3f73336373e7152619aaa46fe68`, status `completed`, 34 of 34 workflows completed, `ops pipeline steps --status failed` empty. `main` is verified over the landed SHA. The `UNKNOWN` was correct at the moment it was emitted and wrong ten minutes later, and nothing re-reads it.

WHAT WAS NOT LOST HERE. `ops migration list` shows no migration in a pending state at all — the three non-`applied` rows are `expand`-phase failures at seq 4058, 4092 and 4093, hundreds of migrations older than this tree. So this deploy's skip cost nothing. That is luck about this tree's contents, not a property of the path.

NOT MEASURED: why the creator stalled. No `pipeline-orchestrator` pod, deployment, systemd unit or process is visible from this workstation, and `pipelines.non_terminal=0` throughout, so it was not a backlog. `pages/finding/code-harness/main-pipeline-wedge-unreported.finding.md` records the detector for this shape logging `state=clear` through it.
