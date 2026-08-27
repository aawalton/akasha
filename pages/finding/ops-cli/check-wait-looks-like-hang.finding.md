---
id: e803efa1-7f4a-5b1c-92c0-6f1b15ad2934
slug: check-wait-looks-like-hang
page-type-slug: finding
title: "Check wait looks like hang"
domain-slug: domain/ops-cli
---

# Claim

`ops project check --seq N` waits on cluster CI via an idle HTTPS connection rather than running checks locally (`project/check.ts`: `runSlowSuiteGate`, `pushBranchForceWithLease`, `createPipelineForPush`, `waitForBranchCI`), so a long-running, single-line, single-idle-socket process is the expected signature of a correct wait — indistinguishable by output alone from a genuine hang.

# Evidence

Project #16184, domain `ops-cli`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15. Observed by astra, 2026-07-25, while landing #16091; filed as an orphan (projects CLI is not astra's domain).

Initial finding, self-corrected 25 minutes later by the same author, preserved because the correction is the valuable half: `ops project check --seq 16091` ran 28+ minutes producing one line of output, killed manually. Measured: elapsed 1704s, CPU 00:01:26 (~5%, blocked not computing), no child processes, one idle socket to alanwalton.com. Host healthy throughout (fresh request: 200 in 0.099s).

Correction: "MY DIAGNOSIS WAS WRONG. DO NOT CHASE AN HTTPS BUG." It does not hang, it waits for cluster CI. Reading `project/check.ts`: it runs no checks locally — `runSlowSuiteGate`, `pushBranchForceWithLease`, `createPipelineForPush`, `waitForBranchCI`. The idle socket is the CI wait; absent child processes is because work runs in the cluster. Evidence: `origin/project-16091` == local HEAD (push succeeded); pipeline 25864 running, updatedAt advancing over 30 minutes, `capacityWait.waiting: 4`, `nodes: node-04`, cluster running 10 pipelines concurrently — capacity-bound, not stuck.

Why the misdiagnosis happened: a hang is indistinguishable from slow by output alone (buffered to one line); other agents' checks were finishing in 5-10 min on the same busy host, making slowness the plausible (and also wrong) read; ~40 minutes passed before CPU/fd state was checked, which is what actually answered it.

Two side notes not retracted by the correction: (1) no request deadline was visible; (2) the filer's own harness wrapped the run as `timeout ... check` piped to a log with a trailing echo of exit status, so the surrounding harness reported EXIT CODE 0 from the echo, not the check — any tooling composing commands that way inherits the same masking.
