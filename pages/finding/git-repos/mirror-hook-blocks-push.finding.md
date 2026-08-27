---
id: 0aa96025-5c0f-563d-bba9-2ce7dec1d31f
slug: mirror-hook-blocks-push
page-type-slug: finding
title: "Every gated write waits about eleven seconds on a failing GitHub mirror hook"
domain-slug: domain/git-repos
---

# Claim

Every gated write into the memory repository blocks about eleven seconds on the remote's `post-receive` hook, which reports that its mirror push to GitHub failed. The push itself lands and the mirror does not, so nothing off the cluster holds a second copy of what was written. A seat coming up under `sn` pays the eleven seconds twice, once when its attributes are stated and once when its mode is.

# Evidence

Measured on the workstation on 2026-08-20.

Two pushes of the memory repository to `origin`, each carrying commits, took 10.8s and 10.9s on the clock. Both printed the `post-receive` mirror failure. `git ls-remote origin HEAD` against the same remote took 0.023s, and against the instructions remote 0.019s, so the transport is not the cost.

The gates are not the cost either: `bun tools/write.ts --repo memory --dry-run` over one seat page ran in 0.265s, with its own `band` gate reporting 0.12s on the clock.

The shell boot timings kept at the time record two `sn` runs at 17:08 and 17:09 on the same day. Their `seat-attributes` stages took 11679ms and 15147ms, and their `seat-mode` stages 9971ms and 10092ms, against a whole shell stage of 22560ms and 26322ms. Each of those stages runs `tools/seat-call.ts`, which writes the seat page through the gated write command, which pushes.

Not measured: whether the mirror hook fails for repositories other than memory; why the GitHub push fails; whether the eleven seconds is a timeout, a retry, or work the hook does before it gives up. No hook source or server log was read.
