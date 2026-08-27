---
id: 1ec363de-eae5-543d-b7f0-06950ee8d6b4
slug: cluster-sweep-lost-its-dispatcher
page-type-slug: finding
title: "Cluster sweep lost its dispatcher"
domain-slug: domain/agent-harness
---

# Claim

The `orphaned-resources-sweep` CronJob has failed on every run since the `ops` dispatcher moved into the instructions repository, because its pod holds no instructions checkout. `ops-runs-on-the-cluster` named two cluster sites reaching `ops`; #18834 gave the CI step a tree and left this one. The sweep reports the failure as a mechanism failure rather than as drift, so the orphan audit has not run since the move.

# Evidence

Measured 2026-08-13 against the live cluster, read-only, triaging a `JobFailed` firing for `ci/orphaned-resources-sweep`.

THE FAILURE. Job `orphaned-resources-sweep-29776841`, started 2026-08-13T08:41:00Z, `Failed` / `BackoffLimitExceeded` at 08:41:17Z, `backoffLimit: 0`. Its pod is gone; Loki holds the log — `audit ranOk=false; 0 orphan(s)`, then `fatal: orphan audit could not run — audit verb exited 1 with no parseable --json result; stderr: error: Cannot find module '/work/instructions/tools/ops/cli.ts' from '/work/code/packages/shared/cli'`.

THE MECHANISM. The inline script clones only the code repository, to `/work/code`, and sets `HOME=/work`. `run-orphan-sweep-and-notify.ts` spawns `bun ops k8s orphaned-resources --json`. `packages/shared/cli/src/ops/forward.ts` imports what `opsDispatcherPath()` returns, and `packages/shared/cli-core/src/ops-dispatcher.ts:37,68-76` composes that as `instructionsRoot()` joined with `tools/ops/cli.ts` — `$HOME/instructions` where nothing else names a tree. In this pod that is `/work/instructions`, which the script never creates.

WHEN. The move landed 2026-08-12, `3a8f6ac4b6` at 12:04:25 -0600, among `18834:` commits of which `ed97698908` gives the CI step the tree this pod lacks. The sweep runs `41 8 * * *`; its first run after the move, 2026-08-13T08:41Z, is the one that failed. Over fourteen days `ALERTS{alertname="JobFailed",owner_name="orphaned-resources-sweep"}` holds one firing episode, 08-13 08:59Z to the reading.

UNSEEN. It began firing inside the window in which the infra-alert bridge resolved no target, and reached a seat only at 20:22:41Z.

NOT ESTABLISHED. Whether a third cluster site reaches `ops`. Whether orphans accumulated while the audit did not run. Whether `instructionsRoot()` returning a path that does not exist, rather than null, is deliberate.
