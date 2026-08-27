---
id: 9e123fb5-2320-5ff4-b0b2-631f48cfb53b
slug: resolved-retraction-masks-real-step-failures
page-type-slug: finding
title: "Resolved retraction masks real step failures"
domain-slug: page-type/pipeline
---

# Claim

A pipeline/step retraction rewrites the step row's status from `failed` to `resolved` even when the step ran and genuinely failed (nonzero exitCode), and `resolved` is treated as green-equivalent by `project move-to`, so 196 of 656 `resolved` steps over 7 days are retracted real failures rather than legitimate infra retractions.

# Evidence

Project #16329 (domain: pipeline, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

Finding: retraction rewrites the `step` row's status too and can't distinguish an infra red from a real one. A step that ran, exited nonzero, and failed is relabelled `resolved`, which `project move-to` treats as green-equivalent.

Discovered by #16264 on pipeline 25947: `check`/`check-unused-deps` exit 1 (real defect, its own deletion orphaned a `zod` dep). Read `failed` at 21:51Z; read `resolved` at 22:02Z, exit 1 still attached.

Measurement, all `step` rows over 7 days, run independently by athena and #16264, reproduced:
completed 50,340 (all exit 0); blocked 901; superseded 916; canceled 558; pending 349; dispatching 53; running 23; resolved 656 (458 exitCode NULL, 198 nonzero); failed 24 (17 NULL, 7 nonzero).

`resolved` by exitCode: NULL 458/458 never started (0 ever_started); 1→176; 123→11; 2→9 ran+failed; 137→2 ran+killed (SIGKILL/OOM). No overlap. Control: `completed` 50,340/50,340 exit 0, no nulls/nonzeros — instrument reads exit codes correctly.

Why it matters: `ops project move-to` credits green-equivalence citing "the SHA already passed the merge queue's full staging CI to land" — true for a post-land MAIN pipeline, not a pre-land feature branch. #16264's SHA never passed anything.

Fix: refuse green-equivalent credit to a `resolved` pipeline whose steps carry nonzero exitCode. Rule: resolved+exitCode NULL = never executed, no signal; resolved+exitCode<>0 = RED.

Width: discriminator separates never-executed from executed-and-failed, not "code wrong" from "infra killed it" (2 rows at 137 SIGKILL/OOM, plausibly infra) — 458 safely retractable, 198 executed+failed, 196 at exit 1/123/2 unexplained by capacity.

Not established: nobody read the retraction code — behaviour measured, intent not — may be deliberate design (newer sibling supersedes regardless of why red) rather than a defect.
