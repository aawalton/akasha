---
id: 7ac70921-9b19-5dde-a03d-36eba00604c4
page-type-slug: finding
title: "Buildkit heap climbs under its cap"
domain-slug: domain/global
---

# Claim

buildkitd's heap retention still ratchets with `GOMEMLIMIT` in place. The cap bounds what the ratchet can reach, which removes the three-day OOM kill that #18713 was opened against, but it does not stop the accretion underneath it: an idle daemon climbs from tens of megabytes of live heap to over half a gigabyte inside a day and a half of ordinary traffic. So burst headroom still erodes with uptime, which is the one criterion #18713 closed without meeting.

# Evidence

Measured 2026-08-12 13:10Z against the live daemon, read-only, as the watch #18713 left behind.

THE SAME DAEMON THROUGHOUT. `buildkit-567d9b79df-sm9ts`, 0 restarts, started 2026-08-11T08:14:26Z, so the 28h reading and the baseline below are the same process and the comparison is not a reset.

THE CLIMB. Baseline at 2026-08-11 08:45Z, half an hour after start and after 88 driven builds: `heap_alloc` 17.1 MB after a forced collection, cgroup `anon` 104112128 (0.097 GiB) against `file` 109334528. At 28h: live heap 645 MB after a forced collection, `anon` 1.099 GiB against `file` 0.385, `memory.current` 1.509 GiB. A factor of 38 on the heap and 11 on anonymous memory.

IT IS RETENTION RATHER THAN WORK. The collection was confirmed to have run rather than assumed — `go_memstats_last_gc_time_seconds` advanced 16s across the forced call — so 645 MB is what survived a collection. The daemon was idle at 21 goroutines at the reading, so it is not a build's working set.

THE CAP IS LIVE AND CORRECT MEANWHILE. `go_gc_gomemlimit_bytes` reads 12884901888, exactly the 12 GiB derived from the container limit, unchanged across both readings.

WHY IT MATTERS WITH THE CAP IN PLACE. The old daemon died when roughly twice the floor crossed its 20 GiB container limit, on a 3d 0h 6m cadence. GOMEMLIMIT bounds the Go runtime at 12, so that death is gone. What the climb costs instead is unmeasured: as live heap rises the runtime collects harder against the same cap, so the cost shows as GC pressure rather than a kill.

NOT ESTABLISHED. The shape of the climb — two readings 28h apart give a difference and never a curve, so whether it plateaus under 12 GiB or runs at the old daemon's rate is unmeasured. Whether the retained heap is the solver cache keys of moby/buildkit#4448; that stays the suspected path and nothing here has tied the two. Whether a daemon of this age would climb the same WITHOUT the cap, which no reading on this estate can now supply. What the climb costs a build.
