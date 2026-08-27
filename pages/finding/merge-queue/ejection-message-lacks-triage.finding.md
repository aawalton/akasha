---
id: ecfe36f3-89de-5e62-801f-4fdb0f30f610
slug: ejection-message-lacks-triage
page-type-slug: finding
title: "Ejection message lacks triage"
domain-slug: domain/global
---

# Claim

`bun ops project deploy`'s merge-queue ejection message prints only `merge queue ejected entry N: <reason>` — no step name, log pointer, or triage routing — while the identical failure on a feature branch gets the failing step, its logs, and a routing line to `ops tests triage-fanout`, because the staging pipeline seq is never plumbed through `pollMergeQueueEntry` to reach `formatFailingSteps`'s one caller at `check.ts:299`.

# Evidence

[2026-07-26T02:41:26.145Z] Found by worker-16376 while routing CI triage doctrine; handed back rather than folded in, correctly — this is code work, not docs.

The asymmetry: on a staging-CI ejection, `bun ops project deploy` prints only `merge queue ejected entry N: <reason>` — no step name, log pointer, or triage routing. The same failure on a feature branch gives the failing step, its logs, and (since #16376) a routing line to `ops tests triage-fanout` with the attribution caveat. An agent whose fan-out failure ejects at the merge queue is strictly worse off than one whose identical failure happened on the branch — at precisely the moment it has least context, since the staging run is against a rebased SHA it never checked out.

Mechanism: `formatFailingSteps` has exactly ONE caller (`check.ts:299`); the staging pipeline seq is never plumbed through `pollMergeQueueEntry`. The ejection path cannot name a step though the information exists on the staging pipeline row — the formatter is not missing, it is unreachable from this path.

Fix shape (undecided): plumb the staging pipeline seq through `pollMergeQueueEntry` and reuse `formatFailingSteps` at the ejection site — a second formatter is how #16394's five-copy problem starts.

Why it matters tonight: the merge queue REBASES, so a staging failure is on a SHA the agent has never seen. It cannot re-run locally without reconstructing the rebase, so the printed message is often the ONLY evidence it gets. A bare reason string then is the difference between a triage and a guess.

Related: #16371 (project deploy does not run branch CI while its help claims it does in four places) — same verb, same information-surface class, different defect. #16223 and #16220 are ejection-adjacent but concern the ejection mechanism, not what it reports.

Captured and never defined — carries no objective of its own; this text is its capture, moved off the row's retired `notes` attribute on 2026-08-15.
