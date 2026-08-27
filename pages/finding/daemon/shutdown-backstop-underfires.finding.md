---
id: 20043986-20c7-5031-932d-62dd3e6337c5
slug: shutdown-backstop-underfires
page-type-slug: finding
title: "Shutdown backstop underfires"
domain-slug: domain/daemon
---

# Claim

The worker-supervisor's shutdown-drain backstop under-fires by roughly 109x (4 backstop firings against 437 SIGKILL-at-grace events), and its SIGKILL escalation branch is structurally unreachable because `SHUTDOWN_GRACE_MS` (30000) equals the pod's `terminationGracePeriodSeconds` (30), so the kubelet's own SIGKILL always lands first.

# Evidence

Project #16446 (domain daemon, status someday_maybe). Filed by aranya from worker-16407's handback on #16407, which asked whether the worker-supervisor's 25s shutdown drain is a defect — Existence Check answered no. Two other measurements the worker surfaced are defects and belong here rather than on the closed row.

1. Shutdown backstop under-fires ~109x: SIGKILL-at-grace events observed 437, drain-timeout backstop firings 4 (ratio ~109:1); orchestrator specimen 936 shutdowns, ~7 clean. The backstop exists to catch a shutdown that fails to drain; it notices under 1% of the times shutdowns fail to drain.

Unconfirmed hypothesis (the worker's inference, not an observation, and it must be verified before any fix is designed): the backstop timer is cleared when the join resolves, so it measures whether the join promise settled rather than whether the process actually exited — the join can settle while the process is still alive and subsequently SIGKILLed.

2. The supervisor's SIGKILL escalation is structurally unreachable: `SHUTDOWN_GRACE_MS = 30_000` (30s) equals the pod's `terminationGracePeriodSeconds = 30`. The kubelet's grace expires at the same moment as the supervisor's, and the kubelet's SIGKILL lands first on the whole pod, so the supervisor's own escalation branch can never execute — live, reviewable, correct-looking code on an unreachable path.

Same shape as #16399 (a `sed` present, correct, never run on the one event it exists for) and #16402 (a gate dead cluster-side) — three instances the same night of machinery that exists, reviews clean, and cannot fire.

Why one row: both are failures of the same shutdown path to report on itself, and fixing either changes what the other observes. Verify the hypothesis in (1) before designing anything.

Row captured but never defined (no objective was written); this evidence is its capture moved off the retired `notes` attribute on 2026-08-15.
