---
id: 8b608871-7940-5be4-a646-f49a6ab00eb9
page-type-slug: finding
title: "Buildkit cache pruned to nothing"
domain-slug: domain/global
---

# Claim

buildkit's build cache is being pruned to nothing. `buildctl du` against the running daemon reports a total of 8.19 kB across two records, so CI builds are running with essentially no BuildKit layer cache, and `gckeepstorage = 50000` in `buildkitd.toml` — written and commented as 50 GB — appears to be read by v0.28.0 as 50,000 bytes.

# Evidence

Measured 2026-08-11 against the live daemon `buildkit-7c9db7db7c-6cxjh`, running `moby/buildkit:v0.28.0`, while diagnosing a separate memory problem (#18713).

`buildctl --addr tcp://127.0.0.1:1234 du` inside the container reports two records of 4.10 kB each, `Reclaimable: 8.19kB`, `Total: 8.19kB`. A healthy layer cache for this estate's pipelines would be gigabytes.

`du -sh /var/lib/buildkit` reports 1.2G, so the volume is not empty — but that is the content store, snapshots and the bolt database rather than the build cache records `du` enumerates.

`packages/infra/k8s/buildkit/synth.ts` sets `[worker.oci] gckeepstorage = 50000` with a comment reading "Keep up to 50 GB of build cache on the disk-backed emptyDir". The weekly `buildkit-prune` CronJob passes `buildctl prune --keep-storage 30000` with the same apparent intent. If v0.28.0 reads these as bytes rather than megabytes, both are asking for roughly 50 kB and 30 kB, which is consistent with what `du` reports.

What this would cost: every CI image build re-executes layers a warm cache would have skipped. Nobody has measured that here.

NOT VERIFIED. The unit `gckeepstorage` carries in v0.28.0 was not confirmed from upstream source or documentation — it is inferred from the observed cache size matching the number read as bytes. Upstream deprecated this key in favour of `[[worker.oci.gcpolicy]]` entries with `reservedSpace` / `maxUsedSpace` / `minFreeSpace` at some version, and which release changed the parse was not established. The daemon logs no deprecation warning for the key at startup. Also not established: whether a correctly sized cache would raise or lower the daemon's memory, which matters because upstream moby/buildkit#4448 attributes large buildkitd heaps to solver cache-key retention — a bigger cache could hold more keys. That is why #18713 left this alone rather than fixing it in passing.
