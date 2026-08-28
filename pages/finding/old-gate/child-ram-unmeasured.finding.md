---
page-type-slug: finding
id: 026f34ad-b706-50e4-8f37-cbe4b3fa6116
slug: child-ram-unmeasured
title: "The band gate measures no child process, so tsc's memory is spent unwatched"
domain-slug: page-type/old-gate
---

# Claim

The `band` gate measures no child process, so the RAM a gate spends outside the command's own process is spent unwatched.

`band` charges a run the peak resident memory of the command process. Every gate but `typecheck` runs inside that process and is therefore covered. `typecheck` spawns `tsc` as a child, and that child's memory is now counted nowhere.

# Evidence

`tools/lib/typecheck-run.ts` took the child's peak from `Bun.spawnSync(...).resourceUsage?.maxRSS`, and `band` in `tools/run-gates.ts` added it to the command's own peak from `/proc/self/status`.

That figure was never the child's. A bun process holding 400 MiB was made to spawn `/bin/true`, a program that resides in about a megabyte: its own `VmHWM` read 458380 kB and the `maxRSS` it was handed back for `/bin/true` read 458388 kB. The two figures track each other because they are one figure — `resourceUsage` here reports the caller's peak, not the child's.

So `band` was adding the command's peak to itself and charging double. Across four runs of differing size the two halves it printed were identical every time: 217/217, 1285/1285, 1323/1323, 1331/1331 MiB. That doubling refused `tools/rename-property.ts` at 2571 MiB against a 2048 MiB ceiling, on a run whose true peak was about 1285 MiB.

The false figure was removed at commit f80ea10, which leaves `band` honest and leaves this gap: `tsc` is the heaviest thing any gate run starts, and nothing now measures it.
