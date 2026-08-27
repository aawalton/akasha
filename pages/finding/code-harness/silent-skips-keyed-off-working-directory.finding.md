---
id: 45b1869a-9441-5451-9222-e85adc0c1339
slug: silent-skips-keyed-off-working-directory
page-type-slug: finding
title: "Silent skips keyed off working directory"
domain-slug: domain/global
---

# Claim

Two `ops mobile` paths report success from a working directory that makes them do nothing, and that directory is the one an agent's shell sits in by default. Both are skip paths carrying `(exit 0, no alert)` rather than separate items.

# Evidence

`sweep.ts:144` runs the sweep's boot step through `Bun.spawn` with no cwd, spawning `bun ops mobile sim boot`, so `ops` resolves only where a local `node_modules/.bin/ops` exists, which is inside the code checkout. From the instructions checkout it dies with a bun `Script not found` error naming `ops`, and the sweep takes its boot-failure branch — `sim/mac unavailable (boot exit 1); skipping` — at exit 0 with no alert.

That is a second silent skip beside the window-held branch in `decideSweepSkip`, and it is reached before the window guard is consulted at all. The shared property is that a sweep can report a pass while never having looked, and the population it looked at is not stated.

`ops mobile cut-status --app smilingjenny` exits 70 from the same directory, running `git -C /var/home/walton/instructions rev-parse origin/main:packages`, having resolved the instructions repo as the code root. Setting `CODE_ROOT` does not correct it; only the working directory does.

On 2026-08-17 my first sweep run from the instructions checkout printed that boot-skip line and exited 0. The same invocation from the code checkout booted, installed the origin/main shell, and ran the suite: `pass=3 fail=0 skip=0 retryPass=1`. `ops mobile sim boot` on its own succeeds from either directory, so what fails is how the sweep spawns it, not boot.

For `cut-status`: exit 70 from the instructions checkout with that git line; exit 0 from the code checkout, reporting that an intentional cut is owed. With `CODE_ROOT` set explicitly to the code checkout and the working directory left alone, still exit 70.

The lead on #19339 hit the `cut-status` case from their own seat, and I hit the sweep case from mine, which is two seats meeting it on the same day.
