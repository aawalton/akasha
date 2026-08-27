---
id: 3db514eb-4e41-539b-936e-2d1b28a822a1
slug: stale-lock-crashloops-deploy
page-type-slug: finding
title: "Stale lock crashloops deploy"
domain-slug: domain/deploy
---

# Claim

Stale zero-byte `.lock` files left by git processes that die mid-fetch in a persistent hostPath clone crash-loop the `init-code` init container on the next rollout of any app sharing the `sync-build-restart` deploy step shape, blocking that app's main deploy verification and, through it, every project's deploy fleet-wide; two agents live-diagnosed one such incident as capacity self-healing, but only a manual, age-filtered lock deletion actually cleared it.

# Evidence

Project #16324 (domain: deploy, status: someday_maybe, live-on: deploy). No objective written; moved off the retired `notes` attribute, 2026-08-15.

Pipelines 25978 (@ddeda2e0), 25981 (@78943fca) failed `temper-web-source-sync-build-restart`, exit 1: last log `build complete`, then `error: timed out waiting for the condition`. Not the change nor capacity: `init-code` was `Init:CrashLoopBackOff` (6 restarts) on `cannot lock ref 'refs/remotes/origin/project-15781'... File exists`.

8 zero-byte `.lock` files in the hostPath clone `/var/temper-web-cache/repo/.git` (node-04): 4 under `refs/remotes/origin/`, 4 mirrored under `logs/refs/remotes/origin/`, branches project-15781/15785/15868/15906, mtimes 08:03/08:17/11:23/11:27 same day, 10-14h stale. Deleting locks (`-mmin +60`) + pod recreate: 2/2 Running in 45s.

Not a flake: 6 identical failures in 7 min; CrashLoopBackOff retries forever on the same file. Two agents live-diagnosed "insufficient memory, recovered on its own" — recovery was manual.

Blast radius: `sync-build-restart` is the shared app-deploy step; every app with a persistent hostPath clone + `init-code` fetch-and-reset is exposed — temper/web, archive-of-worlds/web, alanwalton/web, alanwalton/atlas, audhdalan/web. A main deploy failure blocks verify then migrations, fleet-wide.

Two fixes, second real: (1) clear stale locks before fetching. (2) find why git dies mid-fetch: 4 deaths, 2 clusters (08:03/08:17, 11:23/11:27). Node at 98% memory requests steady-state, an OOM hypothesis unverified — no event observed, events aged past TTL.

Verification (not automated): create a stale `.lock` under a test clone, run init, assert a successful fetch. Recurrence in production is a standing watch.

Search widths: bounded Loki window + `kubectl logs` — lock error presence established, other errors' absence not. Lock inventory `find`: 8/8 verified before/after. Events aged past TTL, so OOM unverified.
