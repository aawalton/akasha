---
id: 49640dad-cb35-5dc8-a09a-34de008f0b01
page-type-slug: finding
title: "Post receive understates mirror watch"
domain-slug: domain/git-repos
---

# Claim

The `post-receive` hook's header says nothing machine-readable reports a mirror falling behind, and an hourly probe with three alert rules has reported exactly that since #17882. A reader of the hook concludes mirror durability is unwatched.

# Evidence

`packages/infra/git/transport/hooks/post-receive` lines 17-22 state the hook's own limitation, correctly: "A mirror failure is reported and does NOT fail the push. `receive-pack` runs this hook after the refs are already updated and ignores its exit status by design — observed over both the local and the HTTP transport, where a push whose post-receive exited 1 still exited 0 at the client with the ref landed."

The clause that follows is not true: "So the lines below are the only signal that a mirror fell behind, and nothing machine-readable reports the gap."

`packages/infra/git/mirror-probe/k8s/synth.ts:2` is the "cdk8s synth source for the hourly `git-mirror-probe` CronJob (#17882)", and its line 32 argues WHY HOURLY: "the moment mirroring stops, the blind window IS the data-loss exposure. An hour bounds that to about an hour of commits." `packages/infra/k8s/prometheus/synth-alerts-git-mirror.ts` emits three rules — ALERT_MIRROR_BEHIND at 107, ALERT_MIRROR_NO_DESTINATION at 120, ALERT_MIRROR_UNREACHABLE at 132 — and its line 68 records delivery: "every firing rule is picked up by the `infra-alert-bridge` worker".

The direction matters. The stale clause understates the estate's coverage of its only off-cluster copy, so a reader trusting it concludes nobody is watching, and may build a second watcher or accept mirror durability as an unmonitored risk.

Found while ingesting `dirty/code/packages-agents-instructions-docs-replication.md`, checking its account of post-receive against the live hook. That source is being emptied, so this record would not have survived the sweep.

Not `pages/finding/git-repos/mirror-unrecorded.finding.md`, which is about the corpus not recording that the mirror exists. Searched findings for `post-receive|mirror-probe|mirror behind|17882`, then `machine-readable|only signal` across the matches; nothing carries this.
