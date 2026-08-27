---
id: 3484e0ca-25d1-5d49-83d3-95fc3b40336d
slug: drain-deadline-outside-cluster
page-type-slug: finding
title: "Drain deadline outside cluster"
domain-slug: domain/global
---

# Claim

The shared long-running worker runtime's 25-second shutdown drain is longer than the 15-second stop timeout a systemd user unit inherits on this workstation, so any daemon run on it outside Kubernetes is aborted mid-drain and dumps core rather than stopping cleanly.

# Evidence

`SHUTDOWN_DRAIN_DEADLINE_MS = 25_000` in `packages/shared/worker-runtime/src/run-long-running-worker.ts`, whose own comment states the reason: it "sits comfortably under the worker pod's K8s `terminationGracePeriodSeconds` (30 s)". That reasoning holds for a pod and was never revisited for a workstation.

Measured on this workstation 2026-08-13: `systemctl --user show -p DefaultTimeoutStopUSec` returns `DefaultTimeoutStopUSec=15s`.

Observed once, on `pages-fs-projector`: stopped deliberately at 07:23:23, and `systemctl --user status` reported `Active: failed (Result: timeout)` at 07:23:46 — 23 seconds later, after 5d 1h 42min of uptime.

The population is currently ZERO and that is why #18952 was closed `not_doing` rather than built. `runLongRunningWorker` refuses to start unless `KUBERNETES_SERVICE_HOST` is set or the caller passes `allowOutsideCluster: true`; the only production call site passing it was that daemon, whose unit is now `LoadState=not-found`. Every fix touches a file every production pod loads in order to protect a set of zero, and `shutdownDrainDeadlineMs` already exists as a supported per-caller override.

This is filed rather than fixed because the trap returns silently the next time anyone starts a workstation daemon on this runtime, and nothing at that moment would say so.
