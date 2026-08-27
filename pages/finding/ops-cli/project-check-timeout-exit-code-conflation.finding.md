---
id: fa7a3e03-fa6e-5a6e-8d9f-196cfc775d05
slug: project-check-timeout-exit-code-conflation
page-type-slug: finding
title: "Project check timeout exit code conflation"
domain-slug: domain/ops-cli
---

# Claim

`ops project check` (aliased as `bun ops project check`), on timing out at its 30-minute limit, returns `ok:false` with a timeout error while the pipeline it was watching keeps running unstopped, and the harness task-completion notification reports the exit code of the pipe rather than of the check, so it shows exit 0 for a run that never finished.

# Evidence

Found by worker-16224, 2026-07-25, which nearly acted on the false-success reading.

Mechanism: the check gives up at 30 minutes, returning `ok:false` with a timeout error, but does not stop the pipeline. The notification reports the pipe's exit code, not the check's, so it shows exit 0. A worker reading only the notification sees an apparently successful completion for a run that never finished.

Newly likely under congestion: 15 concurrent pipelines observed the same night, memory-bound cluster, past whatever depth the limit was sized against, so the trap fires more when the fleet notices least.

Mitigation in place, behavioural not a fix: standing fleet instruction to read the JSON verdict directly and watch the pipeline row by SHA to terminal, never treating a completion exit code as a CI verdict.

Second reproduction: worker-16203 on pipeline 25951 (65032f1), and again on its own first check (25937) the same evening. Three different answers to one question at once: the check verb exited 2 with "feature branch CI timed out after 30 minutes"; the pipeline was still running at 34m with 5 steps queued; the same command piped through `tail` yielded exit 0.

Sharpened defect: timeout and pipeline-failure are both non-zero but mean opposite things (timeout = no verdict yet; failure = verdict, and it is red). Testing only for non-zero conflates "unfinished" with "done badly," which is why the pipeline row by SHA is the only surface distinguishing them.

Candidates, not decided: (a) propagate the check's real exit status, likely a missing pipefail, preferred first; (b) on timeout emit an unmistakable non-verdict; (c) reconsider the limit against measured duration, only after (a).

Related, same evening, same class of instrument reporting success while measuring nothing: #16290, #16291, #16292, #16293. Fifth found; first that can cause a false green report.

Project #16296, someday_maybe, ops-cli. Captured, never defined; moved off retired `notes` attribute 2026-08-15.
