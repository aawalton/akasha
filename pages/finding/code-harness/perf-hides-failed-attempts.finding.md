---
id: 583e85ca-92b6-5a12-8c7f-ba56301c65e8
slug: perf-hides-failed-attempts
page-type-slug: finding
title: "Perf hides failed attempts"
domain-slug: domain/global
---

# Claim

A pipeline's measured timings report only each step's FINAL attempt, so a step that ran for ten minutes, failed and was retried reads as a stretch in which nothing ran at all. The wall clock stays honest while every explanation drawn from the step list is wrong.

# Evidence

Measured 2026-08-03 while diagnosing why branch CI averages ~8.7m, and it produced a wrong diagnosis twice before the timeline contradicted it.

`ops pipeline perf --seq 26943 --json` gives wall 950.7s over 130 steps, every one `completed`. Deriving concurrency from its `startedAt`/`completedAt` pairs shows a 573-second window (255s->829s from first start) with ZERO steps running, and `check-typesafety-bundle-shared` appearing at 829s. Read off that alone, the story is an idle cluster and a straggler nobody dispatched — which is what I reported.

`ops pipeline timeline --seq 26943` shows what actually happened to that step:

    15:31:03  launching -> running
    15:41:12  running   -> failed (failReason: build-overran)
    15:42:44  failed    -> pending
    15:42:49  launching -> running
    15:44:27  running   -> completed

It was running for the whole "gap", failed after ten minutes, and the retry passed in 98s. `perf` reports the retry's 15:42:49->15:44:27 and drops the 15:31->15:41 attempt entirely, because the step ROW is overwritten in place on retry and `perf` reads the row.

The same overwrite hides the other half. `attributes->>'failReason'` over three days of step rows returns 2 rows total; the `build-overran` and `OOMKilled` attempts behind 26943, 26950 and 26948 are all absent, because a row that later succeeds clears it. Only `public.events` retains them.

The two readings are not merely different in detail — they name different subsystems. The perf reading indicts the dispatcher; the timeline reading indicts a step that overran a budget on a cold cache and passed on a warm one.

NOT measured: how many pipelines in the window contain a hidden failed attempt (I checked 13 by timeline and found 3), nor whether `totalStepSeconds` is likewise net of dropped attempts, which would make it an undercount of real machine time rather than an overcount.
